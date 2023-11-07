import { Box, Button, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import CreateProfilePic from "../Components/CreateProfilePic";
import styles from "./createAccount.module.css"

function CreateAccount() {
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPssword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [email, setEmail] = useState("")
    const [teamName, setTeamName] = useState("")
    const [color, setColor] = useState("")
    const [emblem, setEmblem] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [disablesBtn, setDisabledBtn] = useState(false)
    const [statusText, setStatusText] = useState({ active: false, text: "" })


    const newAccount = {
        fullName: fullName,
        username: username,
        password: password,
        email: email,
        teamName: teamName,
        color: color,
        emblem: emblem,
        profilePic: profilePic,
        admin: false,
    }


    async function addNewAccount() {
        if (fullName === "" || username === "" || email === "" || password === "" || repeatPassword === "" || teamName === "" || color === "" || emblem === "") {
            setStatusText({ active: true, text: "Fyll i alla fält tack!" })
            wrongCredentials()
        } else if (fullName !== "" && username !== "" && email !== "" && password !== "" && repeatPassword !== "" && teamName !== "" && color !== "" && emblem !== "" && password.length < 5) {
            setStatusText({ active: true, text: "Lösenordet måste innehålla mints 5 tecken :)" })
            wrongCredentials()
        } else if (fullName !== "" && username !== "" && email !== "" && password !== "" && repeatPassword !== "" && teamName !== "" && color !== "" && emblem !== "" && password.length >= 5 && password !== repeatPassword) {
            setStatusText({ active: true, text: "Upprepade lösenordet stämmer inte :(" })
            wrongCredentials()
        } else {
            const response = await fetch('http://localhost:3333/addAccount', {
                method: 'POST',
                body: JSON.stringify(newAccount),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json()
            console.log(data);
            if (data.usernameExists) {
                setStatusText({ active: true, text: "Användarnamnet är upptaget :(" })
                wrongCredentials()
            } else if (!data.usernameExists && data.emailExists) {
                setStatusText({ active: true, text: "Emailadressen används redan :(" })
                wrongCredentials()
            } else if (data.success) {
                console.log("äntligen!!!!");
            }
        };
    }

    function wrongCredentials() {
        setTimeout(function () {
            setStatusText({ active: false, text: "" })
        }, 3000);

    }

    useEffect(() => {
        if (fullName !== "" && username !== "" && email !== "" && password !== "" && repeatPassword !== "" && teamName !== "" && color !== "" && emblem !== "" && password.length >= 5 && password === repeatPassword) {
            setDisabledBtn(true)
        } else {
            setDisabledBtn(false)
        }
    }, [fullName, username, email, password, repeatPassword, teamName, color, emblem])


    return (
        <Box>
            <TextField
                onChange={(e) => setFullName(e.target.value)}
                id="standard-basic" label="Fullt namn" variant="standard" />
            <TextField
                onChange={(e) => setUsername(e.target.value)}
                id="standard-basic" label="Användarnamn" variant="standard" />
            <TextField
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic" label="Email" variant="standard" />
            <TextField
                onChange={(e) => setTeamName(e.target.value)}
                id="standard-basic" label="Alias" variant="standard" />
            <TextField
                onChange={(e) => setPssword(e.target.value)}
                id="standard-basic" label="Lösenord" variant="standard" type={"password"} />
            <TextField
                onChange={(e) => setRepeatPassword(e.target.value)}
                id="standard-basic" label="Lösenord" variant="standard" type={"password"} />
            {/* <TextField
                onChange={(e) => changeHandler(e.target.value)}
                id="standard-basic" label="Profilebild" variant="standard" type="file" /> */}

            <CreateProfilePic setProfilePic={setProfilePic} />




            <button onClick={() => setColor("green")}>color</button>
            <button onClick={() => setEmblem("hej")}>emblem</button>

            {statusText.active && <Alert className="alert" severity="info">{statusText.text}</Alert>}


            {<Button variant="contained" color={disablesBtn ? "primary" : "error"} onClick={() => addNewAccount()}>Skapa konto</Button>}
        </Box >
    );
}

export default CreateAccount;
