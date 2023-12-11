import { useTextContext } from '../contexts/text'
import { memo, useMemo } from 'react'

function ChildComponent() {
    console.log('Child Component')
    return <h2>This is a ChildComponent</h2>
}

const ChildComponentMemo = memo(ChildComponent)

const ChildComponentWithProp = memo(function ChildComponentWithProp({info}) {
    console.log('(props)Child Component render')
    const { name, age } = info
    return <>
        <h1>{name}</h1>
        <h1>{age}</h1>
    </>
})

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

    const info = useMemo(() => {
        return {
            name: 'John Doe',
            age: 24
        }
    }, [])
    return (
        <>
            <h1>{value}</h1>
            <ChildComponentMemo></ChildComponentMemo>
            <ChildComponentWithProp info={info}></ChildComponentWithProp>
        </>
    );
}