import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  GifTwoTone,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase/firebaseConfig";
import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import "./Chat.css";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        <FlipMove>
          {messages.map((message) => (
            <Message
              key={message?.id}
              timestamp={message?.timestamp}
              message={message?.message}
              user={message?.user}
            />
          ))}
        </FlipMove>
      </div>

      <div className="chat__input">
        <AddCircle />
        <form action="#">
          <input
            value={input}
            disabled={!channelId}
            placeholder={channelId && `Message ${channelName}`}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={!channelId}
            type="submit"
            className="chat__inputButton"
            onClick={sendMessage}
          >
            Send
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard />
          <GifTwoTone />
          <EmojiEmotions />
        </div>
      </div>
    </div>
  );
}

export default Chat;
