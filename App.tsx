import { createAppContainer, createStackNavigator } from "react-navigation";
import { ChatScreen } from "./ui/screens/chatScreen";
import { ContactsScreen } from "./ui/screens/contactsScreen";
import { HomeScreen } from "./ui/screens/homeScreen";
import { NewContactScreen } from "./ui/screens/newContactScreen";

const AppNavigator = createStackNavigator(
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

export const App = createAppContainer(AppNavigator);
