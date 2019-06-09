import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { ContactService } from "./services/contactsService";
import { ServicesContext } from "./services/servicesContext";
import { ChatScreen } from "./ui/screens/chatScreen";
import { ContactsScreen } from "./ui/screens/contactsScreen";
import { HomeScreen } from "./ui/screens/homeScreen";
import { NewContactScreen } from "./ui/screens/newContactScreen";

const AppStackNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		NewContact: {
			screen: NewContactScreen,
		},
		Contacts: {
			screen: ContactsScreen,
		},
		Chat: {
			screen: ChatScreen,
		},
	},
	{
		initialRouteName: "Contacts",
		headerMode: "none",
		cardStyle: { backgroundColor: "#3511B1" },
	}
);

const contactService = new ContactService();
contactService.init();

const AppNavigator = createAppContainer(AppStackNavigator);

export const App = () => (
	<ServicesContext.Provider value={{ contactService }}>
		<AppNavigator />
	</ServicesContext.Provider>
);
