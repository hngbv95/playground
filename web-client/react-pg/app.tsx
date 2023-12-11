import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import { Context } from './contexts/context';

const Container = document.getElementById("app");
const root = createRoot(Container, {identifierPrefix: 'root'})
root.render(
    <StrictMode>
        <Context>
            <App />
        </Context>
    </StrictMode>
);
