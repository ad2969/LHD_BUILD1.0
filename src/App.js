import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './styles/App.css';
import { randomName, randomColor } from "./functions/demo";
import Chat from './components/Chat';
import Map from './components/Map';

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
    members: []
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("448LX1LCXbsGUhUI", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    
    const room = this.drone.subscribe("observable-room");
    // console.log(room);

    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
      console.log(member);
      console.log("hi");
      console.log(this.state.members)

    });


    // room.on('members', function(members) {
    //   // List of members as an array
    //   console.log(members);
    // });

    // const room2 = this.drone.subscribe("observable-room");
    room.on('members', (members) => {
      // List of members as an array
      console.log(members);
      console.log("hi2");
      // var membersList = [...this.state.members].push(mem)
      this.setState({ members });
    });

    
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/"
                 render = {() =>
                  <Map messages  = { this.state.messages }
                        member    = { this.state.member } />
                 }
          >
          </Route>
          <Route exact path="/chat"
            render={() =>
              <Chat messages={this.state.messages}
                member={this.state.member}
                onSendMessage={this.onSendMessage} />
            }
          >
          </Route>
        </Switch>
      </Router>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default App;
