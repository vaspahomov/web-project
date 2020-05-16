import * as React from 'react';

type Props = {}

const styles = {
    container: {
        display: 'flex',
        'flex-wrap': 'wrap',
        'justify-content': 'space-around',
        minHeight: 'calc(100vh - 120px)',
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