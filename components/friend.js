import React from 'react';

import SteamUser from '../lib/steamuser';

export default class Friend extends React.Component {
	constructor (props) {
		super(props);
		this.user = new SteamUser(this.props);
	}
	render () {
		return (
			<div className={`user-component ${this.user.status}`}>
				<div className="user-component-avatar">
					<img src={this.user.data.avatar}/>
				</div>
				<div className="user-component-info">
					<div className="user-component-info-name">{this.user.data.personaname}</div>
					<div className="user-component-info-status">{this.user.data.englishStatus}</div>
				</div>
			</div>
		);			
	}
}