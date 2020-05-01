import * as React from 'react';
import CutFunction from "./editorFunctions/CutFunction";
import RotateFunction from "./editorFunctions/RotateFunction";
import TextFunction from "./editorFunctions/TextFunction";
import ColorFilterFunction from "./editorFunctions/ColorFilterFunction";
import BlurFunction from "./editorFunctions/BlurFunction";
import SaveFunction from "./editorFunctions/SaveFunction";
import {Card} from "@material-ui/core";

type Props = {
    height: string;
    width: string;
    maxWidth: string;
    maxHeight: string;
}

const styles = {
    wrapper: {
        margin: '30px auto',
    }, mainWrapper: {
        width: '100%',
        minHeight: 'calc(100vh - 120px)'
    }, editorFunctionsContainer: {
        margin: 'auto',
        width: '95%'
    }, inputGroupWrapper: {
        padding: '10px 0'
    }, card: {
        margin: '2%'
    }
};

const EditorContainer: React.FunctionComponent<Props> = ({children, width, height, maxWidth, maxHeight}) => {
    const {wrapper, mainWrapper, editorFunctionsContainer, inputGroupWrapper, card} = styles;
    return (
        <div style={mainWrapper}>
            <Card style={card}>
                <div style={{...wrapper, height, width, maxWidth, maxHeight}}>
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
            </Card>
        </div>
    );
};

export default EditorContainer;