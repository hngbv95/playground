import { useState } from 'react'

export function createContextComponent(context, defaultValue) {
    return function({children}) {
        const [value, setValue] = useState(defaultValue)

        return (
            <context.Provider value={{value, setValue}}>
                {children}
            </context.Provider>
        )
    }
}