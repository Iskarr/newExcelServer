import React, { useEffect, useState } from "react";
import { Typography, Paper, Avatar, Button, Input } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import styles from "../constants/styles";
import { Label } from "reactstrap";

const AddPage = (props) => {
  const [phones, setPhones] = useState([]);
  const [newPhoneName, setNewPhoneName] = useState();
  const [newNote, setNewNote] = useState("");
  const [newStatus, setNewStatus] = useState();
  const [newOS, setNewOS] = useState();
  //   const [size_inch, setSizeInch] = useState("");
  //   const [size_cm, setSizeCM] = useState("");
  //   const [editing, setEditing] = useState(false);
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

  function onCreate(newPhoneName, newStatus, newNote) {
    // e.preventDefault();

    firebase.db
      .collection("Phones")
      .add({
        phone: newPhoneName,
        status: newStatus,
        notes: newNote,
      })
      .then((ref) => {
        console.log("Added document with Id", ref.id);
        setNewPhoneName("");
        setNewStatus("");
        setNewNote("");
      });
  }

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
            <Typography>Edit Page</Typography>
            <form onSubmit={onCreate}>
              <Label>Server Name:</Label>
              <Input
                type="text"
                required
                value={newPhoneName}
                onChange={(e) => setNewPhoneName(e.currentTarget.value)}
              />
              <br />
              <Label>Server Status:</Label>
              <Input
                type="text"
                required
                value={newStatus}
                onChange={(e) => setNewStatus(e.currentTarget.value)}
              />
              <br />
              <Label>Server Note:</Label>
              <Input
                type="text"
                required
                value={newNote}
                onChange={(e) => setNewNote(e.currentTarget.value)}
              />
              <br />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => {
                  onCreate(newPhoneName, newStatus, newNote);
                }}
                style={{ margin: 10 }}
              >
                Submit New Entry
              </Button>
            </form>
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

export default withRouter(withStyles(styles)(AddPage));

// <label>Operating system:</label>
//             <input
//               type="text"
//               required
//               value={os}
//               onChange={(e) => setOS(e.currentTarget.value)}
//             />
//             <br />
//             <label>PPI:</label>
//             <input
//               type="number"
//               required
//               value={ppi}
//               onChange={(e) => setPPI(e.currentTarget.value)}
//             />
//             <br />
//             <label>Size CM:</label>
//             <input
//               type="number"
//               required
//               value={size_cm}
//               onChange={(e) => setSizeCM(e.currentTarget.value)}
//             />
//             <br />
//             <label>Size Inch:</label>
//             <input
//               type="number"
//               required
//               value={size_inch}
//               onChange={(e) => setSizeInch(e.currentTarget.value)}
//             />
//             <br />
