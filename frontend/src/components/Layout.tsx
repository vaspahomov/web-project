import * as React from 'react'
import {CSSProperties} from 'react'
import Head from 'next/head'
import {Link as L, Typography} from '@material-ui/core';

import Header, {NavTab} from "./Header";

type Props = {
    title?: string;
    activeTab: NavTab;
}

const styles = {
    footer: {
        height: '50px',
        position: 'sticky'
    }, footerLink: {
        fontSize: '18px',
        margin: '0 20px'
    }
};

const Layout: React.FunctionComponent<Props> = (
    {
        children,
        title = 'Photokek',
        activeTab
    }) => {
    const {footer, footerLink} = styles;
    return (<div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta charSet='utf-8'/>
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta name='viewport'
                  content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
            <meta name='description' content='Description'/>
            <meta name='keywords' content='Keywords'/>
            <link rel="manifest" href="/manifest.json"/>
            <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16'/>
            <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32'/>
            <link rel="apple-touch-icon" href="/apple-icon.png"></link>
            <meta name="theme-color" content="#317EFB"/>
        </Head>
        <Header activeTab={activeTab}/>
        {children}
        <footer style={footer as CSSProperties}>
            <hr/>
            <Typography>
                <L href={"https://github.com/vaspahomov/web-project"} style={footerLink}>Project home page</L>
            </Typography>
        </footer>
    </div>);
};

export default Layout