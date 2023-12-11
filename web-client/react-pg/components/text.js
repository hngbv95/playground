import { useTextContext } from '../contexts/text'
import { memo } from 'react'

function ChildComponent() {
    console.log('Child Component')
    return <h2>This is a ChildComponent</h2>
}

const ChildComponentMemo = memo(ChildComponent)

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
        <>
            <h1>{value}</h1>
            <ChildComponentMemo></ChildComponentMemo>
        </>
        
    );
}