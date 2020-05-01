import * as React from 'react';
import Link from "next/link";
import {ListItemIcon, MenuItem, MenuList, Typography} from "@material-ui/core";
import {useMediaQuery} from 'react-responsive';
import {Home, Palette, PermIdentity, PhotoLibrary} from "@material-ui/icons";

type Props = {}

const styles = {
    link: {
        fontSize: '40px',
        margin: '0 10px'
    }, navCard: {
        width: '25%',
        margin: '0'
    }, nav: {
        padding: 0,
        display: 'flex',
        height: '60px'
    }
}

const Header: React.FunctionComponent<Props> = () => {
    const {navCard, nav} = styles;
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 800px)'
    })
    return (
        <header>
            <MenuList style={nav}>
                <Link href="/">
                    <MenuItem style={navCard}>
                        <ListItemIcon> <Home/></ListItemIcon>
                        {isDesktopOrLaptop && <Typography variant="inherit">Home</Typography>}
                    </MenuItem>
                </Link>
                <Link href="/login">
                    <MenuItem style={navCard}>
                        <ListItemIcon> <PermIdentity/></ListItemIcon>
                        {isDesktopOrLaptop && <Typography variant="inherit">Login</Typography>}
                    </MenuItem>
                </Link>
                <Link href="/myCollection">
                    <MenuItem style={navCard}>
                        <ListItemIcon> <PhotoLibrary/></ListItemIcon>
                        {isDesktopOrLaptop && <Typography variant="inherit">My collection</Typography>}
                    </MenuItem>
                </Link>
                <Link href="/editor">
                    <MenuItem style={navCard}>
                        <ListItemIcon><Palette/> </ListItemIcon>
                        {isDesktopOrLaptop && <Typography variant="inherit">Editor</Typography>}
                    </MenuItem>
                </Link>
            </MenuList>
            <hr style={{margin: 0}}/>
        </header>
    );
};

export default Header;