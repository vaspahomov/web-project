import * as React from 'react';

type Props = {}

const styles = {
    imageContainer: {
        margin: 'auto'
    }
}
const ImageContainer: React.FunctionComponent<Props> = () => {
    const {imageContainer} = styles;
    return (
        <div style={imageContainer}>

        </div>
    );
};

export default ImageContainer;