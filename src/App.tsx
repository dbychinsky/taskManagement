import React from 'react';
import Navigation from "./components/Navigation/Navigation";
import {StubServer} from "./server/StubServer";
import Roter from "./RoutersProject";
import RoutersProject from "./RoutersProject";

function App() {
    return (
        <div className="app">
            <Navigation/>
            <div className="contentWrapper">
                <RoutersProject/>
            </div>
        </div>
    );
}

export const server = new StubServer();

export default App;
