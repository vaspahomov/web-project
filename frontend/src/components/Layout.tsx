import * as React from 'react'
import {CSSProperties, useEffect, useState} from 'react'
import Head from 'next/head'
import {Link as L, Typography} from '@material-ui/core';

import UserCard from "./UserCard";
import {LoginService, UserEntity} from "../api/login";

type Props = {
    title?: string;
    disableUserCard?: boolean;
    disableLibrary?: boolean;
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

const authService = new LoginService();

const Layout: React.FunctionComponent<Props> = (
    {
        children,
        disableUserCard,
        disableLibrary,
        title = 'Photokek',
    }) => {
    const {footer, footerLink} = styles;
    const [user, setUser] = useState(null as UserEntity | null);
    useEffect(() => {
        authService.me().then(r => setUser(r));
    }, []);
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
        {!disableUserCard? <UserCard username={user? user.username: ''} handleLogout={() => {}} disableLibrary={disableLibrary}/>: null}
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