import {useEffect} from 'react'
import { Counter, CounterDisplay } from './counter'
import { Text, TextDisplay } from './text'

export function App() {
    console.log('render')
    // useEffect(() => {
    //     console.log('render')
    // }, [])

    return (
        <>
            <h1>Hello world!</h1>
            <CounterDisplay></CounterDisplay>
            <Counter></Counter>
            <br></br>
            <br></br>
            <Text></Text>
            <TextDisplay></TextDisplay>
        </>
    );
}