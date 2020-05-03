import * as React from 'react';
import Link from "next/link";
import ImageContainer from "./ImageContainer";
import {Card, CardActionArea, Link as L, Typography} from "@material-ui/core";

type Props = {
    width: number;
    name: string;
    ratio: number;
    src: string;
    imageId: string;
}

const styles = {
    rootContainer: {
        margin: '20px'
    }, description: {
        margin: '10px',
        display: 'flex',
        'flex-wrap': 'wrap',
    }, descriptionElement: {
        margin: '5px',
    }
}
const ImageCard: React.FunctionComponent<Props> = ({width, name, src, imageId, ratio}) => {
    const {rootContainer, description, descriptionElement} = styles;
    const maxHeightCSS = `${width / ratio}px`;
    const maxCardHeightCSS = `${(width / ratio) + 60}px`;
    const maxWidthCSS = `${width}px`;
    const widthCSS = '90vw';
    const heightCSS = `${90 / ratio}vw`;
    return (
        <Card style={{...rootContainer, maxWidth: maxWidthCSS, maxHeight: maxCardHeightCSS}}>
            <Link href={{pathname: "/editor", query: {id: imageId}}}>
                <CardActionArea>
                        <ImageContainer height={heightCSS} width={widthCSS} src={src} maxHeight={maxHeightCSS}
                                        maxWidth={maxWidthCSS}/>
                </CardActionArea>
            </Link>
            <div style={description}>
                <Typography style={descriptionElement}>{name}</Typography>
                <Typography style={descriptionElement}>
                    <Link href={{pathname: "/editor", query: {id: imageId}}}>
                        <L style={{cursor: "pointer"}}>Edit</L>
                    </Link>
                </Typography>
            </div>
        </Card>
    );
};

export default ImageCard;