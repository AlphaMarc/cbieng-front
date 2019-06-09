import { List } from "immutable";
import { Signal } from "micro-signals";
import { AsyncStorage, PermissionsAndroid, Platform } from "react-native";
import { Contact, getAll } from "react-native-contacts";

const CONTACT_KEY = "contacts";

export class ContactService {
	contacts: List<Contact> = List();
	onContactsChange = new Signal<List<Contact>>();

	async init() {
		const contacts = await AsyncStorage.getItem(CONTACT_KEY);
		if (contacts) {
			this.contacts = List(JSON.parse(contacts));
			this.onContactsChange.dispatch(this.contacts);
		}
	}
	async syncContacts() {
		const allowed = Platform.OS === "ios" || (await this.getAndroidPermission());
		if (allowed) {
			getAll((err, contacts) => {
				if (err) {
					console.warn(err);
				} else {
					this.contacts = List(contacts);
					AsyncStorage.setItem(CONTACT_KEY, JSON.stringify(this.contacts.toArray()));
					this.onContactsChange.dispatch(this.contacts);
				}
			});
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
