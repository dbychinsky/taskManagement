import React from 'react';
import Navigation from "./components/navigation/Navigation";
import {StubServer} from "./server/StubServer";
import RoutersProject from "./routersProject";

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
