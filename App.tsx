import React, { useEffect, useState } from "react";
import { RNFirebase } from "react-native-firebase";
import { createAppContainer, createStackNavigator, StackNavigatorConfig } from "react-navigation";
import { AuthService } from "./services/authService";
import { ContactService } from "./services/contactsService";
import { FriendService } from "./services/friendService";
import { ServicesContext } from "./services/servicesContext";
import { ChatScreen } from "./ui/screens/chatScreen";
import { ContactsScreen } from "./ui/screens/contactsScreen";
import { HomeScreen } from "./ui/screens/homeScreen";
import { LoginScreen } from "./ui/screens/loginScreen";
import { NewContactScreen } from "./ui/screens/newContactScreen";
import { OnBoardingScreen } from "./ui/screens/onBoardingScreen";

const stackOptions: StackNavigatorConfig = {
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
};

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
	{ ...stackOptions, initialRouteName: "Contacts" }
);

const AuthStackNavigator = createStackNavigator(
	{
		OnBoarding: {
			screen: OnBoardingScreen,
			navigationOptions: {
				header: null,
			},
		},
		Login: {
			screen: LoginScreen,
		},
	},
	{
		...stackOptions,
		initialRouteName: "OnBoarding",
	}
);

const contactService = new ContactService();
const authService = new AuthService();
const friendService = new FriendService();
contactService.init();

const AppNavigator = createAppContainer(AppStackNavigator);
const AuthNavigator = createAppContainer(AuthStackNavigator);

export const App = () => {
	const [initialized, setInitialized] = useState(false);
	const [user, setUser] = useState<RNFirebase.User | null>(null);
	useEffect(() => {
		authService.onFirebaseUserChanged.add(u => {
			setUser(u);
			setInitialized(true);
		});
	}, []);
	return (
		initialized && (
			<ServicesContext.Provider value={{ contactService, authService, friendService }}>
				{user ? <AppNavigator /> : <AuthNavigator />}
			</ServicesContext.Provider>
		)
	);
};
