import * as React from 'react'

import Layout from "../components/Layout";
import ImageCollectionWrapper from "../components/ImageCollectionWrapper";
import ImageCard from "../components/ImageCard";

export default function MyCollection() {
    return (
        <Layout title="Photokek | Collection">
            <ImageCollectionWrapper>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
                <ImageCard width={400} ratio={4/3} name={"Картинка"} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"}/>
            </ImageCollectionWrapper>
        </Layout>
    );
}