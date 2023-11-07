import { Box, Button, TextField, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPssword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [disablesBtn, setDisabledBtn] = useState(false)
    const [statusText, setStatusText] = useState({ active: false, text: "" })
    const navigate = useNavigate()

    let loginCredentials = {
        username: username,
        password: password
    }

    useEffect(() => {
        if (username === "" || password === "") {
            setDisabledBtn(false)
        } else {
            setDisabledBtn(true)
        }
    }, [username, password])

    async function login() {
        const response = await fetch('http://localhost:3333/login', {
            method: 'POST',
            body: JSON.stringify(loginCredentials),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        if (!data.usernameExists) {
            setStatusText({ active: true, text: "Användare existerar inte" })
            wrongCredentials()
        } else if (data.usernameExists && !data.success) {
            setStatusText({ active: true, text: "Fel lösenord" })
            wrongCredentials()
        } else if (data.success) {
            sessionStorage.setItem("userInfo", JSON.stringify(data.playerInfo));
            navigate("/arena")
        }
    };

    function wrongCredentials() {
        setTimeout(function () {
            setStatusText({ active: false, text: "" })
        }, 3000);

    }
    return (
        <Box>
            <TextField
                onChange={(e) => setUsername(e.target.value)}
                id="standard-basic" label="Användarnamn" variant="standard" />
            <TextField
                onChange={(e) => setPssword(e.target.value)}
                id="standard-basic" label="Lösenord" variant="standard" type={showPassword ? "text" : "password"} />

            <Button variant={disablesBtn ? "contained" : "disabled"} color="primary" onClick={() => login()}>Logga in</Button>
            <Link to={"/create-account"}><h4>Skapa konto</h4></Link>
            {statusText.active && <Alert className="alert" severity="info">{statusText.text}</Alert>}

        </Box>
    );
}

export default Login;