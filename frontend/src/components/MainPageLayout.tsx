import * as React from 'react'
import Head from 'next/head'

type Props = {
    title?: string;
}

const MainPageLayout: React.FunctionComponent<Props> = (
    {
        children,
        title = 'Photokek',
    }) => {
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
            <title>Photokek</title>
            <link rel="manifest" href="/manifest.json"/>
            <link href='/favicon.ico' rel='icon' type='image/png'/>
            <meta name="theme-color" content="#317EFB"/>
        </Head>
        {children}
    </div>);
};

export default MainPageLayout;