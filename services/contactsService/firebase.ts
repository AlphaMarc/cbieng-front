import firebase from "react-native-firebase";

export async function findRegisteredFriends(phones: string[]): Promise<string[]> {
	const response = await firebase.functions().httpsCallable("findRegisteredFriends")(phones);
	return response.data;
}