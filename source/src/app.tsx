import React from 'react';
import Navigation from "./components/navigation/Navigation";
import RoutersProject from "./routerList";
import {connectToServer} from './server/connectToServer';

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

/**
 * Подключение хранилища
 */
export const server = connectToServer();

export default App;
