import { logout } from "api/auth"

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