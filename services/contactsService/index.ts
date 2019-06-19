import { List } from "immutable";
import { Signal } from "micro-signals";
import { AsyncStorage, PermissionsAndroid, Platform } from "react-native";
import { getAll } from "./native";
import { findRegisteredFriends } from "./firebase";
import { OsContact } from "./model";

const CONTACT_KEY = "phone_contacts";

export class ContactService {
	phoneContacts: List<OsContact> = List();
	onPhoneContacts = new Signal<List<OsContact>>();

	async init() {
		const contacts = await AsyncStorage.getItem(CONTACT_KEY);
		if (contacts) {
			this.phoneContacts = List(JSON.parse(contacts));
			this.onPhoneContacts.dispatch(this.phoneContacts);
		}
	}
	async syncContacts() {
		const allowed = Platform.OS === "ios" || (await this.getAndroidPermission());
		if (allowed) {
			try {
				this.phoneContacts = List(await getAll());
			} catch (e) {
				console.error(e);
				this.phoneContacts = List();
			}

			AsyncStorage.setItem(CONTACT_KEY, JSON.stringify(this.phoneContacts.toArray()));
			this.onPhoneContacts.dispatch(this.phoneContacts);
		}
	}

	private async getAndroidPermission() {
		const granted = await PermissionsAndroid.request("android.permission.READ_CONTACTS", {
			title: "salut",
			message: "message",
			buttonNeutral: "Ask Me Later",
			buttonNegative: "Cancel",
			buttonPositive: "OK",
		});

		return granted === PermissionsAndroid.RESULTS.GRANTED;
	}
}
