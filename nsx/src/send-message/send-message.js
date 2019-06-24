import React from 'react'
import socketIOclient from 'socket.io-client'

const socket = socketIOclient('http://40c4330c.ngrok.io/')

class SendMessage extends React.Component {
    constructor(props) {
        super (props)
        this.state ={
            socketServer: '192.168.1.152:5000',
            receiveMessages: '',
            buttonTilte: 'Join',
            userName: 'vinh'
        }
        
}

componentDidMount () {
    
    this.onReceived()
    this.onJoined()
    this.onLeave()
    this.onTypingFromMember()
  }
  
  onTypingFromMember() {
      socket.on('member_typing', (user) => {
        if(user.userName != this.state.userName) {
        this.setMessage(`${user.userName} typing...`)
        }
      })
    }
  
    onReceived() {
      socket.on('receive-message', (value) => {
        this.props.callback(value.message)  
        this.setMessage(`${value.userName}: ${value.message}`)
       
      })
      
    }
  
    
  
    onJoined() {
      socket.on('joined', (user) => {
        console.log(user)
        
        this.setMessage(`User ${user.userName} joined`)
      })
    }
  
    onLeave() {
      socket.on('leaved', (user) => {
       
        console.log(user)
        this.setMessage(`User ${user.userName} leaved`)
      })
    }
  
    setMessage(message) {
      let messages = this.state.receiveMessages
      messages = message + '\n' + messages
      this.setState({
        receiveMessages: messages
      })
    }
  
      onKeyPress = event => {
        if (event.key === 'Enter') {
          console.log(event.target.value)
          socket.emit('send-message', {
            userName: this.state.userName,
            message: event.target.value
          })
         
        }
        
      }
  
      onClick = event => {
        console.log(event)
        let title = 'Join'
        if(this.state.buttonTilte === 'Join')  {
          title = 'Leave'
          this.join()
        } else {
          this.leave()
        }
        this.setState({
          buttonTilte: title
        })
      }
      
      join () {
        socket.emit('join', {
          userName: this.state.userName
        })
      }
  
      leave() {
        socket.emit('leave', {
        userName: this.state.userName
        })
      }
    
      onChange = event => {
        socket.emit('typing', {
          userName: this.state.userName
        })
      }
render () {
    return (
        <React.Fragment>
        <div className="send-message">
                        
            <input onKeyPress={this.onKeyPress}></input>
            <button onClick={e => this.onClick(e)}>{this.state.buttonTilte}</button>
        
        </div>
    </React.Fragment>
    )
} 
}
export default SendMessage