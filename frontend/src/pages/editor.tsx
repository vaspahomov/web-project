import * as React from 'react'
import {useEffect} from 'react'
import {NextPageContext} from "next";

import Layout from "../components/Layout";
import EditorContainer from "../components/EditorContainer";
import {Image, ImagesCollection} from "../static/ImagesCollection";

interface Props {
    id: string;
}

const Editor = ({id}: Props) => {
    let image: Image | undefined = undefined;
    useEffect(() => {
        const imagesCollection = new ImagesCollection()
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            imagesCollection
                .getImage(jwt, id === undefined ? "0" : id as string)
                .then(r => {
                    image = r
                });
        }
    })
    return (
        <Layout title="Photokek | Editor">
            {image !== undefined ?
                <EditorContainer height={`${90 / ((image as Image).width / (image as Image).height)}vw`} width={'90vw'}
                                 maxWidth={`${(image as Image).width}px`} maxHeight={`${(image as Image).height}px`}
                                 image={image}>
                </EditorContainer> : 'Картинка не была найдена'
            }
        </Layout>
    );
}

Editor.getInitialProps = async function (ctx: NextPageContext): Promise<Props> {
    const id = ctx.query.id;
    return {id: String(id)};
}

export default Editor;