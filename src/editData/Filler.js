import React, { useEffect, useState } from "react";
import { Typography, Paper, Avatar, Button, Input } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import styles from "../constants/styles";
import { Label } from "reactstrap";

const Filler = (props) => {
  const [phones, setPhones] = useState([]);
  //const [newPhoneName, setNewPhoneName] = useState();
  //const [newNote, setNewNote] = useState("");
  //const [newStatus, setNewStatus] = useState();
  const { classes } = props;

  useEffect(() => {
    if (!firebase.getCurrentUsername()) {
      // not logged in
      alert("Please login first");
      props.history.replace("/login");
    }

    const fetchData = async () => {
      const db = firebase.db;
      const data = await db.collection("Phones").get();
      setPhones(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();

    //firebase.getCurrentUserQuote().then(setQuote);
  }, [props.history]);

  return (
    <div>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VerifiedUserOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hello {firebase.getCurrentUsername()}
          </Typography>
          <>
            <Typography>Add a Server</Typography>
            <div>This is the body container</div>
          </>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              props.history.push("/editpage");
            }}
            className={classes.submit}
          >
            Back
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              props.history.push("/");
            }}
            className={classes.submit}
          >
            Home
          </Button>
        </Paper>
      </main>
    </div>
  );
};

export default withRouter(withStyles(styles)(Filler));
