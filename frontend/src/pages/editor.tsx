import * as React from 'react'
import {NextPageContext} from "next";

import Layout from "../components/Layout";
import EditorContainer from "../components/EditorContainer";
import {Image, ImagesCollection} from "../static/ImagesCollection";

interface Props {
    image?: Image;
}

const Editor = ({image}: Props) => {
    if (!image) {
        return (
            <Layout title="Photokek | Editor">
                Картинка не была найдена
            </Layout>
        );
    }
    const ratio = image.width / image.height;
    const maxHeightCSS = `${image.height}px`;
    const maxWidthCSS = `${image.width}px`;
    const widthCSS = '90vw';
    const heightCSS = `${90 / ratio}vw`;
    return (
        <Layout title="Photokek | Editor">
            {image &&
            <EditorContainer height={heightCSS} width={widthCSS} maxWidth={maxWidthCSS} maxHeight={maxHeightCSS}
                             image={image}>
            </EditorContainer>}
        </Layout>
    );
}

Editor.getInitialProps = async function (ctx: NextPageContext): Promise<Props> {
    const imagesCollection = new ImagesCollection()
    const id = ctx.query.id;
    const image = await imagesCollection.getImage(id === undefined ? "0" : id as string);
    return {image};
}

export default Editor;