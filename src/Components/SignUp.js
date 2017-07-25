import React from 'react'
import Api from '../Api'
import PropTypes from 'prop-types';
import './../Styles/Login.css'
import {Link} from 'react-router'
import classNames from 'classnames'
import ErrorHelper from './Blocks/ErrorHelper'

class SignUp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {
			},
			errors: {}
		}
	}

	register = () =>{
		const user = this.state.user;
		const thisClass = this;
		Api.Auth.register(user)
			.then(response => {
				thisClass.setState({
					errors: []
				});
				localStorage.setItem('jwtToken', response.data.access_token);
				this.context.router.push('/users');

			}, (e) => {
				if (e.response && e.response.data && e.response.data) {
					thisClass.setState({
						errors: e.response.data
					});
				}
			})
	};

	onChange = (event)=>{
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;
		this.setState({
			user: user
		});
	};

	render() {
		return (
			<div className="App">
				<div className="pen-title">
					<h1>Andy Chat</h1>
				</div>
				<div className="module form-module">
					<div className="form">
						<h2>Create an account</h2>
							<div className="form-group">
								<input className={classNames({'error': this.state.errors.email})} onChange={this.onChange} value={this.state.user.email} type="text" name="email" placeholder="Email"/>
								<ErrorHelper errors={ this.state.errors } type={'email'} />
							</div>
							<div className="form-group">
								<input className={classNames({'error': this.state.error})} onChange={this.onChange} value={this.state.user.first_name} type="text" name="first_name" placeholder="First Name"/>
								<ErrorHelper errors={ this.state.errors } type={'first_name'} />
							</div>
							<div className="form-group">
								<input className={classNames({'error': this.state.error})} onChange={this.onChange} value={this.state.user.last_name} type="text" name="last_name" placeholder="Last Name"/>
								<ErrorHelper errors={ this.state.errors } type={'last_name'} />
							</div>
							<div className="form-group">
								<input className={classNames({'error': this.state.error})} onChange={this.onChange} value={this.state.user.password} name="password" type="password" placeholder="Password"/>
								<ErrorHelper errors={ this.state.errors } type={'password'} />
							</div>
							<div className="form-group">
								<input className={classNames({'error': this.state.error})} onChange={this.onChange} value={this.state.user.password_confirm} name="password_confirm" type="password" placeholder="Confirm Password"/>
								<ErrorHelper errors={ this.state.errors } type={'password_confirm'} />
							</div>
							<button onClick={this.register}>Register</button>
					</div>
					<div className="cta">
						<Link to='/login'>Login</Link>
					</div>
				</div>

			</div>
		);
	}
}

SignUp.contextTypes = {
	router: PropTypes.object.isRequired
};

export default SignUp