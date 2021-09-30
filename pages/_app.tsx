import React from 'react';
import type { AppProps } from 'next/app';

import './style.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <div className="container">
            <h1 className="title">
                Formula calendar
            </h1>
            <Component {...pageProps} />
        </div>
    );
}

export default App
