export const SET_USER = 'SET_USER';
export const SET_SOCKET = 'SET_SOCKET';

export function setUser(activeUser) {
  return {
    type: SET_USER,
    activeUser
  }
}

export function setSocket(socket) {
	return {
		type: SET_SOCKET,
		socket
	}
}