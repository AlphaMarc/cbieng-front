import { AsyncStorage } from "react-native";
import { Friend } from "./model";

const FRIEND_LIST_KEY: string = "friends";
const FRIEND_LIST_MOCK: Friend[] = [
	{ name: "Tom Hohler", uid: "mock01" },
	{ name: "Guillaume Berthonneau", uid: "mock02" },
	{ name: "Marc Allaire", uid: "mock03" },
	{ name: "Florian Lassont", uid: "mock04" },
	{ name: "Martin Perinet", uid: "mock05" },
];

export async function getAll(): Promise<Friend[]> {
	return FRIEND_LIST_MOCK;
	// const data = await AsyncStorage.getItem(FRIEND_LIST_KEY);
	// return data ? JSON.parse(data) : [];
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
