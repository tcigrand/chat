## To run the application

1. Open a terminal/command prompt window
2. Run `npm run install-deps`
3. Run `npm run start:ui`
4. Open another terminal/command prompt window
5. Run `npm run start:server`

Right now, in order for both people in the chat to see the messages, they both have to have the chat open with the corresponding recipient. So, if you "Login" with a user named Bob in one window and a user named "Linda" in another window, make sure that Bob clicks Linda's name in the list of users and Linda click's Bob's name in the list of users. You can then send chats between the two users.

## Folder structure

There is a React app under `chat-app` and a simple Node server under `server`. The scripts listed below work under the same folder that this Readme is located.

## Available Scripts

### `npm run install-deps`

Installs dependencies for both the React app and the Node server.

### `npm test`

Runs the tests for the React app, there aren't currently tests for the server

### `npm run start:ui`

Starts the development server for the React app

### `npm run start:server`

Starts the Node server

## Approach

### UI

I decided to use React to build out the UI. I've been mainly developing Angular for the last few years, so it took me awhile to get reacquainted with React. Working on this ended up being a good refresher!

#### UI Library

In order to make this look a little better, I decided to use [Material UI](https://material-ui.com/). This really helped with styling the buttons, inputs, etc. I was also surprised to find the Box component, which ended up being helpful for laying things out.

#### Testing

In the React app, I've tested that all components at least render correctly. I've written some more thorough tests for the [Chat component](https://github.com/tcigrand/chat/blob/master/chat-app/src/components/chat/Chat.test.js)

#### Things I would like to change about the UI/FE

I would like to make it so a user properly receives a chat without having to have the corresponding chat window open. Currently, the FE is receiving every chat between every user, regardless of who is currently logged in. Obviously, this is not ideal and I have some thoughts about how I would go about fixing that. I briefly describe the approach in the Server section below.

I would also like to clean up the Chat component a bit. I think I could split the component up into two separate components, one that displays messages and one that sends messages.

### Server

The server is very simple, I considered using Firebase, but thought creating a small Node server using Socket.IO would be simple and would work well with the given problem.

The main thing I would like to do differently with the server is to use Socket.IO's [Rooms and Namespaces](https://socket.io/docs/rooms-and-namespaces/). The main goal of this would be to fix the problems I described above about sending all messages to each instance to the FE.

The other thing I'd like to do is store the chats between users. I considered fixing this by just storing them in an object on the server, similarly to how I'm storing Users. If I was to spend more time on this, that would be the next thing I worked on.


