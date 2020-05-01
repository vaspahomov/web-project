import * as React from 'react';
import Link from "next/link";
import {ListItemIcon, MenuItem, MenuList, Typography} from "@material-ui/core";

type Props = {}

const styles = {
    link: {
        fontSize: '40px',
        margin: '0 10px'
    }, navCard: {
        width: '33.33%',
        margin: '0'
    }, nav: {
        padding: 0,
        display: 'flex',
        height: '60px'
    }
}

const Header: React.FunctionComponent<Props> = () => {
    const {navCard, nav} = styles;
    return (
        <header>
            <MenuList style={nav}>
                <Link href="/login">
                    <MenuItem style={navCard}>
                        <ListItemIcon> </ListItemIcon>
                        <Typography variant="inherit">Login</Typography>
                    </MenuItem>
                </Link>
                <Link href="/myCollection">
                    <MenuItem style={navCard}>
                        <ListItemIcon> </ListItemIcon>
                        <Typography variant="inherit">My collection</Typography>
                    </MenuItem>
                </Link>
                <Link href="/editor">
                    <MenuItem style={navCard}>
                        <ListItemIcon> </ListItemIcon>
                        <Typography variant="inherit">Editor</Typography>
                    </MenuItem>
                </Link>
            </MenuList>
            <hr style={{margin: 0}}/>
        </header>
    );
};

export default Header;