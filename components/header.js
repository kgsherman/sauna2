import React from 'react';

import SteamUser from '../lib/steamuser';

import Friend from './friend';

export default class Header extends React.Component {
	constructor (props) {
		super(props);
		if (props.user) this.user = new SteamUser(props.user);
	}
	componentWillReceiveProps (props) {
		if (props.user) this.user = new SteamUser(props.user);
	}
	render () {
		return (
			<div id="header">
				<Friend user={this.props.user} />
				<div id="header-login">
					<img src="/assets/steamlogo.png" />
				</div>
			</div>
		);
	}
}