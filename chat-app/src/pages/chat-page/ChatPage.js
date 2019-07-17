import React, { Component } from "react";

import UsersList from "./../../components/users-list/UsersList";
import Chat from "./../../components/chat/Chat";
import { Box } from "@material-ui/core";

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: null
    };

    this.currentUser =
      props.location &&
      props.location.state &&
      props.location.state.currentUser;
  }

  setRecipient = user => {
    this.setState({ recipient: user });
  };

  render() {
    return (
      <Box display="flex" width={"100vw"} height={"100wh"}>
        <Box
          display="flex"
          flexDirection="column"
          bgcolor="primary.main"
          color="primary.contrastText"
          px={2}
          width={"25%"}
          height={"100vh"}
        >
          <h3>Welcome {this.currentUser}!</h3>
          <p>Click a user below to start a chat with them</p>
          <UsersList
            currentUser={this.currentUser}
            userClicked={this.setRecipient}
          />
        </Box>
        <Box width={"75%"} height={"100vh"}>
          <Chat
            recipient={this.state.recipient}
            currentUser={this.currentUser}
          />
        </Box>
      </Box>
    );
  }
}

export default ChatPage;
