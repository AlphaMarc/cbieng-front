import { Set } from "immutable";
import { Contact as RNContactEntry, getAll as RNContactGetAll } from "react-native-contacts";
import { findRegisteredFriends } from "./firebase";
import { OsContact } from "./model";

export async function getAll(): Promise<OsContact[]> {
	const nativeRNContactEntrys = await new Promise<RNContactEntry[]>((resolve, reject) =>
		RNContactGetAll((err, contacts) => {
			if (err) {
				reject(err);
			} else {
				resolve(contacts);
			}
		})
	);

	const phones = await mergePhoneNumbers(nativeRNContactEntrys);
	const registeredPhones = Set(await findRegisteredFriends(phones.toArray()));

	return nativeRNContactEntrys
		.filter(hasPhoneNumber)
		.map(c => mapNativeRNContactEntry(c, registeredPhones));
}

function mergePhoneNumbers(RNContactEntrys: RNContactEntry[]): Set<string> {
	return RNContactEntrys.reduce(
		(phones, contact) => phones.merge(contact.phoneNumbers.map(p => p.number)),
		Set<string>()
	);
}

function hasPhoneNumber(c: RNContactEntry): boolean {
	return c.phoneNumbers.length !== 0;
}

function mapNativeRNContactEntry(c: RNContactEntry, registeredPhones: Set<string>): OsContact {
	const registeredPhone = c.phoneNumbers.find(p => registeredPhones.contains(p.number));
	const name = [c.givenName, c.middleName, c.familyName].filter(x => !!x).join(" ");
	return {
		name,
		phoneNumber: (registeredPhone || c.phoneNumbers[0]).number,
		isUserRegistered: !!registeredPhone
	};
}
