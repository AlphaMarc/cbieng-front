import { Friend } from "./model";
import { getAll } from "./repository";

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
}

export { Friend } from "./model";
