import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import ChatPage from "./pages/chat-page/ChatPage";
import "./App.css";

class App extends Component {
  render() {
    document.body.style.overflow = "hidden";

    return (
      <div className="App">
        <BrowserRouter class="App">
          <Route path="/" exact component={HomePage} />
          <Route path="/chat" component={ChatPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
