import React, { useEffect, useState } from "react";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import "./Sidebar.css";
import {
  AddCircleOutlineTwoTone,
  Call,
  ExpandMore,
  Headset,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAltOutlined,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../../firebase/firebaseConfig";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName,
      });
    } else {
      alert("An error occured while creating your channel.");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>e-squadrons</h3>
        <ExpandMore />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Text channels</h4>
          </div>

          <AddCircleOutlineTwoTone
            className="sidebar__addChannel"
            onClick={handleAddChannel}
          />
        </div>

        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltOutlined className="sidebar__voiceIcon" />
        <div className="sidebar__voiceInfo">
          <h3>Voice connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user?.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user?.displayName}</h3>
          <p>#{user?.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
