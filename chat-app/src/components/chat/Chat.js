import React, { Component } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import {
  sendMessage,
  subscribeToMessagesForUserAndRecipient,
  removeAllListeners
} from "./../../services/chat-sockets";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], messageToSend: "" };
  }

  componentWillReceiveProps(props) {
    removeAllListeners();
    this.setState({ messages: [], messageToSend: "" });

    subscribeToMessagesForUserAndRecipient(
      props.currentUser,
      props.recipient,
      data => {
        this.setState(prevState => {
          const newState = prevState;
          newState.messages.push(data);

          return newState;
        });
      }
    );
  }

  sendMessage = () => {
    if (this.state.messageToSend) {
      const message = {
        message: this.state.messageToSend,
        from: this.props.currentUser,
        to: this.props.recipient
      };
      sendMessage(message);
      this.setState(prevState => {
        const newState = prevState;
        newState.messages.push(message);
        newState.messageToSend = "";
        return newState;
      });
    }
  };

  setMessageToSend = $event => {
    this.setState({
      messageToSend: $event.target.value
    });
  };

  componentWillUnmount() {
    removeAllListeners();
  }

  renderMessages() {
    return this.state.messages.map((data, i) => {
      return (
        <div key={i}>
          <b>{data.from}: </b>
          {data.message}
        </div>
      );
    });
  }

  render() {
    if (this.props.recipient) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          bgcolor="lightgray"
          color="text.primary"
          px={2}
          height={1}
        >
          <h3>Your chat with {this.props.recipient}</h3>
          <Box
            display="flex"
            flexDirection="column"
            bgcolor="white"
            px={2}
            height={1}
          >
            <Box component="div" overflow="scroll" maxHeight={"50%"}>
              {this.renderMessages()}
            </Box>
            <TextField
              id="outlined-multiline-static"
              label="Type here"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
              value={this.state.messageToSend}
              onChange={this.setMessageToSend}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.sendMessage}
            >
              Send
              <SendIcon />
            </Button>
          </Box>
        </Box>
      );
    }
    return null;
  }
}

export default Chat;
