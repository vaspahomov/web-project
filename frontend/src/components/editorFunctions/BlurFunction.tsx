import * as React from 'react';
import {CSSProperties, Dispatch, useState} from 'react';
import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";
import {BlurFilters, EditorService} from "../../api/editor";
import MuiAlert from "@material-ui/lab/Alert";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
    setPictureId: (id: any) => void;
}

const handleOperation = (setCtx: Dispatch<boolean>) => {
    setCtx(true);
    setTimeout(() => setCtx(false), 3000);
}

const BlurFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId, setPictureId}) => {
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
                            let resp;
                            try {
                                resp = await editorService.applyBlurFilter(pictureId, BlurFilters.Round)
                            } catch {
                                return handleOperation(setError)
                            }
                            handleOperation(setSuccess)
                            setPictureId(resp.id);
                        }}>Round</Button>
                        <Button onClick={async () => {
                            handleOperation(setInProgress);
                            let resp;
                            try {
                                resp = await editorService.applyBlurFilter(pictureId, BlurFilters.Gauss)
                            } catch {
                                return handleOperation(setError)
                            }
                            handleOperation(setSuccess)
                            setPictureId(resp.id);
                        }}>Gauss</Button>
                    </ButtonGroup>
                </CardContent>
            </Card>
            {success ? <MuiAlert variant="filled" severity="success">Operation successfully finished</MuiAlert> :
                error ? <MuiAlert variant="filled" severity="error">Operation has failed</MuiAlert> :
                    inProgress ? <MuiAlert variant="filled" severity="info">Operation in progress</MuiAlert>
                        : undefined}
        </div>
    )
};

export default BlurFunction;