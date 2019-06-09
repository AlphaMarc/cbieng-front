import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { NewContactButton } from "../components/newContactButton";
import { SearchInput } from "../components/searchInput";

export const ContactsScreen: NavigationScreenComponent = ({ navigation }) => {
	const [filter, setFilter] = useState("");

	return (
		<SafeAreaView style={styles.container}>
			<SearchInput
				style={styles.input}
				placeholder="Chercher un contact"
				value={filter}
				onChangeText={v => setFilter(v)}
			/>
			<ScrollView>
				{["Tom Hohler", "Guillaume Berthonneau", "Marc Allaire", "Florian Lassont", "Martin Perinet"]
					.filter(c => c.includes(filter))
					.map((name, i) => (
						<View style={styles.row} key={i}>
							<Text onPress={() => navigation.navigate("Chat")} style={styles.name}>
								{name}
							</Text>
						</View>
					))}
			</ScrollView>
			<NewContactButton navigation={navigation} style={styles.button} />
		</SafeAreaView>
	);
};

ContactsScreen.navigationOptions = { title: "C’est bieng mes contacts 🤘" };

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
