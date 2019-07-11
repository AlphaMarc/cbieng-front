import { OsContact } from "../contactsService/model";
import { Message } from "./model";
import { add, getAll } from "./repository";

export class MessageService {

	private messages = new Map<string, Message[]>();

	getAllForFriendSuspensive(friendUid: string): Message[] {
		if (!this.messages.has(friendUid)) {
			throw (async () => {
				this.messages.set(friendUid, await getAll(friendUid))
			})();
		}

		return this.messages.get(friendUid)!!;
	}

	async add(contact: OsContact): Promise<void> {
		if (contact.isUserRegistered) {
			const friend: Friend = {
				name: contact.name,
				uid: contact.uid,
			};
			await add(friend);
		}
	}
}

export { Message } from "./model";
