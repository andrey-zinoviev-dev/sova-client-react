import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook} from '@fortawesome/free-regular-svg-icons'
import { apiSendMessage } from "../api";
import './Chat.css';

export default function Chat({ students, courseAuthor, user, messages, socket, moduleID, token }) {
  const [chosenStudent, setChosenStudent] = React.useState({});
  const [filteredMessages, setFilteredMessages] = React.useState([]);

  //refs
  const messagesBottomRef = React.useRef();
  const inputRef = React.useRef();

  let lastMessage = {};

  function filterMessages(student = user) {
    if(user.admin) {
      const messagesFiltered = messages.filter((message) => {
        return message.user._id === user._id && message.to === student._id || message.user._id === student._id && message.to === user._id;
      });
      // console.log(messagesFiltered);
      // setLastMessage(messagesFiltered.pop());
      return messagesFiltered;
      // return setFilteredMessages(messagesFiltered);
    } else {
      const messagesFiltered = messages.filter((message) => {
        return message.user._id === user._id && message.to === student._id || message.user._id === student._id && message.to === user._id;
      });
      return messagesFiltered;
    }
   
    
    // console.log('yes');
    
  }

  function showConversation(student) {
    setChosenStudent(student);
  }

  function showLastConversationMessage(student) {
    lastMessage = filterMessages(student).pop();
    // console.log(lastMessage);
    if(lastMessage) {
      return lastMessage.text;
    }
    // return lastMessage.text;
  }

  function sendMessage(student) {
    const messageData = { text: inputRef.current.value, moduleID: moduleID, user: user._id, to: student._id };
    
    apiSendMessage(token, messageData)
    .then((data) => {
      if(data) {
        setFilteredMessages((prevValue) => {
          return [...prevValue, data];
        });
        socket.current.emit('message', data);
        inputRef.current.value = "";
      }
    });

  }

  React.useEffect(() => {
    if(user._id && !user.admin && courseAuthor._id) {
      const result = messages.filter((message) => {
        return message.user._id === user._id && message.to === courseAuthor._id || message.user._id === courseAuthor._id && message.to === user._id;
      });

      setFilteredMessages(result);
    }
    else if(user._id && user.admin) {

      if(chosenStudent._id) {
        const result = messages.filter((message) => {
          return message.user._id === user._id && message.to === chosenStudent._id || message.user._id === chosenStudent._id && message.to === user._id;
        });
       
        setFilteredMessages(result);
      }

    }
  }, [user._id, chosenStudent._id, messages.length]);

  React.useEffect(() => {
    if(socket.current) {
      socket.current.on('private message', (data) => {
        setFilteredMessages((prevValue) => {
          return [...prevValue, data];
        });
      });

      return () => {
        socket.current.off('private message');
      };
    }
  }, [socket.current]);

  React.useEffect(() => {
    messagesBottomRef.current && messagesBottomRef.current.scrollIntoView();
  }, [filteredMessages]);

  return (
    <div className='lesson__div-chat'>
      {students.length > 0 && user.admin ? 
        <div className="lesson__div-chat-contacts">          
          <h2 className="lesson__div-chat-contacts-headline">Список студентов</h2>
          <ul className="lesson__div-chat-contacts-list">
            {students.map((student) => {
              return <li key={student._id} className="lesson__div-chat-contacts-list-element">
                <button className="lesson__div-chat-contacts-list-element-button" onClick={() => {
                  showConversation(student)
                }}>
                <img className='lesson__div-chat-user-avatar' src='https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'></img>
                <div className="lesson__div-chat-user-text-wrapper">
                  <h4 className="lesson__div-chat-user-text-name">{student.name}</h4>
                  <span className="lesson__div-chat-user-text-lastMessage">{showLastConversationMessage(student) ? showLastConversationMessage(student) : ""}</span>
                </div>
                </button>
                <div className="lesson__div-chat-contacts-list-element-status" style={student.online ? {backgroundColor: 'yellowgreen'}  : {backgroundColor: 'red'}}></div>
              </li>
            })}
          </ul>
        </div>
          :
        <h2>{courseAuthor.name}</h2>  
      }
      <>
        <div className="lesson__div-chat-textarea">        
          <span>{user.admin ? chosenStudent.name && chosenStudent.name : courseAuthor.name}</span>
          {filteredMessages.length > 0 ? 
            <ul className="lesson__div-chat-textarea-messages">
              {filteredMessages.map((message) => {
                return <li className={message.user._id === user._id ? "lesson__div-chat-textarea-messages-message_self" : "lesson__div-chat-textarea-messages-message"} key={message._id}>{message.text}</li>
              })}
              <li ref={messagesBottomRef}></li>
            </ul>
            : 
            <p>Сообщений пока нет, но это пока</p>
          }
          {chosenStudent._id ? <form className="lesson__div-form">
            <input ref={inputRef} className="lesson__div-form-input" type="text" name="text" />
            <button type="submit" className="lesson__div-form-button" onClick={(evt) => {
              evt.preventDefault();
              sendMessage(chosenStudent);
            }}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
            :
            <form className="lesson__div-form">
              <input ref={inputRef} className="lesson__div-form-input" type="text" name="text" />
              <button type="submit" className="lesson__div-form-button" onClick={(evt) => {
                evt.preventDefault();
                sendMessage(courseAuthor);
              }}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          }
        </div>  
      </>
    </div>
    
      
      

      // </div>
      // :
      // <div>
      //   <h2>{courseAuthor.name}</h2>
      // </div> 
      // }
      // <div>
      //   <span>{chosenStudent.name}</span>
      //   <ul>
      //     {filteredMessages.length > 0 && filteredMessages.map((message) => {
      //       return <li key={message._id}>{message.text}</li>
      //     })}
      //   </ul>
      //   <form className="lesson__div-form">
      //     <input className="lesson__div-form-input" type="text" name="text" />
      //     <button type="submit" className="lesson__div-form-button">Отправить</button>
      //   </form> 
      // </div>
    // </div>
  );
}