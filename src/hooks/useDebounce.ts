import { useEffect, useState } from "react";

export const useDebounce = <T = unknown>(
    value: T,
    ms: number = 3000
) => {
    const [debounceValue, setDebounceValue] = useState<T>(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, ms)

        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return debounceValue
}