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
				<div id="user" className={`friend ${this.user.status} ${this.props.selected}`} onClick={this.select}>
					<div className="friend-avatar">
						<img src={this.user.data.avatar}/>
					</div>
					<div className="friend-info">
						<div className="friend-name">{this.user.data.personaname}</div>
						<div className="friend-status">{this.user.englishStatus}</div>
					</div>
					<div className='logout'><a href="/logout">> Log out</a></div>
				</div>
				<div id="header-login">
					<img src="/assets/steamlogo.png" />
				</div>
			</div>
		);
	}
}