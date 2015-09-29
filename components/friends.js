import React from 'react';
import SuperAgent from 'superagent';

import SteamUser from '../lib/steamuser';

import Friend from './friend';

export default class FriendList extends React.Component {
	state = {
		loading: true,
		friends: []
	}
	receiveFriends = (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		this.setState({
			loading: false,
			friends: JSON.parse(res.text)
		});		
	}
	constructor (props) {
		super(props);
		SuperAgent.get('/friends', this.receiveFriends)
	}
	render () {
		return (
			<section id="friends">
				{this.state.friends.map(friend => <Friend {...friend} />)}
			</section>
		);
	}
}