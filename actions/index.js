export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';
export const SET_FRIENDS = 'SET_FRIENDS';
export const RESET_FRIENDS = 'RESET_FRIENDS';
export const ADD_SELECTED = 'ADD_SELECTED';
export const REMOVE_SELECTED = 'REMOVE_SELECTED';
export const RESET_SELECTED = 'RESET_SELECTED';
export const ADD_USERS = 'ADD_USERS';
export const RESET_USERS = 'RESET_USERS';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export function setUser (userID) {
	return { type: SET_USER, userID };
}

export function resetUser () {
	return { type: RESET_USER };
}

export function setFriends (friendIDs) {
	return { type: SET_FRIENDS, friendIDs};
}

export function resetFriends () {
	return { type: RESET_FRIENDS };
}

export function addSelected (selectedID) {
	return { type: ADD_SELECTED, selectedID };
}

export function removeSelected (selectedID) {
	return { type: REMOVE_SELECTED, selectedID };
}

export function resetSelected () {
	return { type: RESET_SELECTED };
}

export function addUsers (users) {
	return { type: ADD_USERS, users };
}

export function resetUsers () {
	return { type: RESET_USERS };
}

export function setAuthenticated (authenticated) {
	return { type: SET_AUTHENTICATED, authenticated }
}