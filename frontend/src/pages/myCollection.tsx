import * as React from 'react'
import {useEffect, useState} from 'react'

import Layout from "../components/Layout";
import ImageCollectionWrapper from "../components/ImageCollectionWrapper";
import ImageCard from "../components/ImageCard";
import {Image, ImagesCollection} from "../static/ImagesCollection";
import {LoginService} from "../api/login";
import {Typography} from "@material-ui/core";

const authService = new LoginService();
const imagesCollection = new ImagesCollection();

export default function MyCollection() {
    const [images, setImages] = useState([] as Image[]);
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) imagesCollection.getAllImages(jwt).then(r => {
            console.log(r);
            setImages(r)
        });
    }, []);
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