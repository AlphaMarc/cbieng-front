import { createContext } from "react";
import { AuthService } from "./authService";
import { ContactService } from "./contactsService";
import { FriendService } from "./friendService";

export const ServicesContext = createContext<{
	contactService: ContactService;
	authService: AuthService;
	friendService: FriendService;
}>(null as any);
