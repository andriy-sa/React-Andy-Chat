import React from 'react'
import Api from './../Api'
import {CFG} from './../Config'
import MessageModal from './Blocks/MessageModal'
import NotificationSystem from 'react-notification-system'

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
				<MessageModal forNotification={this.addNotification.bind(this)} forClose={this.closeModal.bind(this)} user={this.state.toUser} show={this.state.showModal}/>
				<NotificationSystem ref="notificationSystem"/>
			</div>
		);
	}
}
export default Users;
