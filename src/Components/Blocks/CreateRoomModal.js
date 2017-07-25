import React from 'react'
import {Modal} from 'react-bootstrap'
import Api from './../../Api'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import _ from 'underscore'

const CreateRoomModal = ({show, forClose, selectedUsers, users, thisClass, newRoomName, updateRoomMembers}) => {


	function handleSelectChange (value) {
		thisClass.setState({ selectedUsers: value });
	}
	
	function setRoomName(event) {
		thisClass.setState({ newRoomName: event.target.value });
	}
	
	function createRoom() {
		let users = _.pluck(selectedUsers,'id');
		if(users && users.length){
			if(!updateRoomMembers){
				Api.Chat.privateRoom(users, newRoomName).then(response => {
					thisClass.loadUserRooms();
					forClose();
					thisClass.addNotification('Room successfully created','info');
				}, (e) => {
					if (e.response && e.response.data && e.response.data) {
						thisClass.addNotification(e.response.data.message,'error');
					}
				})
			}else{
				let oldUsers = _.map(thisClass.state.activeRoom.members, (item)=> {return {
					id:item.user.id,
					username:item.user.username
				}});
				let my_id = thisClass.props.activeUser.id;
				oldUsers =  _.filter(oldUsers, function (item) {
					if(item.id !== my_id){
						return item;
					}
				});
				oldUsers = 	_.pluck(oldUsers, 'id');
				let forDetach = _.difference(oldUsers,users);
				let forAtach = _.difference(users, oldUsers);
				Api.Chat.privateRoom(forAtach, thisClass.state.activeRoom.name,thisClass.state.activeRoom.id, forDetach).then(response => {
					forClose();
					thisClass.addNotification('Room successfully updated','info');
				}, (e) => {
					if (e.response && e.response.data && e.response.data) {
						thisClass.addNotification(e.response.data.message,'error');
					}
				})
			}
		}
	}

	return (
		<div className="bottom-zone">
			<Modal className="sendMessageModal createRoomModal" show={show} onHide={forClose}>
				<Modal.Header closeButton>
					<Modal.Title>{ updateRoomMembers ? 'Manage Private Room' : 'Create Private Room' }</Modal.Title>
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
						{
							!updateRoomMembers &&
							<input type="text" onChange={setRoomName} className="form-control" value={newRoomName} name="name" placeholder="Room Name" />
						}

					</div>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={createRoom}  className="btn send-btn">{ updateRoomMembers ? 'Update' : 'Create' }</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default CreateRoomModal;