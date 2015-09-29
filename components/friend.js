import React from 'react';

import SteamUser from '../lib/steamuser';

export default class Friend extends React.Component {
	select = () => {
		this.props.onSelect(this.props.user.steamid);
	}
	constructor (props) {
		super(props);
		this.user = new SteamUser(this.props.user);
	}
	render () {
		return (
			<div className={`friend ${this.user.status} ${this.props.selected}`} onClick={this.select}>
				<div className="friend-avatar">
					<img src={this.user.data.avatar}/>
				</div>
				<div className="friend-info">
					<div className="friend-name">{this.user.data.personaname}</div>
					<div className="friend-status">{this.user.englishStatus}</div>
				</div>
			</div>
		);			
	}
}