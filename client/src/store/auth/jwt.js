import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Emitter from './eventEmmiter'



class JwtService extends Emitter {
    init() {
        this.setInterceptors();
		this.handleAuthentication();
    }

    setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');
			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			console.log('not valid token')
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};

	setSession = (access_token) => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');

			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	login = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/auth/login', data)
				.then(response => {
					if (response.data.data.accessToken) {
						this.setSession(response.data.data.accessToken);
						resolve(response.data);
					}
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	};
	loginGoogle = (payload) => {
		return new Promise ((resolve, reject) => {
			axios
				.post('/google', payload)
				.then(response => {
					if (response.data.data.accessToken) {
						this.setSession(response.data.data.accessToken);
						resolve(response.data);
					}
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	register = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/auth/register', data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	verifyToken = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/auth/verify-email', data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	requestReset = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/auth/password-reset', data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	resetPassword = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/auth/reset-password', data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	removeEvent = id => {
		return axios.delete(`/event/${id}`);
	};

	checkout = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/user/purchase', data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}
	createEvent = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/event/add', data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	createCompany = data => {
		return new Promise((resolve, reject) => {
			axios
				.post('/company/add', data)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	getUserInfo = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('/user/')
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	addComment = (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(`/event/${data.id}/comment/add`, {body: data.comment})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	addEmail = email => {
		return new Promise((resolve, reject) => {
			axios
				.post('/user/change-email', {email})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				})
		});

	};

	addPassword = password => {

		return new Promise((resolve, reject) => {
			axios
				.post('/user/change-password', {password})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});

		});

	};

	addAvatar = avatar => {
         const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        return new Promise((resolve, reject) => {
            axios
                .post(`/user/upload-avatar`, avatar, config )
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    }

	getOrders = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`/user/orders`)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	updateCompanyImage = (image, id) => {
		const config = { headers: { 'Content-Type': 'multipart/form-data' } }
		return new Promise((resolve, reject) => {
			axios
				.post(`/company/${id}/image`, image, config)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}

	updateEventImage = (image, id) => {
		const config = { headers: { 'Content-Type': 'multipart/form-data' } }
		return new Promise((resolve, reject) => {
			axios
				.post(`/event/${id}/image`, image, config)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	}
}

const instance = new JwtService();

export default instance;
