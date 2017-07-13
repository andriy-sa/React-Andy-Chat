import React from 'react'
import Api from '../Api'
import PropTypes from 'prop-types';
import './../Styles/Login.css'
import {Link} from 'react-router'
import classNames from 'classnames'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        'email': '',
        'password': ''
      },
      error: ''
    }
  }

  onChange = event => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user: user
    });
  };

  login = () => {
    const user = this.state.user;
    const thisClass = this;
    Api.Auth.login(user)
    .then(response => {
      thisClass.setState({
        error: ''
      });
      localStorage.setItem('jwtToken', response.data.access_token);
      this.context.router.push('/');

    }, (e) => {
      if (e.response && e.response.data && e.response.data.message) {
        thisClass.setState({
          error: e.response.data.message
        });
      }
    })
  };

  render() {
    return (
      <div className="App">
				<div className="pen-title">
					<h1>Andy Chat</h1>
				</div>
				<div className="module form-module">
					<div className="form">
						<h2>Login to your account</h2>
							<input className={classNames({'error': this.state.error})} type="text" onChange={this.onChange} value={this.state.user.email} placeholder="Email" name="email"/>
							<input className={classNames({'error': this.state.error})} onChange={this.onChange} value={this.state.user.password} type="password" placeholder="Password" name="password"/>
							<button onClick={this.login} >Login</button>
					</div>
					<div className="cta">
						<Link to='/signup'>SignUp</Link>
					</div>
				</div>

      </div>
    );
  }


}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Login