import React, { useRef, useState, useContext } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserContext } from '../providers/UserProvider';
import { Context } from '../providers/PaperProvider';
import Grid from "@material-ui/core/Grid";

const auth = firebase.auth();
const firestore = firebase.firestore();

const styles = (theme) =>
  createStyles({

  });
//main controller of the message board
function MessagingFunction() {
  return (
    <div className="App">
      <header>
        <h1>Dicussion Board</h1>
      </header>
      <ChatRoom />
    </div>
  );
}

//main method of the message board and it sends the call to the database
function ChatRoom(props) {
  const user = React.useContext(UserContext);
  const paper = useContext(Context);
  // console.log(paper);
  const { classes } = props;
  const dummy = useRef();
  const messagesRef = firestore.collection("messages" + paper);
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const firstName = user.firstName;

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;
    //const { uid } = user.uid;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      firstName,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}

          placeholder="Ask a question"
        />

        <button type="submit" disabled={!formValue}>
          {/* <span role="img" aria-label="bird"> 🕊️ </span>{" "} */}
          <p>Submit</p>
        </button>
      </form>
    </>
  );
}

//Displayes the individual messages and submits new messages. 
function ChatMessage(props) {
  const { text, uid, firstName } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>

        {/* <p>{firstName}</p> */}
        {/* <p>{messageClass}</p> */}

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
          <p>{text}</p>
          <IconButton
            color="inherit"
          >
            <Avatar
              src="/static/images/avatar/1.jpg"
              alt={firstName}
            />
          </IconButton>
        </Grid>
      </div>
    </>
  );
}

export default MessagingFunction;