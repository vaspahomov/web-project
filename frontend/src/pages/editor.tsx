import * as React from 'react'

import Layout from "../components/Layout";
import EditorContainer from "../components/EditorContainer";
import ImageContainer from "../components/ImageContainer";

export default function MyCollection() {
    const width = 1600;
    const ratio = 4/3;

    const maxHeightCSS = `${width / ratio}px`;
    const maxWidthCSS = `${width}px`;
    const widthCSS = '90vw';
    const heightCSS = `${90 / ratio}vw`;
    return (
        <Layout title="Photokek | Editor">
            <EditorContainer height={heightCSS} width={widthCSS} maxWidth={maxWidthCSS} maxHeight={maxHeightCSS}>
                <ImageContainer src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"} height={heightCSS} width={widthCSS} maxWidth={maxWidthCSS} maxHeight={maxHeightCSS}/>
            </EditorContainer>
        </Layout>
    );
}