import * as React from 'react'

import Layout from "../components/Layout";
import EditorContainer from "../components/EditorContainer";
import ImageContainer from "../components/ImageContainer";

export default function MyCollection() {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <EditorContainer imageHeight={"1200px"} imageWidth={"1600px"}>
                <ImageContainer height={"1200px"} width={"1600px"}/>
            </EditorContainer>
        </Layout>
    );
}