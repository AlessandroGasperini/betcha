import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import styles from "./myStats.module.css"

function MyStats() {

    const [myBets, setMyBets] = useState()
    const info = sessionStorage.getItem("userInfo")
    const allGames = sessionStorage.getItem("allGames")
    const userName = JSON.parse(info)
    const games = JSON.parse(allGames)
    const playedGames = games.filter((obj) => obj.done === true).length
    const redCards = games.reduce((a, b) => +a + +b.redCards, 0)
    const gamesRedCards = myBets && myBets.find(obj => obj.redCards).redCards
    const zeroZero = games.filter((game) => (game.done && game.totalGoals === 0)).length
    const gamesZeroZero = myBets && myBets.find(obj => obj.zeroZero).zeroZero
    const totalGoals = games.reduce((a, b) => +a + +b.totalGoals, 0)
    const gamesTotalGoals = myBets && myBets.find(obj => obj.totalGoals).totalGoals


    async function getPersonalBets() {
        const response = await fetch('http://localhost:3333/personalBets', {
            method: 'POST',
            body: JSON.stringify(userName),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setMyBets(data);
    };

    useEffect(() => {
        getPersonalBets()
    }, [])


    return (
        <Box>
            <NavBar />
            <h1>MyStats</h1>
            <article>
                <h3>Spelade matcher: {playedGames} av {games.length}</h3>
            </article>


            <section>
                <article>
                    <h4>Rätt resultat</h4>
                    INTE KLAR
                </article>
                <article>
                    <h4>Rätt vinnare</h4>
                    INTE KLAR
                </article>
            </section>

            <section>
                <h4>Röda kort</h4>
                <article style={{ color: redCards > gamesRedCards ? "red" : redCards < gamesRedCards ? "orange" : "green" }}>
                    {redCards} / {gamesRedCards}
                </article>
            </section>

            <section>
                <h4>Matcher som slutar 0 - 0</h4>
                <article style={{ color: zeroZero > gamesZeroZero ? "red" : zeroZero < gamesZeroZero ? "orange" : "green" }}>
                    {zeroZero} / {gamesZeroZero}
                </article>
            </section>

            <section>
                <h4>Totalt antal mål</h4>
                <article style={{ color: totalGoals > gamesTotalGoals ? "red" : totalGoals < gamesTotalGoals ? "orange" : "green" }} >
                    {totalGoals} / {gamesTotalGoals}
                </article>
            </section>
        </Box >
    );
}

export default MyStats;