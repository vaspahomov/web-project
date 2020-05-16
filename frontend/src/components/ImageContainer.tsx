import * as React from 'react';
import {useState} from 'react';

type Props = {
    height: string;
    width: string;
    maxHeight?: string;
    maxWidth?: string;
    src: string;
    onLoad?: () => void;
}

const styles = {
    imageContainer: {}
}

const ImageContainer: React.FunctionComponent<Props> = ({height, width, maxHeight, maxWidth, src, onLoad}) => {
    const {imageContainer} = styles;
    const [visible, changeVisible] = useState(false);
    return (
        <div style={{...imageContainer, height, width, maxHeight, maxWidth}}>
            <img style={{height, width, maxHeight, maxWidth, display: visible ? "inline" : "none"}} src={src}
                 alt={"my image"} onLoad={() => {
                if (onLoad) onLoad();
                changeVisible(true);
            }}/>
        </div>
    );
};

export default ImageContainer;