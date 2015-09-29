import React from 'react';
import SuperAgent from 'superagent';

import Header from './header';
import FriendsList from './friends';


export default class App extends React.Component {
	state = {
		user: {
			loading: true,
			authenticated: false
		}
	}

	receiveUser = (err, res) => {
		if (err) {
			this.setState({
				user: {
					loading: false,
					authenticated: false
				}
			});
		} else {
			this.setState({
				user: {
					loading: false,
					authenticated: true,
					user: JSON.parse(res.text)
				}
			});
		}
	}

	constructor () {
		super();
		SuperAgent.get('/user', this.receiveUser);
	}
	authenticated = () => {
		return (
			<section id='app'>
				<Header {...this.state.user} />
				<FriendsList />
			</section>
		);
	}
	notAuthenticated = () => {
		return (
			<section id="login">
				<span>Log in securely through Steam to get started</span>
				<a href="/auth/steam/">
					<img src="http://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_small.png" />
				</a>
			</section>
		);
	}
	render () {
		return this.state.user.authenticated ? this.authenticated() : this.notAuthenticated();
	}
}