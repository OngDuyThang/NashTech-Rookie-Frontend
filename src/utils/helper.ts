import { logout } from "api/auth"
import { API_HOST, API_METHOD } from "./constant"
import { CategoryEntity } from "__generated__/graphql"
import { TCategoryTreeNode } from "types/category"
import { isEmpty } from "lodash"

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
    return user?.accessToken ? user.accessToken : ''
}

export const replaceAccessToken = (newToken: string) => {
    const user = getCurrentUser()
    if (user) {
        user.accessToken = newToken
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
        alert('Your session has been expired, ready to sign out')
        window.location.href = window.location.href
        localStorage.clear()
    }
}

export const userLogout = async () => {
    if (typeof window !== 'undefined') {
        await logout()
        localStorage.clear()
        window.location.href = window.location.href
    }
}

export const isSession = (): boolean => {
    const user = getCurrentUser()
    if (user) {
        return user.isSession
    }
    return false
}

export const getGqlEndpoint = (serviceName: 'product' | 'order' | 'cart') => {
    let port: number
    switch (serviceName) {
        case 'product': port = 3001; break;
        case 'cart': port = 3002; break;
        case 'order': port = 3003; break;
    }
    return `${API_METHOD}://${API_HOST}:${port}/graphql`
}

export const createCategoryTree = (
    categories: CategoryEntity[]
): TCategoryTreeNode[] => {
    if (isEmpty(categories)) return []

    const map: Record<string, TCategoryTreeNode> = {}
    const result = []

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        map[category.id] = {
            title: category.name,
            value: category.id,
            children: []
        }
    }

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        if (category.parent_id != null) {
            const parent = map[category.parent_id]
            parent.children?.push(map[category.id])
        } else {
            result.push(map[category.id])
        }
    }

    return result
}