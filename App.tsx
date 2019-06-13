import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { ContactService } from "./services/contactsService";
import { ServicesContext } from "./services/servicesContext";
import { ChatScreen } from "./ui/screens/chatScreen";
import { ContactsScreen } from "./ui/screens/contactsScreen";
import { HomeScreen } from "./ui/screens/homeScreen";
import { NewContactScreen } from "./ui/screens/newContactScreen";
import { OnBoardingScreen } from "./ui/screens/onBoardingScreen";

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
		OnBoarding: {
			screen: OnBoardingScreen,
		},
	},
	{
		initialRouteName: "OnBoarding",
		cardStyle: { backgroundColor: "#3511B1" },
		headerBackTitleVisible: false,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: "#3511B1",
				elevation: 0,
				borderBottomWidth: 0,
			},
			headerTitleStyle: {
				color: "white",
				fontSize: 20,
				fontFamily: "Hind-Bold",
			},
			headerTintColor: "white",
		},
		headerLayoutPreset: "center",
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
