import React from 'react';
import "./../Styles/Chat.css"
import Api from './../Api'
import classNames from 'classnames'
import {CFG} from './../Config'
import moment from 'moment'
import {connect} from 'react-redux'
import _ from 'underscore'

const messages = document.getElementsByClassName('conv__msgs');

function scrollToBottom() {
	messages[0].scrollTop = messages[0].scrollHeight;
}

class Messages extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			activeRoom: {},
			messages: [],
			new_message: '',
			usersTyping: []
		};

		this.throttleUserTyping = _.throttle(this.waitUserTyping, 3000)
	}

	componentDidMount() {
		this.loadUserRooms();
		// socket events
		let thisClass = this;

		this.props.socket.on('message', function (data) {
			if (data.room_id === thisClass.state.activeRoom.id) {
				thisClass.pushMessage(data);
				let rooms = thisClass.state.rooms;
				let roomKey = _.findKey(rooms, {'id':data.room_id});
				if(roomKey){
					rooms[roomKey].last_message_date = new Date(data.created_at);
					rooms = thisClass.sortRoomsByMessage(rooms);
					thisClass.setState({rooms});
					thisClass.nullableMessagesCounter(rooms[roomKey].id, true);
				}
			}else{
				let rooms = thisClass.state.rooms;
				let roomKey = _.findKey(rooms, {'id':data.room_id});
				if(roomKey){
					rooms[roomKey].unread_messages++;
					rooms[roomKey].last_message_date = new Date(data.created_at);
					rooms = thisClass.sortRoomsByMessage(rooms);
					thisClass.setState({rooms});
				}else{
					//append room to users list
					thisClass.loadUserRooms();
 				}
			}
		});

		this.props.socket.on('user_typing', function (date) {
			if(thisClass.state.activeRoom.id === date['room_id']){
				let usersTyping = thisClass.state.usersTyping;
				usersTyping.push(date['username']);
				thisClass.setState({usersTyping});
				setTimeout(()=> {
					thisClass.setState({usersTyping : []});
				}, 2500)
			}
		})
	}
	waitUserTyping = () => {
		this.props.socket.emit('user_typing',{
			'room_id':this.state.activeRoom.id,
			'username': this.props.activeUser.first_name + ' ' +  this.props.activeUser.last_name
		});
	};

	loadUserRooms = () =>{
		Api.Chat.getRooms().then(response => {
			if (response.status === 200) {
				_.each(response.data, (item)=>{
					if(item.last_message_date){
						item.last_message_date = new Date(item.last_message_date);
					}
				});
				this.setState({rooms: response.data})
			}
		});
	};

	parseDate = (last_message, todayW = true) => {
		if (!last_message) {
			return '';
		}
		let today = moment();
		let date  = moment(last_message);
		if (date.diff(today, 'days') === 0) {
			return todayW ? 'today ' + date.format('H:mm') : date.format('H:mm')
		}
		else if (date.diff(today, 'days') === -1) {
			return 'yesterday ' + date.format('H:mm')
		}
		else {
			return date.format('MMMM Do YYYY, H:mm');
		}
	};

	selectRoom = (room) => {
		if (room.id === this.state.activeRoom.id) {
			return false;
		}
		Api.Chat.getRoomMessages(room.id).then(response => {
			if (response.status === 200) {
				if (!room.is_group) {
					response.data.room.username = room.username;
				}
				this.setState({activeRoom: response.data.room, messages: response.data.messages.reverse(), usersTyping: []});
				this.props.socket.emit('select_room', {'select': true});
				scrollToBottom();
				this.nullableMessagesCounter(room.id);
			}
		}, (e) => {
			this.setState({activeRoom: {}, messages: []})
		});
	};

	checkFirstMessage = (message, key) => {
		if (!this.state.messages[key - 1]) {
			return true;
		} else if (message.sender_id !== this.state.messages[key - 1].sender_id) {
			return true;
		} else {
			return false;
		}
	};

	changeMessage = (event) => {
		this.throttleUserTyping();
		this.setState({new_message: event.target.value});
	};

	sendMessage = (event) => {
		event.preventDefault();
		if (this.state.new_message) {
			Api.Chat.sendMessage({
				"room_id": this.state.activeRoom.id,
				"message": this.state.new_message
			}).then(response => {
				if (response.status === 200) {
					this.props.socket.emit('message', response.data);
					//update my messages history
					this.setState({new_message: ''});
					this.pushMessage(response.data);
				}
			});
		}
	};

	pushMessage = (message) => {
		let messages = this.state.messages;
		messages.push(message);
		this.setState({messages});
		scrollToBottom();
	};

	nullableMessagesCounter = (room_id, fromSocket = false) => {
		let rooms = this.state.rooms;
		let roomKey = _.findKey(rooms, {'id':room_id});
		if(roomKey){
			let last_message = _.last(this.state.messages);
			if(last_message && (rooms[roomKey].unread_messages !== 0 || fromSocket)){
				Api.Chat.updateCounter(rooms[roomKey].id, last_message.id).then(response => {});
			}
			rooms[roomKey].unread_messages = 0;
			this.setState({rooms});
		}

	};

	sortRoomsByMessage = (rooms) =>{
		rooms = _.sortBy(rooms, (item)=>{
			return item.last_message_date;
		});
		return rooms.reverse();
	};

	getTypingMessage = () => {
		let users = this.state.usersTyping;
		if (users.length){
			return users.join(',')+ ' typing...'
		}
		return ''
	};

	render() {
		return (
			<div className="container chat-container">
				<div className="messages__buyers">
					<input className="msg-buyer msg-buyer__search p-l-50" placeholder="search"/>
					<span className="fa fa-search msg-buyer__sicon" aria-hidden="true"></span>
					{this.state.rooms.map((v, i) => {
						return (
							<div onClick={this.selectRoom.bind(this, v)} key={i}
									 className={classNames({'active': this.state.activeRoom.id === v.id, 'msg-buyer': true})}>
								<div className="msg-buyer__logo">
									<img className="img-responsive"
											 src={ CFG.staticUrl + '/' + ( v.is_group ? 'default_group.png' : (v.avatar ? v.avatar : 'default.jpg') ) }
											 alt="logo"/>
									{
										v.online && <span className="label label-success online"></span>
									}
								</div>
								<span className="msg-buyer__name">{ ( v.is_group ? v.name : v.username ) }</span>
								{/*<span className="msg-buyer__text">Raw denim you probably haven’t...</span>*/}
								<span className="msg-buyer__time">{ this.parseDate(v.last_message_date) }</span>

								{!!v.unread_messages &&
								<span className="no-read badge">{ v.unread_messages }</span>
								}
							</div>
						)
					})}

				</div>

				<div className="messages__window">
					<header className="conv__header">
						<span>{(this.state.activeRoom.is_group ? this.state.activeRoom.name : this.state.activeRoom.username)}</span>
					</header>

					<main className="conv__msgs">

						{this.state.messages.map((v, i) => {
							if (v.sender_id === this.props.activeUser.id) {
								return (
									<div key={i} className={classNames({'msg-first': this.checkFirstMessage(v, i), 'msg msg__my': true})}>
										{ v.message}
										<p className="msg-time">{ this.parseDate(v.created_at, false) }</p>
									</div>
								)
							} else {
								return (
									<div key={i}>
										{
											this.checkFirstMessage(v, i) &&
											<img className="msg_img" src={ CFG.staticUrl + '/' + (v.avatar ? v.avatar : 'default.jpg') }
													 alt="logo"/>
										}

										<div className="msg-user-block">
											<div className={classNames({'msg-first': this.checkFirstMessage(v, i), 'msg msg__user': true})}>
												{ v.message}
												<p className="msg-time">{ this.parseDate(v.created_at, false) }</p>
											</div>
										</div>
									</div>
								)
							}
						})}
					</main>
					{ !!this.state.activeRoom.id &&

					<form className="conv__input" onSubmit={this.sendMessage}>
						<input
							type="text"
							name="new_message"
							value={this.state.new_message}
							onChange={this.changeMessage}
							className="section__input newmsg-input"
							placeholder="typeMessage"
						/>

						<button
							type="submit"
							name="button"
							className="newmsg-btn"
						>
							<img src="send.svg" alt="send"/>
						</button>
						<div className="userTyping">
							{ this.getTypingMessage() }
						</div>
					</form>
					}
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		socket: state.authReducer.socket
	}
}

export default connect(mapStateToProps, {})(Messages)