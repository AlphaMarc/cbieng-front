import { AsyncStorage } from "react-native";
import { Message } from "./model";

const MESSAGE_LIST_BASE_KEY: string = "messages/";

export async function getAll(friendUid: string): Promise<Message[]> {
	const data = await AsyncStorage.getItem(getStorageKey(friendUid));
	return data ? JSON.parse(data) : [];
}

export async function add(friendUid: string): Promise<void> {
	let friendList: Friend[];
	try {
		friendList = await getAll();
	} catch (e) {
		console.error(e);
		friendList = [];
	}

	friendList.push(friend);
	await AsyncStorage.setItem(FRIEND_LIST_KEY, JSON.stringify(friendList));
}

function getStorageKey(friendUid: string) {
	return `${MESSAGE_LIST_BASE_KEY}${friendUid}`;
}
