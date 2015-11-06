import React from 'react';

import SteamUser from '../lib/steamuser';

import Spinner from './spinner';

export default class Friend extends React.Component {
	state = {
		loading: false
	}
	select = () => {
		this.props.toggleSelected(this.props.user.steamid);
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
					<div className="friend-game">{this.user.data.gameextrainfo}</div>
				</div>
				<div className="friend-loading">
					{this.props.loading && <Spinner />}
				</div>
			</div>
		);			
	}
}