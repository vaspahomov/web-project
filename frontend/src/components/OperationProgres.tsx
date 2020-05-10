import * as React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

export enum ProgressContext {
    SUCCESS,
    ERROR,
    IN_PROGRESS
}

type Props = {
    ctx: ProgressContext
}

const operationProgress: React.FunctionComponent<Props> = ({ctx}) => {
    console.log(1);
    switch (ctx) {
        case ProgressContext.SUCCESS:
            console.log(2);
            return <MuiAlert variant="filled" severity="success">Operation successfully finished</MuiAlert>;
        case ProgressContext.ERROR:
            console.log(3);
            return <MuiAlert variant="filled" severity="error">Operation has failed</MuiAlert>;
        case ProgressContext.IN_PROGRESS:
            console.log(4);
            return <MuiAlert variant="filled" severity="info">Operation in progress</MuiAlert>;
    }
};

export default operationProgress;