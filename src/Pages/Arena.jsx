import { Box } from "@mui/system";
import { CircularProgress, Grid } from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import styles from "./arena.module.css"
import Footer from "../Components/Footer";
import swords from "../Assets/swords.png";
import { flags } from "../Constants"

function Arena() {

    const [hasDoneBet, setHasDoneBet] = useState(true)
    const [allGames, setAllGames] = useState([])

    const navigate = useNavigate()
    const temp = allGames.map(d => Math.abs(new Date() - new Date(d.UTC).getTime()));
    const idx = temp.indexOf(Math.min(...temp));
    const info = sessionStorage.getItem("userInfo")
    const userName = JSON.parse(info)


    useEffect(() => {

        setTimeout(function () {
            if (userName) {
                checkIfMadeTeam(userName.username)
            }
            setHasDoneBet(false)
        }, 1500);
        getAllGames()
    }, [])

    const flagOne = allGames.length > 0 && flags.find(flag => flag.country === allGames[idx].team1.team)
    const flagTwo = allGames.length > 0 && flags.find(flag => flag.country === allGames[idx].team2.team)



    async function checkIfMadeTeam(userName) {
        const response = await fetch('http://localhost:3333/checkIfMadeTeam', {
            method: 'POST',
            body: JSON.stringify({ userName }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        console.log(data);
        if (!data.hasTeam) {
            navigate("/create-bet")

        }
    };

    async function getAllGames() {
        const response = await fetch('http://localhost:3333/getAllGames', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setAllGames(data)
        sessionStorage.setItem("allGames", JSON.stringify(data));

    };


    console.log(userName);
    return (
        <Box className={styles.arenaContainer}>
            {hasDoneBet ?
                <Box>
                    <CircularProgress />
                </Box>
                :
                <Box>
                    <NavBar />

                    <article className={styles.flags}>
                        <img src={flagOne && flagOne.flag} alt="" />
                        <img src={swords} alt="" />
                        <img src={flagTwo && flagTwo.flag} alt="" />
                    </article>
                    <Grid className={styles.nextGameContainer}>
                        <h1>Nästa match</h1>
                        <h4>{allGames[idx].title}</h4>
                        <h3>{allGames[idx].date}</h3>
                    </Grid>

                    <Footer userName={userName} />
                </Box>
            }
        </Box>
    );
}

export default Arena;