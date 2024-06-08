import { logout } from "api/auth"
import { API_HOST, API_METHOD, SERVICE } from "./constant"
import { CategoryEntity } from "__generated__/graphql"
import { TCategoryTreeNode } from "types/category"
import { ceil, floor, isEmpty } from "lodash"
import { AUTH } from "types/auth"

export const getRoot = () => {
    if (typeof window !== 'undefined') {
        const root = localStorage.getItem('persist:root')
        return root
    }
}

export const getCurrentUser = () => {
    const root = getRoot()
    if (root) {
        const user = JSON.parse(root)?.user ? JSON.parse(JSON.parse(root).user) : {}
        return user
    }
    return {}
}

export const getAccessToken = (): string => {
    const user = getCurrentUser()
    return user?.[AUTH.ACCESS_TOKEN] ? user[AUTH.ACCESS_TOKEN] : ''
}

export const replaceAccessToken = (newToken: string) => {
    const user = getCurrentUser()
    if (user) {
        user[AUTH.ACCESS_TOKEN] = newToken
        const root = getRoot()
        if (root && JSON.parse(root)?.user) {
            const newRoot = JSON.parse(root)
            newRoot.user = JSON.stringify(user)

            localStorage.setItem('persist:root', JSON.stringify(newRoot))
            window.dispatchEvent(new Event('storage'))
        }
    }
}

export const autoLogout = async () => {
    if (typeof window !== 'undefined') {
        await logout()
        alert('Your session has been expired, ready to sign out')
        window.location.href = window.location.href
        localStorage.clear()
    }
}

export const userLogout = async () => {
    if (typeof window !== 'undefined') {
        await logout()
        window.location.href = window.location.href
        localStorage.clear()
    }
}

export const isSession = (): boolean => {
    const user = getCurrentUser()
    if (user) {
        return user.isSession
    }
    return false
}

export const getGqlEndpoint = (serviceName: SERVICE) => {
    let port: number
    switch (serviceName) {
        case 'PRODUCT': port = 3001; break;
        case 'CART': port = 3002; break;
        case 'ORDER': port = 3003; break;
        default: port = 3001; break;
    }
    return `${API_METHOD}://${API_HOST}:${port}/graphql`
}

export const getUrlEndpoint = (
    hostname: string | undefined,
    port: number | string | undefined,
    path: string
) => {
    if (path[0] != '/') {
        path = '/' + path
    }
    return `${API_METHOD}://${hostname}:${Number(port)}${path}`
}

export const roundRating = (rating: number) => {
    if (rating % 1 < 0.5) {
        return floor(rating);
    } else if (rating % 1 > 0.5) {
        return ceil(rating, 1);
    }
    return rating;
};