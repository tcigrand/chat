import React from "react";
import { shallow } from "enzyme";
import Chat from "./Chat";

import * as socketCalls from "./../../services/chat-sockets";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Chat recipient="Bob" currentUser="Linda" />);
});

describe("Chat", () => {
  it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders welcome message", () => {
    const yourChat = <h3>Your chat with Bob</h3>;
    expect(wrapper.contains(yourChat)).toEqual(true);
  });

  it("sends message with correct format", () => {
    wrapper.instance().setState({ messageToSend: "Hi" });
    const sendMessageSpy = spyOn(socketCalls, "sendMessage");
    wrapper.instance().sendMessage();
    expect(sendMessageSpy).toHaveBeenCalledWith({
      from: "Linda",
      message: "Hi",
      to: "Bob"
    });
    expect(wrapper.instance().state.messageToSend).toBe("");
  });

  it("subscribes to messages for current user + recipient", () => {
    const subscribeToMessagesForUserAndRecipientSpy = spyOn(
      socketCalls,
      "subscribeToMessagesForUserAndRecipient"
    );
    const removeAllListenersSpy = spyOn(socketCalls, "removeAllListeners");
    wrapper.setProps({ recipient: "Tim", currentUser: "Tim2" });
    expect(removeAllListenersSpy).toHaveBeenCalled();
    expect(subscribeToMessagesForUserAndRecipientSpy).toHaveBeenCalledWith(
      "Tim2",
      "Tim",
      expect.any(Function)
    );
  });

  it("changing props resets state", () => {
    wrapper
      .instance()
      .setState({ messageToSend: "Hi Again", messages: ["test"] });
    expect(wrapper.instance().state).toEqual({
      messageToSend: "Hi Again",
      messages: ["test"]
    });
    wrapper.setProps({ recipient: "Tim", currentUser: "Tim2" });
    expect(wrapper.instance().state).toEqual({
      messageToSend: "",
      messages: []
    });
  });

  it("renders messages correctly", () => {
    wrapper.instance().setState({ messageToSend: "Hi" });
    wrapper.instance().sendMessage();

    const chat = (
      <div>
        <b>Linda: </b>
        Hi
      </div>
    );
    expect(wrapper.contains(chat)).toEqual(true);
  });
});
