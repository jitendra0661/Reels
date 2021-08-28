import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { db, storage } from "./firebase";
import { Link, useHistory } from "react-router-dom";
import Error from "./Error";
import { Button, TextField, makeStyles, Grid, Paper } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Signup = (props) => {
  let value = useContext(AuthContext);
  let history = useHistory();

  const useStyles = makeStyles({
    centerDivs: {
      height: "100vh",
      width: "80vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
  });

  let classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (value.user !== null) {
      history.push("/");
    }
    setLoading(false);
  }, []);

  const submitHandler = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      setType("warning");
      setError("Please fill in all the fields !");
      setTimeout(() => {
        setError(null);
        setType(null);
      }, 5000);
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setType("warning");

      setError("Password must contain 8 characters!");
      setTimeout(() => {
        setError(null);
        setType(null);
      }, 5000);
      setLoading(false);
      return;
    }
    try {
      let userData = await value.signup(email, password);
      let uid = userData.user.uid;

      let profileImageUrl = null;

      if (file !== null) {
        let storageRef = await storage
          .ref(`/users/profileImage/${uid}`)
          .put(file);

        let url = await storageRef.ref.getDownloadURL();
        profileImageUrl = url;
        console.log(profileImageUrl);
      }

      // console.log(userData);
      console.log(profileImageUrl);
      await db.users.doc(uid).set({
        name,
        email,
        profileImageUrl,
        createdAt: db.timeStamp(),
        postIds: [],
      });
      history.push("/");
    } catch (err) {
      setType("error");
      setError(err);
      setTimeout(() => {
        setError(null);
        setType(null);
      }, 5000);
    }
    setEmail(null);
    setName(null);
    setFile(null);
    setPassword(null);
    setLoading(false);
  };

  return loading === true ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <div className="loader"></div>
    </div>
  ) : (
    <div>
      {error !== null && error.length > 0 ? (
        <Error type={type} message={error} />
      ) : null}
      <h2 style={{ textAlign: "center", marginTop: "20px", fontWeight: "5px" }}>
        <b>Welcome to Reels</b>
      </h2>
      <div className={classes.centerDivs}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <img
              src="./images/logo.jpg"
              style={{ width: "-webkit-fill-available" }}
            />
          </Grid>
          <Grid item sm={6} xs={12} style={{ width: "100%" }}>
            <div className={classes.form}>
              <TextField
                id="name-input"
                label="Name"
                display="block"
                type="text"
                required
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                id="email-input"
                display="block"
                label="Email"
                type="email"
                required
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password-input"
                display="block"
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.upload}
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setFile(e?.target?.files[0])}
                />
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => submitHandler()}
              >
                Sign up
              </Button>
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Signup;
