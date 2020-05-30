import * as React from 'react'
import {useEffect} from 'react'

import Layout from "../components/Layout";
import ImageCollectionWrapper from "../components/ImageCollectionWrapper";
import ImageCard from "../components/ImageCard";
import {Image, ImagesCollection} from "../static/ImagesCollection";
import {LoginService} from "../api/login";
import {Typography} from "@material-ui/core";

const authService = new LoginService();

export default function MyCollection() {
    const imagesCollection = new ImagesCollection();
    let images: Image[] = [];
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) imagesCollection.getAllImages(jwt).then(r => images = r);
    })
    return (
        <Layout title="Photokek | Collection" disableLibrary>
            <ImageCollectionWrapper>
                {images.length > 0 ?
                    images.map((image) =>
                        <ImageCard imageId={image.id} width={image.width <= 400 ? image.width : 400} name={image.name}
                                   ratio={image.width / image.height} src={image.url}/>
                    ) :
                    <Typography style={{width: '240px', height: '100px'}}>Картинки не были найдены</Typography>}
            </ImageCollectionWrapper>
        </Layout>
    );
}