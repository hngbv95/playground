import { useCounterContext } from '../contexts/counter'

export function Counter() {
    const { value ,setValue } = useCounterContext()
    console.log('counter render')
    return (
        <button onClick={() => {setValue(value+1)}}>+</button>
    )
}

export function CounterDisplay() {
    console.log('display counter render')
    const { value } = useCounterContext()
    return (
        <h1>{value}</h1>
    );
}