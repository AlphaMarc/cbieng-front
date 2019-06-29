import { AsyncStorage } from "react-native";
import { Friend } from "./model";

const FRIEND_LIST_KEY: string = "friends";

export async function getAll(): Promise<Friend[]> {
	const data = await AsyncStorage.getItem(FRIEND_LIST_KEY);
	return data ? JSON.parse(data) : [];
}

export async function add(friend: Friend): Promise<void> {
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
