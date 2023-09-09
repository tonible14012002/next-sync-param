import { useRouter } from "next/router"
import { useEffect, useRef } from "react"


interface Options {
    shallow: boolean
    willReplace: boolean
}

type ExpectedParams = Record<string, string>

const validateParams = <
    T extends ExpectedParams,
    P extends Partial<T> = Partial<T>,
    S extends Record<keyof T, string[]>=Record<keyof T, string[]>,
    R extends Record<keyof T, T[keyof T] | string> = Record<keyof T, T[keyof T] | string>
    >
(q: P, schema: S) => {
    const keys = Object.keys(schema) as (keyof T)[]
    let validatedQuery = {} as any

    keys.forEach((k) => {
        // not validate if schema lenght = 0
        // Ex: search Value,...
        const isValid = (schema[k].length == 0) || schema[k].includes(q[k] ?? "")
        validatedQuery[k] = isValid ? (q[k] ?? ""): schema[k][0]
    }, {})
    return validatedQuery as R
}

export const useSyncState = <T extends ExpectedParams>(
    validValues: {[k in keyof T]: T[k][]},
    options: Options={shallow: true, willReplace: false}
) => {
    const optionsRef = useRef(options)
    const validValRefCurrent = useRef(validValues).current

    const { query, push, replace } = useRouter()
    const queryRef = useRef(query)
    const q = query as Partial<T>

    const validQ = validateParams(q, validValRefCurrent)

    const setState = useRef((values: Partial<T>) => {
        const { shallow=true, willReplace=false} = optionsRef.current
        const query = queryRef.current
        const newQuery = {
            ...query,
            ...values
        }
        
        Object.keys(newQuery).map(k => {
            if (!newQuery[k] || newQuery[k] === (validValRefCurrent[k]?.[0] ?? "")) {
                delete newQuery[k]
            }
        })

        if (willReplace) {
            replace({
                query: newQuery
            },
            undefined, { shallow })
            return
        }
        push({
            query: newQuery
        }, undefined, { shallow })
    }).current

    useEffect(() => {
        queryRef.current = query
    }, [query])

    return [ validQ, setState ] as [T, (values: Partial<T>) => void]
}