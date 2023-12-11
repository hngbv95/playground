import { CounterProvider } from './counter'
import { TextProvider } from './text'

export function Context({children}) {
    return (
        <CounterProvider>
            <TextProvider>
                {children}
            </TextProvider>
        </CounterProvider>
    )
}