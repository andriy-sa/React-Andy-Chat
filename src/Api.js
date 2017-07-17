import axios from 'axios'

let baseUrl = 'http://127.0.0.1:5000/api/';

axios.interceptors.request.use(function (config) {

	let token = localStorage.getItem('jwtToken');
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}

	config.headers.common['Authorization'] = `Bearer ${token}`;
	return config;
}, function (error) {
	return Promise.reject(error);
});

export default {
	Chat: {
		sendMessage(data){
			let body = {
				"room_id": data.room_id || null,
				"to_id": data.to_id || null,
				"message": data.message
			};
			return axios.post(baseUrl + 'chat/message', body)
		},
		getRooms(){
			return axios.get(baseUrl + 'chat/rooms')
		},
		getRoomMessages(id){
			return axios.get(baseUrl + 'chat/messages/'+id);
		}
	},
	User: {
		list(){
			return axios.get(baseUrl + 'user/list')
		}
	},
	Auth: {
		me(){
			return axios.get(baseUrl + 'me')
		},
		login(user){
			return axios.post(baseUrl + 'login', user)
		},
		register(user){
			return axios.post(baseUrl + 'user', user)
		}
	}
}