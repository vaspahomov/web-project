import * as React from 'react';
import Link from "next/link";
import {AppBar, ListItemIcon, MenuItem, Typography} from "@material-ui/core";
import {useMediaQuery} from 'react-responsive';
import {Home, Palette, PermIdentity, PhotoLibrary} from "@material-ui/icons";

export enum NavTab {
    Login,
    MyCollection,
    Editor
}

type Props = {
    activeTab: NavTab
}

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

const Header: React.FunctionComponent<Props> = ({activeTab}) => {
    const {navCard, nav} = styles;
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 800px)'
    })
    return (
        <div style={{padding: '0 0 60px'}}>
            <AppBar>
                <div style={nav}>
                    <Link href="/">
                        <MenuItem style={navCard}>
                            <ListItemIcon> <Home/></ListItemIcon>
                            {isDesktopOrLaptop && <Typography variant="inherit">Home</Typography>}
                        </MenuItem>
                    </Link>
                    {activeTab !== NavTab.Login &&
                    <Link href="/login">
                        <MenuItem style={navCard}>
                            <ListItemIcon> <PermIdentity/></ListItemIcon>
                            {isDesktopOrLaptop && <Typography variant="inherit">Login</Typography>}
                        </MenuItem>
                    </Link>}
                    {activeTab !== NavTab.MyCollection &&
                    <Link href="/myCollection">
                        <MenuItem style={navCard}>
                            <ListItemIcon> <PhotoLibrary/></ListItemIcon>
                            {isDesktopOrLaptop && <Typography variant="inherit">My collection</Typography>}
                        </MenuItem>
                    </Link>}
                    {activeTab !== NavTab.Editor &&
                    <Link href="/editor">
                        <MenuItem style={navCard}>
                            <ListItemIcon><Palette/> </ListItemIcon>
                            {isDesktopOrLaptop && <Typography variant="inherit">Editor</Typography>}
                        </MenuItem>
                    </Link>}
                </div>
            </AppBar>
            <hr style={{margin: 0}}/>
        </div>
    );
};

export default Header;