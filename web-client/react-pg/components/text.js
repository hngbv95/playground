import { useTextContext } from '../contexts/text'

export function Text() {
    const { setValue } = useTextContext()

    return (
        <input type='text' onChange={(e) => {
            setValue(e.target.value)
        }}></input>
    )
}

export function TextDisplay() {
    const { value } = useTextContext()
    return (
        <h1>{value}</h1>
    );
}