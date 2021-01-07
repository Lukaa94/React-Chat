import React from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";


function randomName() {
  const name = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const randomName = name[Math.floor(Math.random() * name.length)];
  return randomName;
}

function randomEmoji() {
  const possibleEmojis = [
    '🐀','🐁','🐭','🐹','🐂','🐃','🐄','🐮','🐅','🐆','🐯','🐇','🐐','🐑','🐏','🐴',
    '🐎','🐱','🐈','🐰','🐓','🐔','🐤','🐣','🐥','🐦','🐧','🐘','🐩','🐕','🐷','🐖',
    '🐗','🐫','🐪','🐶','🐺','🐻','🐨','🐼','🐵','🙈','🙉','🙊','🐒','🐉','🐲','🐊',
    '🐍','🐢','🐸','🐋','🐳','🐬','🐙','🐟','🐠','🐡','🐚','🐌','🐛','🐜','🐝','🐞',
  ];
  const randomEmoji = Math.floor(Math.random() * possibleEmojis.length);
  return possibleEmojis[randomEmoji];
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: randomName(),
        emoji: randomEmoji()
      }
    }
    
    this.drone = new window.Scaledrone("HGz2khhQU9wGmj5Y", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages:messages});
    });

  }

handleMessage = (message) => {
  this.drone.publish({
    room: "observable-room",
    message
  });
}
  
render(){
  const {messages, member} = this.state
  return(
    
    <div className="App">
      <div className="App-header">
        <h1>Chat App</h1>
      </div>
      <Messages
        messages={messages}
        currentMember={member}
      />
      <Input
        sendMessage={this.handleMessage}
      />
      
    </div>
  )
 }
}

export default App;
