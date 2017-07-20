import React from 'react'
import Api from './../Api'
import {CFG} from './../Config'
import MessageModal from './Blocks/MessageModal'
import NotificationSystem from 'react-notification-system'
import {connect} from 'react-redux'
import _ from 'underscore'

class Users extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			showModal: false,
			toUser: {}
		}
	};

	_notificationSystem = null;

	addNotification = () =>{
		this._notificationSystem.addNotification({
			message: 'Message success sent!',
			level: 'info',
			position: 'br'
		});
	};

	componentDidMount() {
		Api.User.list().then(response => {
			if (response.status === 200) {
				this.setState({users: response.data})
			}
		});
		this._notificationSystem = this.refs.notificationSystem;
		let thisClass = this;

		this.props.socket.on('message', function (data) {
			thisClass._notificationSystem.addNotification({
				message: 'You have new message from '+data.first_name+' '+data.last_name,
				level: 'info',
				position: 'br'
			});
		});

		this.props.socket.on('user_connect', function (data) {
			let users = thisClass.state.users;
			let userKey = _.findKey(users, {'id':data.id});
			if(userKey){
				users[userKey].online = true;
				thisClass.setState({users})
			}
		});

		this.props.socket.on('user_disconnect', function (data) {
			let users = thisClass.state.users;
			let userKey = _.findKey(users, {'id':data.id});
			if(userKey){
				users[userKey].online = false;
				thisClass.setState({users})
			}
		});
	}

	closeModal = () => {
		this.setState({showModal: false});
	};

	openModal = (user) => {
		this.setState({showModal: true, toUser: user});
	};

	render() {
		return (
			<div className="App">
				<div className="you-will-now-them-header">
					<p>Chat Users List </p>
				</div>
				<div className="you-will-now-them">
					<div className="row">
						{this.state.users.map((v, i) => {
							return (
								<div key={i} className="col-md-4 col-sm-6 col-xs-12">
									<div className="people">
										<div className="image">
											<img className="img-responsive" alt="people"
													 src={CFG.staticUrl + '/' + ( v.avatar ? v.avatar : 'default.jpg' )}/>
											{
												v.online && <span className="label label-success online"></span>
											}

										</div>
										<div className="name">
											{v.first_name + ' ' + v.last_name}
										</div>
										<div className="work-ins">
											{v.email }
										</div>
										<span className="add">
											<button onClick={this.openModal.bind(this, v)}>Send Message</button>
										</span>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<MessageModal socket={this.props.socket} forNotification={this.addNotification.bind(this)} forClose={this.closeModal.bind(this)} user={this.state.toUser} show={this.state.showModal}/>
				<NotificationSystem ref="notificationSystem"/>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		socket: state.authReducer.socket
	}
}

export default connect(mapStateToProps, {})(Users)
