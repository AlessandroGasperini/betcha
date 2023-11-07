import { Button, Grid, FormControl, Select, MenuItem, InputLabel, TextField, Alert, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react"
import ChangeModal from "../Components/ChangeModal";
import SendInBetModal from "../Components/SendInBetModal"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import closeView from '../Assets/closeView.png';
import styles from "./createBet.module.css"
import overViewImg from "../Assets/overViewImg.png"
import gavel from "../Assets/gavel.png"
import { useNavigate } from "react-router-dom";

function CreateBet() {

    const [allBets, setAllBets] = useState([])
    const [allTeams, setAllTeams] = useState()
    const [overView, setOverView] = useState(false)
    const [removeCheck, setRemoveCheck] = useState(false)
    const [showingPage, setShowingPage] = useState("groupStage")
    const [showSendBetBtn, setSendBetBtn] = useState(false)
    const [contentFull, setContentFull] = useState(false)
    const [sendInDoneBetModal, setSendInDoneBetModal] = useState(false)
    const [sendInAndLogOut, setSendInAndLogOut] = useState(false)


    const [betIndex, setBetIndex] = useState(0)
    const [teamOneScore, setTeamOneScore] = useState(0)
    const [teamTwoScore, setTeamTwoScore] = useState(0)

    const [group1Winner, setGroup1Winner] = useState("")
    const [group1RunnerUp, setGroup1RunnerUp] = useState("")
    const [group2Winner, setGroup2Winner] = useState("")
    const [group2RunnerUp, setGroup2RunnerUp] = useState("")
    const [group3Winner, setGroup3Winner] = useState("")
    const [group3RunnerUp, setGroup3RunnerUp] = useState("")
    const [group4Winner, setGroup4Winner] = useState("")
    const [group4RunnerUp, setGroup4RunnerUp] = useState("")

    const [searchTeam, setSearchTeam] = useState("")
    const [semiFinal, setSemiFinal] = useState([])
    const [finals, setFinals] = useState([])
    const [topScorer, setTopScorer] = useState("")
    const [topAssists, setTopAssists] = useState("")
    const [redCards, setRedCards] = useState(0)
    const [zerozero, setZerozero] = useState(0)
    const [totalGoals, setTotalGoals] = useState(100)
    const [doneBets, SetDoneBets] = useState([false, false, false, false, true, true, true, true, true, true, true, true])

    const gruopWinnersDisplay = [group1Winner, group2Winner, group3Winner, group4Winner]
    const gruopRunnerUpsDisplay = [group1RunnerUp, group2RunnerUp, group3RunnerUp, group4RunnerUp]
    const countBools = doneBets.filter(Boolean).length;
    const betCount = allBets.length;
    const info = sessionStorage.getItem("userInfo")
    const username = JSON.parse(info)

    function check1x2() {
        if (teamOneScore > teamTwoScore) {
            return (
                "1"
            )
        }
        if (teamOneScore < teamTwoScore) {
            return (
                "2"
            )
        }
        if (teamOneScore === teamTwoScore) {
            return (
                "x"
            )
        }

    }


    const [allDoneBets, setAllDoneBets] = useState([
        { game: "", winner: "", score: "" },
        { game: "", winner: "", score: "" },
        { game: "", winner: "", score: "" },
        { game: "", winner: "", score: "" },
        { gruopWinnerTeams: [] },
        { semiFinalTeams: [] },
        { finalTeams: [] },
        { topScorer: "" },
        { topAssist: "" },
        { totalGoals: "" },
        { zeroZero: "" },
        { redCards: "" }
    ])

    const displayBet = allBets && allBets[betIndex]
    const lastIndexBets = allBets && allBets.length - 1

    function sendInBet(category, game) {
        switch (category) {
            case "groupStage":
                allDoneBets[betIndex] = { game: game, winner: check1x2(), score: teamOneScore + "-" + teamTwoScore }
                setTeamOneScore(0)
                setTeamTwoScore(0)
                break;
            case "groupWinners":
                allDoneBets[betIndex] = { gruopWinnerTeams: [group1Winner, group1RunnerUp, group2Winner, group2RunnerUp, group3Winner, group3RunnerUp, group4Winner, group4RunnerUp] }

                break;
            case "semiFinals":
                allDoneBets[betIndex] = { semiFinalTeams: semiFinal }

                break;
            case "final":
                allDoneBets[betIndex] = { finalTeams: finals }

                break;
            case "topGoalScorer":
                allDoneBets[betIndex] = { topScorer: topScorer }

                break;
            case "topAssist":
                allDoneBets[betIndex] = { topAssist: topAssists }

                break;
            case "totalGoals":
                allDoneBets[betIndex] = { totalGoals: totalGoals }

                break;
            case "zeroZero":
                allDoneBets[betIndex] = { zeroZero: zerozero }

                break;
            case "redCards":
                allDoneBets[betIndex] = { redCards: redCards }

                break;
            default:
                break;
        }

        doneBets.splice(betIndex, 1, true)
        SetDoneBets(doneBets)
        let findEmptyBet = doneBets.indexOf(false)
        setBetIndex(findEmptyBet)
    }



    useEffect(() => {
        getBet()
        getAllTeams()
    }, [])

    function changeview(bet) {
        setOverView(!overView)
        if (overView) {
            setBetIndex(bet.id)
        }
    }



    async function getBet() {
        const response = await fetch('http://localhost:3333/getBetToCreate', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        data.sort(function (a, b) { return a.id - b.id });
        setAllBets(data)
    };

    async function getAllTeams() {
        const response = await fetch('http://localhost:3333/getAllTeams', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setAllTeams(data)
    };

    async function sendInDoneBet() {
        const doneBet = {
            username: username.username,
            allDoneBets
        }
        const response = await fetch('http://localhost:3333/sendInDoneBet', {
            method: 'POST',
            body: JSON.stringify(doneBet),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        if (data === true) {
            setSendInAndLogOut(true)
        }
    };

    function removeAndChange(category) {
        setRemoveCheck(false)
        switch (category) {
            case "groupStage":
                allDoneBets[betIndex] = { game: "", winner: "", score: "" }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                break;
            case "groupWinners":
                allDoneBets[betIndex] = { gruopWinnerTeams: [] }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setGroup1Winner("")
                setGroup1RunnerUp("")
                setGroup2Winner("")
                setGroup2RunnerUp("")
                setGroup3Winner("")
                setGroup3RunnerUp("")
                setGroup4Winner("")
                setGroup4RunnerUp("")
                break;
            case "semiFinals":
                allDoneBets[betIndex] = { semiFinalTeams: [] }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setSemiFinal([])
                break;
            case "final":
                allDoneBets[betIndex] = { finalTeams: [] }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setFinals([])
                break;
            case "topGoalScorer":
                allDoneBets[betIndex] = { topScorer: "" }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setTopScorer("")
                break;
            case "topAssist":
                allDoneBets[betIndex] = { topAssist: "" }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setTopAssists("")
                break;
            case "totalGoals":
                allDoneBets[betIndex] = { totalGoals: "" }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setTotalGoals(100)
                break;
            case "zeroZero":
                allDoneBets[betIndex] = { zeroZero: "" }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setZerozero(0)
                break;
            case "redCards":
                allDoneBets[betIndex] = { redCards: "" }
                doneBets.splice(betIndex, 1, false)
                SetDoneBets(doneBets)
                setRedCards(0)
                break;
            default:
                break;
        }
    }



    function setGroupPosition(position, team, group) {
        switch (group) {
            case "group1":
                position === 1 ? setGroup1Winner(team) : setGroup1RunnerUp(team)
                break;
            case "group2":
                position === 1 ? setGroup2Winner(team) : setGroup2RunnerUp(team)
                break;
            case "group3":
                position === 1 ? setGroup3Winner(team) : setGroup3RunnerUp(team)
                break;
            case "group4":
                position === 1 ? setGroup4Winner(team) : setGroup4RunnerUp(team)
                break;
            default:
                break;
        }
    }

    function getSamePositionData(gruop, position) {
        if (gruop === "group1") {
            if (position === 1) {
                return (group1RunnerUp)
            } else {
                return (group1Winner)
            }
        }
        if (gruop === "group2") {
            if (position === 1) {
                return (group2RunnerUp)
            } else {
                return (group2Winner)
            }
        }
        if (gruop === "group3") {
            if (position === 1) {
                return (group3RunnerUp)
            } else {
                return (group3Winner)
            }
        }
        if (gruop === "group4") {
            if (position === 1) {
                return (group4RunnerUp)
            } else {
                return (group4Winner)
            }
        }
    }

    async function addSemiFinalist(team) {
        setSemiFinal([...semiFinal, team.team])
        setSearchTeam("")
    }

    const removeSemiFinalist = value => {
        setSemiFinal(oldValues => {
            return oldValues.filter(fruit => fruit !== value)
        })
    }

    async function addfinalist(team) {
        setFinals([...finals, team.team])
        setSearchTeam("")
    }

    const removeFinalist = value => {
        setFinals(oldValues => {
            return oldValues.filter(fruit => fruit !== value)
        })
    }

    useEffect(() => {
        if (group1Winner !== "" && group1RunnerUp !== "" && group2Winner !== "" && group2RunnerUp !== "" && group3Winner !== "" && group3RunnerUp !== "" && group4Winner !== "" && group4RunnerUp !== "") {
            setSendBetBtn(true)
        } else {
            setSendBetBtn(false)
        }
    }, [betIndex, overView, group1Winner, group1RunnerUp, group2Winner, group2RunnerUp, group3Winner, group3RunnerUp, group4Winner, group4RunnerUp])

    useEffect(() => {
        if (countBools !== doneBets.length) {
            if (allBets.length > 0 && allBets[betIndex].category === "groupWinners") {
                setContentFull(true)
            } else {
                setContentFull(false)
            }
        }
    }, [betIndex])

    return (
        <Box>
            {countBools !== doneBets.length ?
                <article style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%", }}>
                    {!overView ? <img className={styles.overViewImg} src={overViewImg} onClick={() => changeview(showingPage)} alt="" /> : <img className={styles.overViewImg} src={closeView} alt="closeView" onClick={() => setOverView(false)} />}
                    {doneBets.map((betStatus) => (betStatus ? <h6 style={{ color: "green" }}><SportsSoccerIcon /></h6> : <h6 style={{ color: "gray" }}><SportsSoccerIcon /></h6>))}
                </article>

                :
                <article style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%", }}>
                    {!overView ? <img className={styles.overViewImg} src={overViewImg} onClick={() => changeview(showingPage)} alt="" /> : <img className={styles.overViewImg} src={closeView} alt="closeView" onClick={() => setOverView(false)} />}
                    {!removeCheck && countBools === betCount && <Button onClick={() => setSendInDoneBetModal(true)} variant="contained">SEND IN NOW ALL DONE</Button>}
                    {countBools === doneBets.length ? <h2>{doneBets.length}/{doneBets.length}</h2> : null}
                </article>
            }


            {allBets &&
                overView ?
                allBets.map((bet, i) => (
                    < Grid style={doneBets[i] ? { color: "green" } : null} onClick={() => changeview(bet)}>
                        <h3 className={styles.allBetOverView}>{bet.title}</h3>
                    </Grid>
                ))
                :
                <Grid>
                    {displayBet &&
                        <Grid>
                            <h3 className={styles.betTitle}>{displayBet.title}</h3>
                            {
                                displayBet.category === "groupStage" &&
                                <Grid>

                                    {!doneBets[betIndex] ?
                                        <article className={styles.score}><h2>{teamOneScore}</h2> - <h2>{teamTwoScore}</h2></article>
                                        :
                                        <article><h2 style={{ textAlign: "center", margin: "6vh" }}>{allDoneBets[betIndex].score}</h2></article>
                                    }
                                    {!doneBets[betIndex] && <section>

                                        <section className={styles.adding}>
                                            <article className={styles.plusAndMinus}>
                                                <Button color="info" variant="contained"><AddIcon onClick={() => setTeamOneScore(teamOneScore + 1)} /></Button>
                                                <Button color="warning" variant={teamOneScore <= 0 ? "disabled" : "contained"}> <RemoveIcon onClick={() => setTeamOneScore(teamOneScore - 1)} /></Button>
                                            </article>
                                            <p></p>
                                            <article className={styles.plusAndMinus}>
                                                <Button color="info" variant="contained"> <AddIcon onClick={() => setTeamTwoScore(teamTwoScore + 1)} /></Button>
                                                <Button color="warning" variant={teamTwoScore <= 0 ? "disabled" : "contained"}> <RemoveIcon onClick={() => setTeamTwoScore(teamTwoScore - 1)} /></Button>
                                            </article>
                                        </section>
                                    </section>}
                                    <section className={styles.doneBetBtn}>
                                        {
                                            !doneBets[betIndex] ? <Button onClick={() => sendInBet(displayBet.category, displayBet.title)} color="success" variant="contained" ><img src={gavel} /></Button>
                                                : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                        }
                                    </section>
                                </Grid>
                            }

                            {
                                displayBet.category === "groupWinners" &&
                                <Grid>
                                    {
                                        displayBet.groups.map((oneGroup, index) => (
                                            <Grid className={styles.groupWinners}>
                                                <h3 className={styles.groupWNum}>{oneGroup.title}</h3>

                                                <article className={doneBets[betIndex] ? styles.inputsGruprWinDone : styles.inputsGruprWin}>

                                                    {doneBets[betIndex] && <article className={styles.doneGropuWin}>
                                                        <h3>1a: {gruopWinnersDisplay[index]}</h3>
                                                        <h3>2a: {gruopRunnerUpsDisplay[index]}</h3>
                                                    </article>}

                                                    {!doneBets[betIndex] && <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Första plats</InputLabel>
                                                        {!doneBets[betIndex] && <Select>
                                                            {oneGroup.teams[0] !== getSamePositionData(oneGroup.identifier, 1) && <MenuItem onClick={() => setGroupPosition(1, oneGroup.teams[0], oneGroup.identifier)} value={oneGroup.teams[0]}>{oneGroup.teams[0]}</MenuItem>}
                                                            {oneGroup.teams[1] !== getSamePositionData(oneGroup.identifier, 1) && <MenuItem onClick={() => setGroupPosition(1, oneGroup.teams[1], oneGroup.identifier)} value={oneGroup.teams[1]}>{oneGroup.teams[1]}</MenuItem>}
                                                            {oneGroup.teams[2] !== getSamePositionData(oneGroup.identifier, 1) && <MenuItem onClick={() => setGroupPosition(1, oneGroup.teams[2], oneGroup.identifier)} value={oneGroup.teams[2]}>{oneGroup.teams[2]}</MenuItem>}
                                                            {oneGroup.teams[3] !== getSamePositionData(oneGroup.identifier, 1) && <MenuItem onClick={() => setGroupPosition(1, oneGroup.teams[3], oneGroup.identifier)} value={oneGroup.teams[3]}>{oneGroup.teams[3]}</MenuItem>}
                                                        </Select>}
                                                    </FormControl>}

                                                    {!doneBets[betIndex] && <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Andra plats</InputLabel>
                                                        {!doneBets[betIndex] && <Select>
                                                            {oneGroup.teams[0] !== getSamePositionData(oneGroup.identifier, 2) && <MenuItem onClick={() => setGroupPosition(2, oneGroup.teams[0], oneGroup.identifier)} value={oneGroup.teams[0]}>{oneGroup.teams[0]}</MenuItem>}
                                                            {oneGroup.teams[1] !== getSamePositionData(oneGroup.identifier, 2) && <MenuItem onClick={() => setGroupPosition(2, oneGroup.teams[1], oneGroup.identifier)} value={oneGroup.teams[1]}>{oneGroup.teams[1]}</MenuItem>}
                                                            {oneGroup.teams[2] !== getSamePositionData(oneGroup.identifier, 2) && <MenuItem onClick={() => setGroupPosition(2, oneGroup.teams[2], oneGroup.identifier)} value={oneGroup.teams[2]}>{oneGroup.teams[2]}</MenuItem>}
                                                            {oneGroup.teams[3] !== getSamePositionData(oneGroup.identifier, 2) && <MenuItem onClick={() => setGroupPosition(2, oneGroup.teams[3], oneGroup.identifier)} value={oneGroup.teams[3]}>{oneGroup.teams[3]}</MenuItem>}
                                                        </Select>}
                                                    </FormControl>}
                                                </article>
                                            </Grid>
                                        ))
                                    }
                                    <section style={{ display: "flex", justifyContent: "center", marginTop: "1vh" }}>
                                        {
                                            !doneBets[betIndex] ? <Button onClick={showSendBetBtn ? () => sendInBet(displayBet.category, displayBet.title) : () => null} color={showSendBetBtn ? "success" : "inherit"} variant="contained"><img src={gavel} /></Button>
                                                : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                        }
                                    </section>
                                </Grid>
                            }

                            {
                                displayBet.category === "semiFinals" &&


                                <Grid>
                                    <article className={!doneBets[betIndex] ? styles.pickedSemis : styles.donePickedSemis}>
                                        {semiFinal.length === 0 ? <article style={{ visibility: "hidden" }}>
                                            <h3>dddd</h3>
                                            <article className={styles.removePickedSemi}>
                                                {!doneBets[betIndex] && <ClearIcon />}
                                            </article>
                                        </article> :
                                            semiFinal.map((semi) => (
                                                <article>
                                                    <h3>{semi}</h3>
                                                    <article className={styles.removePickedSemi}>
                                                        {!doneBets[betIndex] && <ClearIcon onClick={() => removeSemiFinalist(semi)} />}
                                                    </article>
                                                </article>
                                            ))
                                        }
                                    </article>

                                    <article className={styles.semiSearch}>
                                        {!doneBets[betIndex] && <Grid>
                                            <TextField
                                                className={styles.semiInput}
                                                value={searchTeam}
                                                onChange={(e) => setSearchTeam(e.target.value)}
                                                id="standard-basic" label="Sök på land" variant="standard" />
                                            {/* input search som mapar ut alla ämnen som mathar */}
                                            <article className={styles.semiList}>
                                                {allTeams && allTeams.length > 1 &&
                                                    // eslint-disable-next-line
                                                    allTeams.filter((team) => {
                                                        if (team.team.toLowerCase().includes(searchTeam.toLowerCase())) {
                                                            return team
                                                        }
                                                    })
                                                        .map((team, id) => (
                                                            <p className={styles.semiListP}
                                                                style={semiFinal.find((teamName => teamName === team.team)) && { color: "red" }}
                                                                onClick={semiFinal.length === 4 ? () => null : semiFinal.find((teamName) => teamName === team.team) ? () => null : () => addSemiFinalist(team)} key={id}>{team.team}</p>
                                                        ))
                                                }
                                            </article>
                                        </Grid>}
                                    </article>

                                    <article className={styles.semiDoneBtn}>
                                        {
                                            !doneBets[betIndex] ? <Button onClick={semiFinal.length === 4 ? () => sendInBet(displayBet.category, displayBet.title) : () => null} variant="contained" color={semiFinal.length !== 4 ? "inherit" : "success"}><img src={gavel} /></Button>
                                                : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                        }
                                    </article>

                                </Grid>
                            }

                            {
                                displayBet.category === "redCards" &&
                                <Grid>
                                    <button style={redCards !== 0 ? null : { opacity: 0.2 }} onClick={redCards === 0 ? () => null : () => setRedCards(redCards - 1)}>Mindre</button>
                                    <h3>{redCards}</h3>
                                    <button onClick={() => setRedCards(redCards + 1)}>Mer</button>
                                    {
                                        !doneBets[betIndex] ? <Button onClick={() => sendInBet(displayBet.category, displayBet.title)} variant="contained">Stämpla</Button>
                                            : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                    }
                                </Grid>
                            }



                            {
                                displayBet.category === "final" &&
                                <Grid>
                                    <article className={!doneBets[betIndex] ? styles.pickedSemis : styles.donePickedSemis}>
                                        {finals.length === 0 ? <article style={{ visibility: "hidden" }}>
                                            <h3>dddd</h3>
                                            <article className={styles.removePickedSemi}>
                                                {!doneBets[betIndex] && <ClearIcon />}
                                            </article>
                                        </article> :
                                            finals.map((final) => (
                                                <article>
                                                    <h3>{final}</h3>
                                                    <article className={styles.removePickedSemi}>
                                                        {!doneBets[betIndex] && <ClearIcon onClick={() => removeFinalist(final)} />}
                                                    </article>
                                                </article>
                                            ))
                                        }
                                    </article>

                                    <article className={styles.semiSearch}>
                                        {!doneBets[betIndex] && <Grid>
                                            <TextField
                                                className={styles.semiInput}
                                                value={searchTeam}
                                                onChange={(e) => setSearchTeam(e.target.value)}
                                                id="standard-basic" label="Användarnamn" variant="standard" />
                                            {/* input search som mapar ut alla ämnen som mathar */}
                                            <article className={styles.semiList}>
                                                {allTeams && allTeams.length > 1 &&
                                                    // eslint-disable-next-line
                                                    allTeams.filter((team) => {
                                                        if (team.team.toLowerCase().includes(searchTeam.toLowerCase())) {
                                                            return team
                                                        }
                                                    })
                                                        .map((team, id) => (

                                                            <p className={styles.semiListP}
                                                                style={finals.find((teamName => teamName === team.team)) && { color: "red" }}

                                                                onClick={finals.length === 2 ? () => null : finals.find((teamName) => teamName === team.team) ? () => null : () => addfinalist(team)} key={id}>{team.team}</p>
                                                        ))
                                                }
                                            </article>
                                        </Grid>}
                                    </article>

                                    <article className={styles.semiDoneBtn}>
                                        {
                                            !doneBets[betIndex] ? <Button onClick={finals.length === 2 ? () => sendInBet(displayBet.category, displayBet.title) : () => null} variant="contained" color={finals.length !== 2 ? "inherit" : "success"}><img src={gavel} /></Button>
                                                : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                        }
                                    </article>
                                </Grid>
                            }


                            {
                                displayBet.category === "zeroZero" &&
                                <Grid>
                                    {!doneBets[betIndex] ?
                                        <Grid>
                                            <button style={zerozero !== 0 ? null : { opacity: 0.2 }} onClick={zerozero === 0 ? () => null : () => setZerozero(zerozero - 1)}>Mindre</button>
                                            <h3>{zerozero}</h3>
                                            <button onClick={() => setZerozero(zerozero + 1)}>Mer</button>
                                        </Grid>
                                        :
                                        <Typography>{allDoneBets[betIndex].zeroZero}</Typography>

                                    }
                                    {
                                        !doneBets[betIndex] ? <Button onClick={() => sendInBet(displayBet.category, displayBet.title)} variant="contained">Stämpla</Button>
                                            : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                    }
                                </Grid>
                            }

                            {
                                displayBet.category === "topGoalScorer" &&
                                <Grid>
                                    {
                                        !doneBets[betIndex] ? <TextField onChange={(e) => setTopScorer(e.target.value)} id="standard-basic" label="Spelar namn (ex. Morata)" variant="standard" />
                                            :
                                            <Typography>{allDoneBets[betIndex].topScorer}</Typography>
                                    }
                                    {
                                        !doneBets[betIndex] ? <Button onClick={() => sendInBet(displayBet.category, displayBet.title)} variant={topScorer.length > 1 ? "contained" : "disabled"}>Stämpla</Button>
                                            : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                    }
                                </Grid>
                            }
                            {
                                displayBet.category === "topAssist" &&
                                <Grid>
                                    {
                                        !doneBets[betIndex] ?
                                            <TextField onChange={(e) => setTopAssists(e.target.value)} id="standard-basic" label="Spelarnamn (ex. Foden)" variant="standard" />
                                            :
                                            <Typography>{allDoneBets[betIndex].topAssist}</Typography>

                                    }
                                    {
                                        !doneBets[betIndex] ? <Button onClick={() => sendInBet(displayBet.category, displayBet.title)} variant={topAssists.length > 1 ? "contained" : "disabled"}>Stämpla</Button>
                                            : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                    }
                                </Grid>
                            }


                            {
                                displayBet.category === "totalGoals" &&
                                <Grid>
                                    {!doneBets[betIndex] ?
                                        <Grid>
                                            <button style={totalGoals !== 0 ? null : { opacity: 0.2 }} onClick={totalGoals === 0 ? () => null : () => setTotalGoals(totalGoals - 1)}>Mindre</button>
                                            <h3>{totalGoals}</h3>
                                            <button onClick={() => setTotalGoals(totalGoals + 1)}>Mer</button>
                                        </Grid>
                                        :
                                        <h3>{allDoneBets[betIndex].totalGoals}</h3>
                                    }


                                    {
                                        !doneBets[betIndex] ? <Button onClick={() => sendInBet(displayBet.category, displayBet.title)} variant="contained">Stämpla</Button>
                                            : !removeCheck && <Button onClick={() => setRemoveCheck(true)} color="error" variant="contained">Ändra</Button>
                                    }
                                </Grid>
                            }

                            {removeCheck && <ChangeModal
                                removeAndChange={removeAndChange}
                                setRemoveCheck={setRemoveCheck}
                                displayBet={displayBet}
                            />}


                            {!removeCheck && <article className={contentFull ? styles.nextBtnsContainerFull : styles.nextBtnsContainer}>
                                <article className={styles.nextBtns}>
                                    <Button variant={betIndex !== 0 ? "contained" : "disabled"} onClick={betIndex !== 0 ? () => setBetIndex(betIndex - 1) : () => null}>Tillbaka</Button>
                                    <Button variant={lastIndexBets !== betIndex ? "contained" : "disabled"} onClick={() => setBetIndex(betIndex + 1)}>Nästa</Button>
                                </article>
                            </article>}

                        </Grid>
                    }
                </Grid >
            }
            {sendInDoneBetModal && <SendInBetModal
                sendInDoneBetModal={sendInDoneBetModal}
                setSendInDoneBetModal={setSendInDoneBetModal}
                sendInDoneBet={sendInDoneBet}
                sendInAndLogOut={sendInAndLogOut}
            />}

        </Box >
    );
}

export default CreateBet;



