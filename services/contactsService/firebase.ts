import firebase from "react-native-firebase";

export interface RegisteredContactInfo {
	uid: string;
	phone: string;
}

export async function findRegisteredFriends(phones: string[]): Promise<RegisteredContactInfo[]> {
	await firebase.functions().useFunctionsEmulator("http://localhost:5000");
	const response = await firebase.functions().httpsCallable("findRegisteredFriends")(phones);
	return response.data;
}
