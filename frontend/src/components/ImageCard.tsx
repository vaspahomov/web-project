import * as React from 'react';
import Link from "next/link";
import ImageContainer from "./ImageContainer";

type Props = {
    height: string;
    width: string;
    name: string;
}

const styles = {
    rootContainer: {
        margin: '20px'
    }
}
const ImageCard: React.FunctionComponent<Props> = ({height, width, name}) => {
    const {rootContainer} = styles;
    return (<div style={rootContainer}>
            <ImageContainer height={height} width={width}/>
            <p>{name}</p>
            <Link href={"/editor"}><a>Edit</a></Link>
        </div>
    );
};

export default ImageCard;