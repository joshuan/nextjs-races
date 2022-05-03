import * as React from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
// @ts-expect-error
import withYM from 'next-ym';

import './style.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <div className="container">
            <script
                src="https://api-maps.yandex.ru/2.1/?apikey=82ebea14-9fd9-4a6e-95b8-64f8d5d1f552&lang=ru_RU"
                type="text/javascript"
            />
            <h1 className="title">
                Formula calendar
            </h1>
            <Component {...pageProps} />
        </div>
    );
}

export default withYM('86225016', Router)(App);
