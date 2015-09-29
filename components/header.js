import React from 'react';

import SteamUser from '../lib/steamuser';

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
				<div id="header-user" className={this.user.status}>
					<div id="user-header-user-avatar">
						<img src={this.user.data.avatar} />
					</div>
					<div id="header-user-info">
						<div id="header-user-name">{this.user.data.personaname}</div>
						<a href="/logout"><div id="header-user-logout"> > Log out</div></a>
					</div>
				</div>
				<div id="header-login">
					<img src="/assets/steamlogo.png" />
				</div>
			</div>
		);
	}
}