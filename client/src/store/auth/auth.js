import jwtService from './jwt';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([this.jwtCheck()]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	jwtCheck = () =>
		new Promise(resolve => {
			jwtService.on('onAutoLogin', () => {
				/**
				 * Sign in and retrieve user data from Api
				 */
				const token = jwtService.getAccessToken()
				resolve()
			});

			// jwtService.on('onAutoLogout', () => {
			// 	this.props.logout();

			// 	resolve();
			// });

			jwtService.on('onNoAccessToken', () => {
				resolve();
			});

			jwtService.init();

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <></> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			// logout: logoutUser,
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);