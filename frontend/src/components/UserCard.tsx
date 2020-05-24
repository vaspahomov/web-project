import * as React from 'react'

import {Avatar, Card, CardActions, CardHeader, IconButton, Typography} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {common} from "@material-ui/core/colors";
import Link from "next/link";
import {PhotoLibrary} from "@material-ui/icons";

type Props = {
    username: string;
    handleLogout: () => void;
    disableLibrary?: boolean;
}

const styles = {
    root: {
        width: 'auto',
        margin: '10px'
    },
    avatar: {
        backgroundColor: common.white,
    },
};

const UserCard: React.FunctionComponent<Props> = (
    {
        username,
        children,
        handleLogout,
        disableLibrary
    }) => {
    return (<Card style={styles.root}>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" style={styles.avatar}
                        src={"https://avatars.mds.yandex.net/get-pdb/2750535/c94a35af-0a76-4a05-ade5-1b7bf721b13e/s1200"}>
                    A
                </Avatar>
            }
            title={username}
            subheader="September 14, 2016"
        />
        <CardActions disableSpacing>
            <IconButton
                onClick={handleLogout}
                aria-label="log out"
            >
                <Typography variant="button">Log out</Typography>
                <ExitToAppIcon/>
            </IconButton>
            {!disableLibrary ?
                <Link href={'myCollection'}>
                    <IconButton
                        aria-label="log out"
                    >
                        <Typography variant="button">My library</Typography>
                        <PhotoLibrary/>
                    </IconButton>
                </Link> : null}
        </CardActions>
    </Card>);
};

export default UserCard;