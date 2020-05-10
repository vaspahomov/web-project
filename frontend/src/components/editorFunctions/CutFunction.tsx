import * as React from 'react';
import {CSSProperties, Dispatch, useState} from 'react';
import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";
import {ColorFilters, CropForm, EditorService} from "../../api/editor";
import MuiAlert from "@material-ui/lab/Alert";

type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
}

const handleOperation = (setCtx: Dispatch<boolean>) => {
    setCtx(true);
    setTimeout(() => setCtx(false), 3000);
}

const CutFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => {
    const [inProgress, setInProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    return (
        <div style={style}>
            <Card>
                <CardContent>
                    <ButtonGroup variant="contained" color="primary"
                                 aria-label="contained primary button group">
                        <Button onClick={async () => {
                            handleOperation(setInProgress);
                            try {
                                await editorService.crop(pictureId, CropForm.Round)
                            } catch {
                                return handleOperation(setError)
                            }
                            handleOperation(setSuccess)
                        }}>Round</Button>
                        <Button onClick={async () => {
                            handleOperation(setInProgress);
                            try {
                                await editorService.crop(pictureId, CropForm.Oval)
                            } catch {
                                return handleOperation(setError)
                            }
                            handleOperation(setSuccess)
                        }}>Oval</Button>
                        <Button onClick={async () => {
                            handleOperation(setInProgress);
                            try {
                                await editorService.crop(pictureId, CropForm.HeartShape)
                            } catch {
                                return handleOperation(setError)
                            }
                            handleOperation(setSuccess)
                        }}>Heart shaped</Button>
                    </ButtonGroup>
                </CardContent>
            </Card>
            {success ? <MuiAlert variant="filled" severity="success">Operation successfully finished</MuiAlert> :
                error ? <MuiAlert variant="filled" severity="error">Operation has failed</MuiAlert> :
                    inProgress ? <MuiAlert variant="filled" severity="info">Operation in progress</MuiAlert>
                        : undefined}
        </div>
    );
}

export default CutFunction;