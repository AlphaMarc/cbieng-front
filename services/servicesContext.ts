import { createContext } from "react";
import { AuthService } from "./authService";
import { ContactService } from "./contactsService";

export const ServicesContext = createContext<{
	contactService: ContactService;
	authService: AuthService;
}>(null as any);
