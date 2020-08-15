import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  Input,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Radio,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import styles from "../constants/styles";
import { Table, Form } from "reactstrap";

const AddPage = (props) => {
  const [phones, setPhones] = useState([]);
  const [newPhoneName, setNewPhoneName] = useState();
  const [newNote, setNewNote] = useState("");
  const [newStatus, setNewStatus] = useState();

  const [editing, setEditing] = useState(false);
  const [ifEditing, setIfEditing] = useState(false);
  const [inEditMode, setInEditMode] = useState(false);
  const { classes } = props;

  useEffect(() => {
    if (!firebase.getCurrentUsername()) {
      // not logged in
      alert("Please login first");
      props.history.replace("/login");
    } else {
      const fetchData = async () => {
        const db = firebase.db;
        const data = await db.collection("Phones").get();
        setPhones(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      fetchData();
    }

    //firebase.getCurrentUserQuote().then(setQuote);
  }, [props.history]);

  const OnDelete = (id) => {
    firebase.db.collection("Phones").doc(id).delete();
  };

  const OnUpdateName = (id) => {
    firebase.db
      .collection("Phones")
      .doc(id)
      .update({
        phone: newPhoneName,
      })
      .then(() => {
        console.log(`phone_Name: ${newPhoneName}`);
      });
  };

  const onSaveNote = (id) => {
    firebase.db
      .collection("Phones")
      .doc(id)
      .update({ notes: newNote })
      .then(() => {
        console.log(`The new notes says: ${newNote}`);
      });
  };

  function editingMode() {
    if (!editing) {
      setEditing(true);
      setIfEditing(true);
      setInEditMode(true);
    } else {
      setInEditMode(false);
      setEditing(false);
      setIfEditing(false);
    }
  }

  function onUpdateRadio(id, newStatus) {
    firebase.db
      .collection("Phones")
      .doc(id)
      .update({
        status: newStatus,
      })
      .then(() => {
        console.log(`The new status of ${id} is now ${newStatus}`);
      });
  }

  function checkStatus(status) {
    if (status === "updated") {
      return "green";
    } else if (status === "inactive") {
      return "gray";
    } else if (status === "needs update") {
      return "#FC6A03";
    }
  }

  async function logout() {
    await firebase.logout();
    props.history.push("/");
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
          <Button onClick={editingMode} variant="contained" color="secondary">
            {ifEditing ? "View Mode" : "Edit Mode"}
          </Button>
          <>
            {editing ? (
              <div>
                <>
                  <Table borderless>
                    <thead>
                      <tr>
                        <th>Server Name</th>
                        <th>Server Status</th>
                        <th>Server Notes</th>
                      </tr>
                    </thead>
                    {phones.map((phone) => {
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>
                                <Form
                                  id={phone.id}
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    OnUpdateName(phone.id);
                                  }}
                                >
                                  <Input
                                    type="text"
                                    name="phoneNameField"
                                    form={phone.id}
                                    autoComplete="off"
                                    defaultValue={phone.phone}
                                    onChange={(e) => {
                                      setNewPhoneName(e.target.value);
                                    }}
                                  />
                                </Form>
                              </td>
                              <td>
                                <Form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    onUpdateRadio(phone.id, newStatus);
                                  }}
                                >
                                  <FormControl
                                    component="fieldset"
                                    style={{ margin: "6px" }}
                                  >
                                    <RadioGroup
                                      defaultValue={phone.status}
                                      aria-label="status"
                                      name="customized-radios"
                                      onChange={(e) => {
                                        setNewStatus(e.target.value);
                                      }}
                                    >
                                      <FormControlLabel
                                        value="updated"
                                        control={
                                          <Radio status={phone.status} />
                                        }
                                        label="Updated"
                                      />
                                      <FormControlLabel
                                        value="needs update"
                                        control={
                                          <Radio status={phone.status} />
                                        }
                                        label="needs update"
                                      />
                                      <FormControlLabel
                                        value="inactive"
                                        control={
                                          <Radio status={phone.status} />
                                        }
                                        label="Inactive"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                  <Button
                                    color="secondary"
                                    type="submit"
                                    onChange={() => {
                                      OnUpdateName(phone.id, newStatus);
                                    }}
                                  >
                                    Save
                                  </Button>
                                </Form>
                              </td>
                              <td>
                                <Form
                                  id={phone.id}
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    onSaveNote(phone.id);
                                  }}
                                >
                                  <TextField
                                    type="textarea"
                                    variant="outlined"
                                    multiline
                                    form={phone.id}
                                    defaultValue={phone.notes}
                                    onChange={(e) => {
                                      setNewNote(e.target.value);
                                    }}
                                    style={{ margin: "6px" }}
                                  />
                                  <Button
                                    type="submit"
                                    onChange={() => {
                                      OnUpdateName(phone.id);
                                    }}
                                  >
                                    Save
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                      OnDelete(phone.id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </Form>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </Table>
                </>
              </div>
            ) : (
              <Table bordered>
                <thead>
                  <tr>
                    <th>Server Name</th>
                    <th>Server Status</th>
                    <th>Server Notes</th>
                  </tr>
                </thead>
                {phones.map((phone) => (
                  <tbody>
                    <tr key={phone.phone_id}>
                      <td style={{ paddingRight: "30px" }}>{phone.phone}</td>
                      <td
                        style={{
                          paddingRight: "30px",
                          backgroundColor: checkStatus(phone.status),
                        }}
                      >
                        {phone.status}
                      </td>
                      <td style={{ paddingLeft: "10px" }}>{phone.notes}</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            )}
          </>

          {inEditMode ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                window.location.reload(true);
              }}
              className={classes.submit}
            >
              Save Changes
            </Button>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              props.history.replace("/addpage");
            }}
            className={classes.submit}
          >
            Add Page
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={logout}
            className={classes.submit}
          >
            Logout
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              props.history.push("/dashboard");
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
