import React, { useContext, useMemo, useState } from "react";
import { ActivityIndicator, FlatListProps, ListRenderItem, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList, NavigationScreenComponent, withNavigation } from "react-navigation";
import { Friend } from "../../services/friendService";
import { ServicesContext } from "../../services/servicesContext";
import { NewContactButton } from "../components/newContactButton";
import { TextInput } from "../components/searchInput";

export const ContactsScreen: NavigationScreenComponent = ({ navigation }) => {
	const [filter, setFilter] = useState("");

	return (
		<SafeAreaView style={styles.container}>
			<React.Suspense fallback={<ActivityIndicator />}>
				<TextInput
					type="search"
					style={styles.input}
					placeholder="Chercher un contact"
					value={filter}
					onChangeText={v => setFilter(v)}
				/>
				<ContactsList filter={filter} />
			</React.Suspense>
			<NewContactButton navigation={navigation} style={styles.button} />
		</SafeAreaView>
	);
};

ContactsScreen.navigationOptions = { title: "C’est bieng mes contacts 🤘" };

const ContactsList: React.FC<{ filter: string }> = ({ filter }) => {
	const { friendService } = useContext(ServicesContext);
	const filterFn = useMemo(() => (f: Friend) => f.name.includes(filter), [filter]);
	const keyExtractor: FlatListProps<Friend>["keyExtractor"] = useMemo(() => friend => friend.uid, []);
	const renderer: FlatListProps<Friend>["renderItem"] = useMemo(
		() => data => <FriendListItem friend={data.item} />,
		[]
	);

	const friends = friendService.getAllSuspensive().filter(filterFn);

	return <FlatList data={friends} keyExtractor={keyExtractor} renderItem={renderer} />;
};

const FriendListItem: React.FC<{ friend: Friend }> = React.memo(
	withNavigation<{ friend: Friend }>(({ friend, navigation }) => (
		<View style={styles.row}>
			<Text onPress={() => navigation.navigate("Chat")} style={styles.name}>
				{friend.name}
			</Text>
		</View>
	))
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	input: {
		width: 285,
		marginTop: 30,
		marginBottom: 40,
		alignSelf: "center",
	},
	row: {
		backgroundColor: "#1b147c",
		borderRadius: 10,
		padding: 20,
		margin: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	name: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Hind-Bold",
		color: "#F0F1E0",
	},
	button: {
		position: "absolute",
		right: 30,
		bottom: 30,
	},
});
