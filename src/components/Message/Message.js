import { Avatar } from "@material-ui/core";
import React from "react";
import { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ timestamp, user, message }, ref) => {
  return (
    <div ref={ref} className="message">
      <Avatar src={user?.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
});

export default Message;
