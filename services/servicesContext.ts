import { createContext } from "react";
import { ContactService } from "./contactsService";

export const ServicesContext = createContext<{
	contactService: ContactService;
}>(null as any);
