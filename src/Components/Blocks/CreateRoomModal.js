import React from 'react'
import {Modal} from 'react-bootstrap'
import Api from './../../Api'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import _ from 'underscore'

const CreateRoomModal = ({show, forClose, selectedUsers, users, thisClass, newRoomName}) => {


	function handleSelectChange (value) {
		thisClass.setState({ selectedUsers: value });
	}
	
	function setRoomName(event) {
		thisClass.setState({ newRoomName: event.target.value });
	}
	
	function createRoom() {
		let users = _.pluck(selectedUsers,'id');
		if(users && users.length){
			Api.Chat.privateRoom(users, newRoomName).then(response => {
				thisClass.loadUserRooms();
				forClose();
				thisClass.addNotification('Room successfully created','info');
			}, (e) => {
				if (e.response && e.response.data && e.response.data) {
					thisClass.addNotification(e.response.data.message,'error');
				}
			})
		}
	}

	return (
		<div className="bottom-zone">
			<Modal className="sendMessageModal createRoomModal" show={show} onHide={forClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create Private Room</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<Select
							multi
							options={users}
							value={selectedUsers}
							onChange={handleSelectChange}
							valueKey="id"
							labelKey="username"
						/>
					</div>
					<div className="form-group">
						<input type="text" onChange={setRoomName} className="form-control" value={newRoomName} name="name" placeholder="Room Name" />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={createRoom}  className="btn send-btn">Create</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default CreateRoomModal;