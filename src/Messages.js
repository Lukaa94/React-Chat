import React from "react";

class Messages extends React.Component {
  renderMessage(message, index) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageId = member.id === currentMember.id;
    const chooseUser = messageId ?
      "Messages currentMember" : "Messages";
        return (
          <li key={index} className={chooseUser}>
            
            <div className="Message-container">
              <div className="emoji">
                {member.clientData.emoji}
              </div>
              <div className="username">
                {member.clientData.username}
              </div>
            </div>
            <div className="text">{text}</div>
          </li>
        );
      }
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map((item, index) => this.renderMessage(item, index))}
      </ul>
    );
  }
}

export default Messages;