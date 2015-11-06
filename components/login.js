import React from 'react';

export default class Login extends React.Component {
	constructor () {
		super();
	}
	render () { 
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
}