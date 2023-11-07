import { Box } from "@mui/system";
import styles from "./allGames.module.css"
import { flags } from "../Constants"
import noScore from "../Assets/noScore.png"
import football from "../Assets/football.png"
import redCard from "../Assets/redCard.png"
import { Divider } from "@mui/material";
import NavBar from "../Components/NavBar";

function AllGames() {

    const games = sessionStorage.getItem("allGames")
    const allGames = JSON.parse(games)

    function redCards(num) {
        let cards = []
        for (let i = 0; i < num; ++i) {
            cards.push(<i key={i}></i>)
        }
        return cards
    }


    return (
        <Box className={styles.allGames}>
            <NavBar />
            {
                allGames.map((game) => (
                    <article>
                        <h2 style={{ margin: "2vh" }}>{game.title}</h2>

                        <h4 style={{ marginTop: "0px" }}>{game.date}</h4>

                        <article className={styles.score}>
                            <article >
                                <img className={styles.flag} src={flags.find(t => t.country === game.team1.team).flag} alt="" />
                                {game.done ? <h5>{game.team1.score}</h5> : <img className={styles.noScore} src={noScore} alt="" />}
                            </article>
                            <p>-</p>
                            <article>
                                {game.done ? <h5>{game.team2.score}</h5> : <img className={styles.noScore} src={noScore} alt="" />}
                                <img className={styles.flag} src={flags.find(t => t.country === game.team2.team).flag} alt="" />
                            </article>
                        </article>

                        <article style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "2vh" }}>
                            {game.redCards > 0 ? <article>
                                {redCards(game.redCards).map(() => (<img className={styles.redCards} src={redCard} alt="" />))}
                            </article> : null}
                            {game.done && <article className={styles.totalGoals}><p>{game.totalGoals}</p><img src={football} alt="" /></article>}
                        </article>

                        <Divider color="white" style={{ width: "90%", margin: "0 auto" }} />

                    </article>
                ))
            }
        </Box>
    );
}

export default AllGames;