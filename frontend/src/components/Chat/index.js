import React, { Component } from "react";
import Server from "../../webConfig";
import io from "socket.io-client";
import axios from "axios";
import InfoBar from "../InfoBar";
import Input from "../Input";
import Messages from "../Messages";
import "./Chat.css";

let socket;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    const searchString = this.props.location.search;
    const searchStringArray = searchString.split("=");
    let room;
    if (searchStringArray.length > 0) {
      room = searchStringArray[1];
      console.log("ROOM: ", room);
    } else {
      room = "";
      console.log("INVALID ROOM!!");
    }
    this.state = {
      room,
      from: "",
      fromName: "",
      fromType: "",
      to: "",
      toName: "",
      message: "",
      messages: [],
    };
  }

  appendMessage(message) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          _id: String(Math.floor(Math.random() * 100000) + 1),
          message: message.text,
          isSentByCurrentUser:
            String(message.loggedInUser_id) == String(this.state.from),
        },
      ],
    });
    console.log(this.state.messages);
  }

  async componentDidMount() {
    const chatData = await axios.get(
      Server + "/chat/people?room=" + this.state.room,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    const messageResponse = await axios.get(
      Server +
        "/chat/getMessages?case_id=" +
        this.state.room +
        "&type=" +
        chatData.data.type,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    this.setState({
      from: chatData.data.from,
      to: chatData.data.to,
      fromName: chatData.data.fromName,
      toName: chatData.data.toName,
      fromType: chatData.data.fromType,
      type: chatData.data.type,
      messages: messageResponse.data.messages,
    });
    socket = io(Server, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.emit("join", { room: this.state.room, message: "Message" });
    socket.on("sendMessage", (message) => this.appendMessage(message));
  }

  async componentWillUnmount() {
    socket.emit("disconnect");
    socket.off();
  }

  onChangeMessage = (onChangeMessageEvent) => {
    console.log(onChangeMessageEvent);
    this.setState({
      message: onChangeMessageEvent.target.value,
    });
  };

  sendMessage = async (event) => {
    event.preventDefault();
    if (this.state.message) {
      socket.emit(
        "sendMessage",
        {
          room: this.state.room,
          message: this.state.message,
          loggedInUser_id: this.state.from,
        },
        () => this.setState({ message: "" })
      );
      await axios.post(
        Server + "/chat/sendMessage",
        {
          case_id: this.state.room,
          message: this.state.message,
          type: this.state.type,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    }
  };

  // onKeyPress = (onKeyPressEvent) => {
  //   onKeyPressEvent.key === "Enter" ? this.sendMessage() : null;
  // };

  render() {
    let messagesComponent = null;
    console.log(this.state.messages);
    console.log(this.state.messages && this.state.messages.length != 0);
    if (this.state.messages && this.state.messages.length != 0) {
      messagesComponent = (
        <Messages
          messages={this.state.messages}
          fromName={this.state.fromName}
          toName={this.state.toName}
        />
      );
    }
    return (
      <div className="outerContainer">
        <div className="innerContainer">
          <InfoBar room={this.state.toName} />
          {messagesComponent}

          <Input
            message={this.state.message}
            setMessage={this.onChangeMessage}
            sendMessage={this.sendMessage}
          />

          {/* <input
            value={this.state.message}
            onChange={this.onChangeMessage}
            onKeyPress={(event) =>
              event.key === "Enter" ? this.sendMessage(event) : null
            }
          /> */}
        </div>
      </div>
    );
  }
}
