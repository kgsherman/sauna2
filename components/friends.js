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
	clearFilter = () => {
		React.findDOMNode(this.refs.filter).value = '';
		this.setState({ filter: '' });
	}
	toggleSelected = (id) => {
		this.props.toggleSelected(id);
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
					<input type="text" placeholder="Search" onChange={this.updateFilter} ref="filter" />
					<i className="fa fa-times" onClick={this.clearFilter}></i>
				</div>
				{this.state.friends
					.filter(friend => friend.personaname.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)
					.map(friend => <Friend 
						key={friend.steamid} 
						selected={this.props.selected.hasOwnProperty(friend.steamid)}
						toggleSelected={this.toggleSelected}
						user={friend}
						loading={this.props.selected.hasOwnProperty(friend.steamid) && this.props.selected[friend.steamid].loading}
					/>)
				}
			</section>
		);
	}
}