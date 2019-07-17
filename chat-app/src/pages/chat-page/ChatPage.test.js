import React from "react";
import ReactDOM from "react-dom";
import ChatPage from "./ChatPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChatPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
