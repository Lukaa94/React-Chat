import React from "react";

class Input extends React.Component {
    constructor(){
      super()
      this.state = {
        text: ""
      }
    }
    
    handleChange = (e) => {
      this.setState({text: e.target.value});
    }
  
    handleSubmit = (e) => {
      const {text} = this.state
      const {sendMessage} = this.props
      e.preventDefault();
      sendMessage(text);
      this.setState({text: ""});
    }
  
    render() {
        const {text} = this.state
      return (
        <div className="Form-container">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              value={text}
              type="text"
              placeholder="Enter your message"
            />
            <button>Send</button>
          </form>
        </div>
      );
    }
  }
  
  export default Input;