export default class SteamUser {
	static statusMap = {
		'0': {
			label: 'Offline',
			value: 'offline'
		},
		'1': {
			label: 'Online',
			value: 'online'
		},
		'2': {
			label: 'Busy',
			value: 'online'
		},
		'3': {
			label: 'Away',
			value: 'online'
		},
		'4': {
			label: 'Snooze',
			value: 'online'
		},
		'5': {
			label: 'Looking to trade',
			value: 'online'
		},
		'6': {
			label: 'Looking to play',
			value: 'online'
		},
		'-1': {
			label: 'In game',
			value: 'ingame'
		}		
	}

	constructor (data) {
		this.data = data;
	}
	get inGame () {
		return !!this.data.gameid;
	}
	get englishStatus () {
		return this.inGame ? SteamUser.statusMap[-1].label : SteamUser.statusMap[this.data.personastate].label;
	}
	get status () {
		return this.inGame ? SteamUser.statusMap[-1].value : SteamUser.statusMap[this.data.personastate].value;	
	}
}