import { Grid, Button, CircularProgress } from "@mui/material";
import styles from "./ChangeModal.module.css"
import { useNavigate } from "react-router-dom";

function SendInBetModal(props) {

    const navigate = useNavigate()

    if (props.sendInAndLogOut) {
        setTimeout(function () {
            logout()
        }, 5000);
    }

    function logout() {
        navigate("/")
    }
    return (
        <Grid className={styles.modalContainer}>
            {!props.sendInAndLogOut ?
                <article>
                    <h1 className={styles.text}>Är du säker på att du vill skicka in dett bet?</h1>
                    <article>
                        <Button onClick={() => props.sendInDoneBet()} color="success" variant="contained" size="small">Ja</Button>
                        <Button onClick={() => props.setSendInDoneBetModal(false)} color="error" size="small" variant="contained" >Ångra</Button>
                    </article>
                </article>
                :
                <article>
                    <h1 className={styles.text}>Du loggas nu ut</h1>
                    <h3>Logga in igen & lycka till!</h3>
                    <CircularProgress />
                </article>
            }
        </Grid>
    );
}

export default SendInBetModal;