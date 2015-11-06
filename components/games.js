import React from 'react';

import Game from './game';

export default class Games extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<section id="games">
				{this.props.games.map(game => <Game {...game} />)}
			</section>
		);
	}
}