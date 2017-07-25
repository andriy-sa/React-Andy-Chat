import React from 'react'
import {Modal} from 'react-bootstrap'
import {CFG} from './../../Config'
import Api from './../../Api'

const MessageModal = ({user, show, forClose, forNotification, message, socket}) => {

	const sendMesage = () => {
			if(message){
				Api.Chat.sendMessage({
					to_id: user.id,
					message: message
				}).then( response => {
					forClose();
					socket.emit('message', response.data);
					message = '';
					forNotification();
				});
			}
	};

	const updateMessage =(event) => {
		message = event.target.value;
	};

	return (
		<div className="bottom-zone">
			<Modal className="sendMessageModal" show={show} onHide={forClose}>
				<Modal.Header closeButton>
					<img className="img-responsive" alt="people"
							 src={CFG.staticUrl + '/'+( user.avatar ? user.avatar : 'default.jpg' )}/>
					<Modal.Title>{ user.first_name + ' ' + user.last_name }</Modal.Title>
					<span>{ (user.online ? 'online' : 'offline') }</span>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<textarea maxLength={1000} value={message} onChange={updateMessage} name="message" className="form-control" rows="10"></textarea>
						<button onClick={sendMesage} className="btn send-btn">Send</button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default MessageModal;