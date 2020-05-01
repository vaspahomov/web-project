import * as React from 'react'

import Layout from "../components/Layout";
import ImageCollectionWrapper from "../components/ImageCollectionWrapper";
import ImageCard from "../components/ImageCard";

export default function MyCollection() {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <ImageCollectionWrapper>
                <ImageCard height={"300px"} width={"400px"} name={"Картинка"}/>
                <ImageCard height={"300px"} width={"400px"} name={"Картинка"}/>
                <ImageCard height={"300px"} width={"400px"} name={"Картинка"}/>
                <ImageCard height={"300px"} width={"400px"} name={"Картинка"}/>
                <ImageCard height={"300px"} width={"400px"} name={"Картинка"}/>
                <ImageCard height={"300px"} width={"400px"} name={"Картинка"}/>
                <ImageCard height={"300px"} width={"400px"} name={"Картинка"}/>
            </ImageCollectionWrapper>
        </Layout>
    );
}