import * as React from 'react'

import Layout from "../components/Layout";
import ImageCollectionWrapper from "../components/ImageCollectionWrapper";
import ImageCard from "../components/ImageCard";
import {ImagesCollection} from "../static/ImagesCollection";
import {NavTab} from "../components/Header";

export default function MyCollection() {
    const imagesCollection = new ImagesCollection();
    const images = imagesCollection.getAllImages();
    return (
        <Layout title="Photokek | Collection" activeTab={NavTab.MyCollection}>
            <ImageCollectionWrapper>
                {images.map((image) =>
                    <ImageCard imageId={image.id} width={image.width <= 400 ? image.width : 400} name={image.name}
                               ratio={image.width / image.height} src={image.url}/>
                )}
            </ImageCollectionWrapper>
        </Layout>
    );
}