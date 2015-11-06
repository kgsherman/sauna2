import { combineReducers } from 'redux';

function authenticated (state = false, action) {
	if (!action) return state;
	let actionMap = {
		SET_AUTHENTICATED: function () {
			return action.authenticated
		}
	}
	console.log(action);
	return actionMap[action.type]() || state;
}

function user (state = null, action) {
	if (!action) return state;
	let actionMap = {
		SET_USER: function () {
			return action.userID;
		},
		RESET_USER: function () {
			return null;
		}
	}

	return actionMap[action.type]() || state;
}

function friends (state = [], action) {
	if (!action) return state;
	let actionMap = {
		SET_FRIENDS: function () {
			return [action.friendIDs]
		},
		RESET_FRIENDS: function () {
			return [];
		}
	}

	return actionMap[action.type]() || state;
}

function selected (state = [], action) {
	if (!action) return state;
	let actionMap = {
		ADD_SELECTED: function () {
			return state.push(action.selectedID);
		},
		REMOVE_SELECTED: function () {
			let i = state.indexOf(action.selectedID);
			return [
				...state.slice(0, i),
				...state.slice(i + 1)
			]
		},
		RESET_SELECTED: function () {
			return [];
		}
	}

	return actionMap[action.type]() || state;
}

function users (state = {}, action) {
	let actionMap = {
		ADD_USERS: function () {
			return {
				...state,
				...action.users
			}
		},
		RESET_USERS: function () {
			return {};
		}
	}

	return actionMap[action.type]() || state;
}

const app = combineReducers({
	authenticated,
	user, 
	friends, 
	selected, 
	users
});

export default app;