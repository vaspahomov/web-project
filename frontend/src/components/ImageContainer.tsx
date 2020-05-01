import * as React from 'react';

type Props = {
    height: string;
    width: string;
}

const styles = {
    imageContainer: {
        backgroundColor: '#f00',
    }
}
const ImageContainer: React.FunctionComponent<Props> = ({height, width}) => {
    const {imageContainer} = styles;
    return (
        <div style={{...imageContainer, height, width}}>
            <img src={""} alt={""}/>
        </div>
    );
};

export default ImageContainer;