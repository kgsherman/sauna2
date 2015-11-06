import React from 'react';
import SuperAgent from 'superagent';
import _ from 'lodash';

import { connect } from 'react-redux';
import * as Actions from '../actions/';

import Login from './login';
import Header from './header';
import FriendsList from './friends';
import Games from './games';

import SteamUser from '../lib/steamuser';


class App extends React.Component {
	constructor (props, context) {
		super(props, context);
		this.authenticate();
	}
	render () {
		return (
			this.props.user ? <Login /> : this.app()
		);
	}
	app = () => {
		return (
			<section id='app'>
				App
			</section>
		);
	}
	authenticate = () => {
		SuperAgent.get('/user', (err, res) => {
			let userObject = JSON.parse(res.text);
			let userID = userObject.steamid;
			let user = {
				[userID]: userObject
			};
			this.props.dispatch(Actions.setUser(userID));
			this.props.dispatch(Actions.addUsers(user));
		});
	}
	get user () {
		return new SteamUser(this.props.users[this.prop.user]);
	}
}

function select(state) {
	return state;
}

export default connect(select)(App);