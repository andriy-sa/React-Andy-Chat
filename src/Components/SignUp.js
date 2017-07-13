import React from 'react'
import Api from '../Api'
import PropTypes from 'prop-types';
import './../Styles/Login.css'
import {Link} from 'react-router'
import classNames from 'classnames'

class SignUp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {
			},
			errorr: []
		}
	}

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
								<input type="text" placeholder="Username"/>
							</div>
							<div className="form-group">
								<input type="password" placeholder="Password"/>
							</div>
							<div className="form-group">
								<input type="email" placeholder="Email Address"/>
							</div>
							<div className="form-group">
								<input type="tel" placeholder="Phone Number"/>
							</div>
							<button>Register</button>
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