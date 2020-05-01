import * as React from "react";
import {Component} from "react";

import '../styles/global.css'

type Props = {
    Component: any;
    pageProps: any;
}

export default function App({Component, pageProps}: Props): any {
    return <Component {...pageProps} />
}