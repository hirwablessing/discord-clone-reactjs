import { EditLocationRounded, HelpRounded, Notifications, PeopleAltRounded, SearchRounded, SendRounded } from "@material-ui/icons";
import React from "react";
import "./ChatHeader.css"

function ChatHeader({channelName}) {
  return (
    <div className="chatheader">
      <div className="chatheader__left">
        <h3>
          <span className="chatheader__hash">#</span>{channelName}
        </h3>
      </div>

      <div className="chatheader__right">
          <Notifications/>
          <EditLocationRounded/>
          <PeopleAltRounded/>

          <div className="chatheader__search">
              <input placeholder="search"/>
              <SearchRounded/>
          </div>

          <SendRounded/>
          <HelpRounded/>
      </div>
    </div>
  );
}

export default ChatHeader;
