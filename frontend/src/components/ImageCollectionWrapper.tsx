import * as React from 'react';

type Props = {}

const styles = {
    container: {
        display: 'flex',
        'flex-wrap': 'wrap',
        height: '90vh',
        width: '100vw',
    }
}
const ImageCollectionContainer: React.FunctionComponent<Props> = ({children}) => {
    const {container} = styles;
    return (
        <div style={container}>
            {children}
        </div>
    );
};

export default ImageCollectionContainer;