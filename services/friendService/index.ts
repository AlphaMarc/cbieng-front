import { OsContact } from "../contactsService/model";
import { Friend } from "./model";
import { add, getAll } from "./repository";

export class FriendService {

	private friends?: Friend[];

	getAllSuspensive(forceReload: boolean = false): Friend[] {
		if (!this.friends || forceReload) {
			throw (async () => {
				this.friends = await getAll();
			})();
		}

		return this.friends;
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

export { Friend } from "./model";
