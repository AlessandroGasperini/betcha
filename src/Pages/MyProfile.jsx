import { Box } from "@mui/system";
import NavBar from "../Components/NavBar";
import styles from "./myProfile.module.css"
import { Divider, Button, TextField, Alert } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import CreateProfilePic from "../Components/CreateProfilePic";
import CloseIcon from '@mui/icons-material/Close';

function MyProfile() {

    // const profileInfo = sessionStorage.getItem("userInfo")
    // const profile = JSON.parse(profileInfo)

    // const [fullName, setFullName] = useState(profile.fullName)
    // const [profilePic, setProfilePic] = useState(profile.profilePic)
    // const [teamName, setTeamName] = useState(profile.teamName)
    // const [email, setEmail] = useState(profile.email)

    // const [editFullName, seteditFullName] = useState(false)
    // const [editProfilePic, seteditProfilePic] = useState(false)
    // const [editTeamName, seteditTeamName] = useState(false)
    // const [editEmail, seteditEmail] = useState(false)


    // const editedProfile = {
    //     email: email,
    //     fullName: fullName,
    //     profilePic: profilePic,
    //     teamName: teamName,
    // }

    return (
        <Box className={styles.profileCont}>
            <NavBar />

        </Box >
    );
}

export default MyProfile;