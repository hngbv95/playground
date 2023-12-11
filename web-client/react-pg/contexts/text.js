import { createContext, useContext} from 'react';
import { createContextComponent } from './creator';

const defaultValue = '';

export const TextContext = createContext('')

export const TextProvider = createContextComponent(TextContext, defaultValue);

export const useTextContext = function() {
    return useContext(TextContext);
}