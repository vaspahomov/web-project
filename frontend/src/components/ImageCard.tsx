import * as React from 'react';
import Link from "next/link";
import ImageContainer from "./ImageContainer";
import {Card, Link as L, Typography} from "@material-ui/core";

type Props = {
    width: number;
    name: string;
    ratio: number;
    src: string;
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
const ImageCard: React.FunctionComponent<Props> = ({width, name, src, ratio}) => {
    const {rootContainer, description, descriptionElement} = styles;
    const maxHeightCSS = `${width / ratio}px`;
    const maxCardHeightCSS = `${(width / ratio) + 60}px`;
    const maxWidthCSS = `${width}px`;
    const widthCSS = '90vw';
    const heightCSS = `${90 / ratio}vw`;
    return (
        <Card style={{...rootContainer, maxWidth: maxWidthCSS, maxHeight: maxCardHeightCSS}}>
            <ImageContainer height={heightCSS} width={widthCSS} src={src} maxHeight={maxHeightCSS}
                            maxWidth={maxWidthCSS}/>
            <div style={description}>
                <Typography style={descriptionElement}>{name}</Typography>
                <Typography style={descriptionElement}>
                    <Link href={"/editor"}>
                        <L>Edit</L>
                    </Link>
                </Typography>
            </div>
        </Card>
    );
};

export default ImageCard;