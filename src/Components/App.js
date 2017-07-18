import React from 'react';
import Header from './Blocks/Header'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { setSocket } from '../Actions/Auth'

class App extends React.Component {

	componentDidMount(){
		let token = localStorage.getItem('jwtToken');
		let socket = io.connect({
			transportOptions: {
				polling: {
					extraHeaders: {
						'Authorization': 'Bearer '+token
					}
				}
			}
		});
		this.props.setSocket(socket);
	}

  render() {
    let path = this.props.location.pathname;
    return (
      <div className="App">
        <Header path={path} user={this.props.activeUser}/>
        <div id="content">
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeUser: state.authReducer.activeUser,
		socket: state.authReducer.socket
  }
}

export default connect(mapStateToProps, {setSocket})(App);
