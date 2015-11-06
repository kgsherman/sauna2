import React from 'react';
import SuperAgent from 'superagent';
import _ from 'lodash';

import { connect } from 'react-redux';
import * as Actions from '../actions/';

import Header from './header';
import FriendsList from './friends';
import Games from './games';


class App extends React.Component {
	state = {
		user: {
			loading: true,
			authenticated: false,
		},
		selected: {}
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

	toggleSelected = (id) => {
		let selected = this.state.selected;
		if (selected[id]) {
			delete selected[id]
			this.setState({	selected })
		} else {
			selected[id] = {loading: true};
			this.setState({ selected });
			SuperAgent.get(`games/${id}`, (err, res) => {
				selected[id] = JSON.parse(res.text);
				this.setState({	selected })
			});
		}
	}

	constructor () {
		super();
		SuperAgent.get('/user', this.receiveUser);
	}

	get games () {
		let blah = _.map(this.state.selected, (games) => {
			if (games.hasOwnProperty('loading')) return [];
			return games;
		});
		console.log('blah', blah);
		console.log(_.intersection.apply(_, blah));
		return [];
	}
	authenticated = () => {
		return (
			<section id='app'>
				<Header {...this.state.user} />
				<FriendsList toggleSelected={this.toggleSelected} selected={this.state.selected} />
				<Games games={this.games} />
			</section>
		);
	}
	notAuthenticated = () => {
		return (
			<section id="login">
				<div id="title">Sauna</div>
				<div id="subtitle">Steam, together.</div>
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

function select(state) {
	return state;
}

export default connect(select)(App);