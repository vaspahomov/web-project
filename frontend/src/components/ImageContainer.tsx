import * as React from 'react';

type Props = {
    height: string;
    width: string;
    maxHeight?: string;
    maxWidth?: string;
    src: string;
}

const styles = {
    imageContainer: {

    }
}
const ImageContainer: React.FunctionComponent<Props> = ({height, width, maxHeight, maxWidth, src}) => {
    const {imageContainer} = styles;
    return (
        <div style={{...imageContainer, height, width, maxHeight, maxWidth}}>
            <img style={{height, width, maxHeight, maxWidth}} src={src} alt={"my image"}/>
        </div>
    );
};

export default ImageContainer;