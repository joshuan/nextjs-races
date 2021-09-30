import React from 'react';
import type { AppProps } from 'next/app';

import './style.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <div className="container">
            <main>
                <h1 className="title">
                    Formula calendar
                </h1>
                <Component {...pageProps} />
            </main>
        </div>
    );
}

export default App
