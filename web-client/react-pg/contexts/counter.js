import { createContext, useContext} from 'react';
import { createContextComponent } from './creator';

const defaultValue = 0;

export const CounterContext = createContext(defaultValue)

export const CounterProvider = createContextComponent(CounterContext, defaultValue);

export function useCounterContext() {
    return useContext(CounterContext);
}