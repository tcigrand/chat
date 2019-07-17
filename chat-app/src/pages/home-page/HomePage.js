import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Box, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { userLogin } from "./../../services/chat-sockets";

const styles = {
  submitButton: {
    marginLeft: 8
  }
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  setName = $event => {
    this.setState({
      name: $event.target.value
    });
  };

  submit = () => {
    userLogin(this.state.name);
  };

  render() {
    return (
      <div className={this.props.classes.home}>
        <header>Hello!</header>
        <Box display="flex" alignItems="flex-end" margin="normal">
          <TextField
            id="standard-name"
            label="Enter your name"
            value={this.state.name}
            onChange={this.setName}
          />
          <Button
            component={Link}
            to={{
              pathname: "/chat",
              state: {
                currentUser: this.state.name
              }
            }}
            className={this.props.classes.submitButton}
            variant="contained"
            color="primary"
            onClick={this.submit}
            ml={1}
          >
            Submit
          </Button>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
