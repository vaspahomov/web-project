import * as React from 'react'
import Head from 'next/head'
import {Link as L} from '@material-ui/core';

import Header from "./Header";
import {CSSProperties} from "react";

type Props = {
    title?: string;
}

const styles = {
    footer: {
        height: '50px',
        position: 'sticky'
    }, footerLink: {
        fontSize: '24px',
        margin: '0 20px'
    }
};

const Layout: React.FunctionComponent<Props> = (
    {
        children,
        title = 'Photokek',
    }) => {
    const {footer, footerLink} = styles;
    return (<div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <Header/>
        {children}
        <footer style={footer as CSSProperties}>
            <hr/>
            <L href={"https://github.com/vaspahomov/web-project"} style={footerLink}>Project home page</L>
        </footer>
    </div>);
};

export default Layout