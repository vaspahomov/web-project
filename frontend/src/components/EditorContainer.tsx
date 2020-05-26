import * as React from 'react';
import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {AppBar, Box, CircularProgress, Tab, Tabs, Typography} from "@material-ui/core";

import CutFunction from "./editorFunctions/CutFunction";
import RotateFunction from "./editorFunctions/RotateFunction";
import TextFunction from "./editorFunctions/TextFunction";
import ColorFilterFunction from "./editorFunctions/ColorFilterFunction";
import BlurFunction from "./editorFunctions/BlurFunction";
import SaveFunction from "./editorFunctions/SaveFunction";
import {EditorService} from "../api/editor";
import ImageContainer from "./ImageContainer";
import {Image} from "../static/ImagesCollection";

type Props = {
    height: string;
    width: string;
    maxWidth: string;
    maxHeight: string;
    image: Image;
}

const styles = {
    wrapper: {
        margin: '30px auto',
    }, mainWrapper: {
        width: '100%',
        minHeight: 'calc(100vh - 215px)',
    }, editorFunctionsContainer: {
        margin: 'auto',
        width: '95%'
    }, inputGroupWrapper: {
        padding: '10px 0'
    }, card: {
        margin: '10px 2%'
    }
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const EditorContainer: React.FunctionComponent<Props> = ({children, width, height, maxWidth, maxHeight, image}) => {
    const {wrapper, mainWrapper, editorFunctionsContainer, inputGroupWrapper, card} = styles;
    const [value, setValue] = React.useState(0);
    const editorService = new EditorService();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    const [loaded, changeLoaded] = useState(false);
    return (
        <div style={mainWrapper}>
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable"
                          aria-label="Editor tabs">
                        <Tab label="Crop" {...a11yProps(0)} />
                        <Tab label="Rotate" {...a11yProps(1)} />
                        <Tab label="Add text" {...a11yProps(2)} />
                        <Tab label="Color filters" {...a11yProps(3)} />
                        <Tab label="Blure filters" {...a11yProps(4)} />
                        <Tab label="Save" {...a11yProps(5)} />
                    </Tabs>
                </AppBar>
            </div>
            <div>
                <SwipeableViews
                    axis={'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        <CutFunction style={inputGroupWrapper}
                                     editorService={editorService}
                                     changeLoaded={changeLoaded}
                                     pictureId={image.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <RotateFunction style={inputGroupWrapper}
                                        editorService={editorService}
                                        changeLoaded={changeLoaded}
                                        pictureId={image.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TextFunction style={inputGroupWrapper}
                                      editorService={editorService}
                                      changeLoaded={changeLoaded}
                                      pictureId={image.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ColorFilterFunction style={inputGroupWrapper}
                                             editorService={editorService}
                                             changeLoaded={changeLoaded}
                                             pictureId={image.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <BlurFunction style={inputGroupWrapper}
                                      editorService={editorService}
                                      changeLoaded={changeLoaded}
                                      pictureId={image.id}/>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <SaveFunction style={inputGroupWrapper}
                                      editorService={editorService}
                                      changeLoaded={changeLoaded}
                                      pictureId={image.id}/>
                    </TabPanel>
                </SwipeableViews>
            </div>
            <div style={{...wrapper, height, width, maxWidth, maxHeight}}>
                <ImageContainer src={image === undefined ? "" : image.url}
                                height={height} width={width}
                                maxWidth={maxWidth} maxHeight={maxHeight}
                                onLoad={() => changeLoaded(true)}/>
                {!loaded && <CircularProgress/>}
            </div>
        </div>
    );
};

export default EditorContainer;