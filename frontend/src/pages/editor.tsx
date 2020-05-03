import * as React from 'react'

import Layout from "../components/Layout";
import EditorContainer from "../components/EditorContainer";
import ImageContainer from "../components/ImageContainer";
import {NavTab} from "../components/Header";
import {ImagesCollection} from "../static/ImagesCollection";
import { useRouter } from 'next/router'

export default function Editor() {
    const imagesCollection = new ImagesCollection()
    const router = useRouter();
    const id = router.query.id;
    const image = imagesCollection.getImage(id === undefined ? "0": id as string);
    const width = 1600;
    const ratio = 4/3;

    const maxHeightCSS = `${width / ratio}px`;
    const maxWidthCSS = `${width}px`;
    const widthCSS = '90vw';
    const heightCSS = `${90 / ratio}vw`;
    return (
        <Layout title="Photokek | Editor" activeTab={NavTab.Editor}>
            <EditorContainer height={heightCSS} width={widthCSS} maxWidth={maxWidthCSS} maxHeight={maxHeightCSS}>
                <ImageContainer src={image === undefined ? "" : image.url} height={heightCSS} width={widthCSS} maxWidth={maxWidthCSS} maxHeight={maxHeightCSS}/>
            </EditorContainer>
        </Layout>
    );
}