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

	},
	Auth: {
		me(){
			return axios.get(baseUrl + 'me')
		},
		login(user){
			return axios.post(baseUrl + 'login', user)
		}
	}
}