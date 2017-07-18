import { SET_USER, SET_SOCKET } from '../Actions/Auth'

const initialState = {
  activeUser: null,
	socket: null
};

export default (state = initialState, action = {}) => {

  switch (action.type) {

    case SET_USER:
      return Object.assign({},state, {activeUser: action.activeUser});

		case SET_SOCKET:
			return Object.assign({},state, {socket: action.socket});

    default:
      return state
  }
}