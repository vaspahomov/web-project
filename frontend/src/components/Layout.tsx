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
            <meta charSet='utf-8'/>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
            <meta name='viewport'
                  content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
            <meta name='description' content='Description'/>
            <meta name='keywords' content='Keywords'/>
            <title>Next.js PWA Example</title>
            <link rel="manifest" href="/manifest.json"/>
            <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16'/>
            <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32'/>
            <link rel="apple-touch-icon" href="/apple-icon.png"></link>
            <meta name="theme-color" content="#317EFB"/>
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