import * as React from 'react';

type Props = {
    height: string;
    width: string;
    maxHeight?: string;
    maxWidth?: string;
}

const styles = {
    imageContainer: {
        backgroundColor: '#f00',
    }
}
const ImageContainer: React.FunctionComponent<Props> = ({height, width, maxHeight, maxWidth}) => {
    const {imageContainer} = styles;
    return (
        <div style={{...imageContainer, height, width, maxHeight, maxWidth}}>
            <img style={{height, width, maxHeight, maxWidth}} src={"https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"} alt={"my image"}/>
        </div>
    );
};

export default ImageContainer;