import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

import { listUsers } from "../../services/chat-sockets";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.userClicked = props.userClicked;

    this.state = {
      users: []
    };

    listUsers(users => {
      this.setState({ users });
    });
  }

  showUsers = () => {
    let elements = [];

    this.state.users.forEach(user => {
      if (user !== this.props.currentUser) {
        elements.push(
          <ListItem key={user} onClick={this.userClicked.bind(null, user)}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user} />
          </ListItem>
        );
      }
    });

    return elements;
  };

  render() {
    return <List>{this.showUsers()}</List>;
  }
}

export default UsersList;
