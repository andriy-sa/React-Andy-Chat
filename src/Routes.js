import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './Components/App'
import Users from './Components/Users'
import Messages from './Components/Messages'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import requireAuth from './Utils/requireAuth';

export default (
	<Route path="'/">
		<Route path='/' component={App}>
			<IndexRoute component={requireAuth(Messages)}/>
			<Route path='/users' component={requireAuth(Users)}/>
		</Route>
		<Route path='/login' component={Login}/>
		<Route path='/signup' component={SignUp}/>
	</Route>
)

