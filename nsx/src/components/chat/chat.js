import React from 'react'
import './chat.scss'

import SendMessage from '../../send-message/send-message';



class Chat extends React.Component {
   constructor() {
       super()
       this.state = {
           receiveMessages: []
       }
   }

   onCallBack = msg => {
       let items = this.state.receiveMessages
        items.push(msg)
        this.setState({
            receiveMessages: items
        })
        console.log(this.state.receiveMessages)
    }
   

    render() {
        return (
            <React.Fragment>
                <div className="Chat">
                    <div className="Chat-Container">
                    <div className="chat-box">
                        <div className="receive-messages" >
                        <textarea value={this.state.receiveMessages}></textarea>
                        </div>
                       
                        {
                            <SendMessage callback={this.onCallBack}></SendMessage>
                        }
                    </div>
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}

export default Chat