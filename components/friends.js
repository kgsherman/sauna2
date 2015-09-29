import React from 'react';
import SuperAgent from 'superagent';
import _ from 'lodash';

import SteamUser from '../lib/steamuser';

import Friend from './friend';

export default class FriendList extends React.Component {
	state = {
		loading: true,
		filter: '',
		friends: [],
		selectedFriends: []
	}
	receiveFriends = (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		let unsortedFriends = JSON.parse(res.text);
		let sortedFriends = _(unsortedFriends).chain()
			.sortBy(friend => friend.personaname.toLowerCase())
			.sortBy(friend => friend.personastate == 0)
			.sortBy(friend => !!!friend.gameid)
			.value();

		this.setState({
			loading: false,
			friends: sortedFriends
		});		
	}
	updateFilter = () => {
		this.setState({ filter: event.target.value });
	}
	addSelected = (e) => {
		let selection = this.state.selectedFriends;
		let loc = selection.indexOf(e);
		if (loc >= 0) {
			selection.splice(loc, 1);
		} else {
			selection.push(e);
		}
		this.setState({
			selectedFriends: selection
		});
	}
	constructor (props) {
		super(props);
		SuperAgent.get('/friends', this.receiveFriends)
	}
	render () {
		return (
			<section id="friends">
				<div id="filter">
					<i className="fa fa-search"></i>
					<input type="text" placeholder="Search" onChange={this.updateFilter} />
					<i className="fa fa-times"></i>
				</div>
				{this.state.friends
					.filter(friend => friend.personaname.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)
					.map(friend => <Friend 
						key={friend.steamid} 
						selected={this.state.selectedFriends.indexOf(friend.steamid) >= 0}
						onSelect={this.addSelected}
						user={friend}
					/>)
				}
			</section>
		);
	}
}