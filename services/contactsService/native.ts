import { Contact as RNContactEntry, getAll as RNContactGetAll } from "react-native-contacts";
import { findRegisteredFriends, RegisteredContactInfo } from "./firebase";
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

	const phones = mergePhoneNumbers(nativeRNContactEntrys);
	const registeredContacts = await getRegisteredContactsByPhone(phones);

	return nativeRNContactEntrys
		.filter(hasPhoneNumber)
		.map(c => mapNativeRNContactEntry(c, registeredContacts));
}

function mergePhoneNumbers(RNContactEntrys: RNContactEntry[]): Set<string> {
	return RNContactEntrys.reduce(
		(phones, contact) => contact.phoneNumbers.reduce(
			(allPhones, contactPhones) => allPhones.add(contactPhones.number),
			phones
		),
		new Set<string>()
	);
}

async function getRegisteredContactsByPhone(phones: Set<string>): Promise<Map<string, RegisteredContactInfo>> {
	const registeredContacts = await findRegisteredFriends([...phones.values()]);
	return new Map(registeredContacts.map(info => [info.phone, info]));
}

function hasPhoneNumber(c: RNContactEntry): boolean {
	return c.phoneNumbers.length !== 0;
}

function mapNativeRNContactEntry(c: RNContactEntry, registeredPhones: Map<string, RegisteredContactInfo>): OsContact {
	const registeredPhone = c.phoneNumbers.find(p => registeredPhones.has(p.number));
	const uid = registeredPhone && registeredPhones.get(registeredPhone.number)!!.uid;
	const name = [c.givenName, c.middleName, c.familyName].filter(x => !!x).join(" ");
	const phoneNumber = (registeredPhone || c.phoneNumbers[0]).number;

	return typeof uid === "string"
		? { name, phoneNumber, isUserRegistered: true, uid }
		: { name, phoneNumber, isUserRegistered: false };
}
