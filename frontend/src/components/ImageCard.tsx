import * as React from 'react';
import Link from "next/link";
import ImageContainer from "./ImageContainer";
import {Card} from "@material-ui/core";

type Props = {
    width: number;
    name: string;
    ratio: number;
}

const styles = {
    rootContainer: {
        margin: '20px'
    }, description: {
        margin: '0 5px'
    }
}
const ImageCard: React.FunctionComponent<Props> = ({width, name, ratio}) => {
    const {rootContainer, description} = styles;
    const maxHeightCSS = `${width / ratio}px`;
    const maxWidthCSS = `${width}px`;
    const widthCSS = '90vw';
    const heightCSS = `${90 / ratio}vw`;
    return (
        <Card style={{...rootContainer, maxWidth: maxWidthCSS}}>
            <ImageContainer height={heightCSS} width={widthCSS} maxHeight={maxHeightCSS} maxWidth={maxWidthCSS}/>
            <div style={description}>
                <p>{name}</p>
                <Link href={"/editor"}><a>Edit</a></Link>
            </div>
        </Card>
    );
};

export default ImageCard;