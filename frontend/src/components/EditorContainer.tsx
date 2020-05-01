import * as React from 'react';
import CutFunction from "./editorFunctions/CutFunction";
import RotateFunction from "./editorFunctions/RotateFunction";
import TextFunction from "./editorFunctions/TextFunction";
import ColorFilterFunction from "./editorFunctions/ColorFilterFunction";
import BlurFunction from "./editorFunctions/BlurFunction";
import SaveFunction from "./editorFunctions/SaveFunction";

type Props = {
    imageHeight: string;
    imageWidth: string;
}

const styles = {
    wrapper: {
        margin: '30px auto',
    }, mainWrapper: {
        width: '100%',
        marginBottom: '5vh'
    }, editorFunctionsContainer: {
        margin: 'auto',
        width: '70%'
    }, inputGroupWrapper: {
        padding: '10px 0'
    }
};

const EditorContainer: React.FunctionComponent<Props> = ({children, imageHeight, imageWidth}) => {
    const {wrapper, mainWrapper, editorFunctionsContainer, inputGroupWrapper} = styles;
    return (
        <div style={mainWrapper}>
            <div style={{...wrapper, height: imageHeight, width: imageWidth}}>
                {children}
            </div>
            <div style={editorFunctionsContainer}>
                <CutFunction style={inputGroupWrapper}/>
                <RotateFunction style={inputGroupWrapper}/>
                <TextFunction style={inputGroupWrapper}/>
                <ColorFilterFunction style={inputGroupWrapper}/>
                <BlurFunction style={inputGroupWrapper}/>
                <SaveFunction style={inputGroupWrapper}/>
            </div>
        </div>
    );
};

export default EditorContainer;