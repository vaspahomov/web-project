import * as React from 'react'
import Link from "next/link";
import {ListItemIcon, MenuItem, MenuList, Paper, Typography} from "@material-ui/core";

import MainPageLayout from "../components/MainPageLayout";
import {Palette, PermIdentity, PhotoLibrary} from "@material-ui/icons";


const style = {
    list: {
        display: 'flex',
        'flex-direction': 'column',
        width: '100%',
        height: '100%',
        padding: 0
    },
    root: {
        width: '100vw',
        height: '100vh',
    },
    menuItem: {
        width: '100%',
        height: '33.33%',
        fontSize: '40px'
    }, icon: {
        fontSize: 80
    }
}

export default function Index() {
    const {menuItem, root, list, icon} = style;
    return (
        <MainPageLayout>
            <Paper style={root}>
                <MenuList style={list}>
                    <Link href="/login">
                        <MenuItem style={menuItem}>
                            <ListItemIcon> <PermIdentity style={icon}/></ListItemIcon>
                            <Typography variant="inherit">Login</Typography>
                        </MenuItem>
                    </Link>
                    <Link href="/myCollection">
                        <MenuItem style={menuItem}>
                            <ListItemIcon> <PhotoLibrary style={icon}/></ListItemIcon>
                            <Typography variant="inherit">My collection</Typography>
                        </MenuItem>
                    </Link>
                    <Link href="/editor">
                        <MenuItem style={menuItem}>
                            <ListItemIcon><Palette style={icon}/> </ListItemIcon>
                            <Typography variant="inherit">Editor</Typography>
                        </MenuItem>
                    </Link>
                </MenuList>
            </Paper>
        </MainPageLayout>
    );
}