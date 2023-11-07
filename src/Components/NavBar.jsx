import { Box } from "@mui/system";
import styles from "./NavBar.module.css"
import hamburger from "../Assets/hamburger.png"
import euroLogo from "../Assets/euroLogo.png"
import arrowPath from "../Assets/arrowPath.png"
import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'

function NavBar(props) {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const info = sessionStorage.getItem("userInfo")
    const userInfo = JSON.parse(info)
    const path = window.location.pathname.substring(0, 20)



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (path) => {
        setAnchorEl(null);
        navigate(path)
    }

    function navigateTo(path) {
        navigate(path)
    }

    function logOut() {
        window.sessionStorage.clear()
        navigate("/")
    }

    return (
        <Box className={styles.navBarContainer}>
            <img onClick={handleClick} className={styles.hamburger} src={hamburger} alt="" />
            <Menu className={styles.menu}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => navigateTo("/arena")}>Arena {path === "/arena" && <img src={arrowPath} alt="" />}</MenuItem >
                <MenuItem onClick={() => navigateTo("/standings")}>Tabell {path === "/standings" && <img src={arrowPath} alt="" />}</MenuItem >
                <MenuItem onClick={() => navigateTo("/personalBets")}>Mina bet {path === "/personalBets" && <img src={arrowPath} alt="" />}</MenuItem>
                <MenuItem onClick={() => navigateTo("/stats")}>Mina stats {path === "/stats" && <img src={arrowPath} alt="" />}</MenuItem>
                <MenuItem onClick={() => navigateTo("/all-games")}>Alla matcher {path === "/all-games" && <img src={arrowPath} alt="" />}</MenuItem>
                <MenuItem onClick={() => navigateTo("/profile")}>Profil {path === "/profile" && <img src={arrowPath} alt="" />}</MenuItem>
                <MenuItem onClick={() => logOut()}>Logga ut</MenuItem>
            </Menu>

            <img className={styles.euroLogo} src={euroLogo} alt="" />

            <img className={styles.profileImg} src={userInfo.profilePic} alt="" />

        </Box>
    );
}

export default NavBar;



