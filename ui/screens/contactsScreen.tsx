import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { NewContactButton } from "../components/newContactButton";

export const ContactsScreen: NavigationScreenComponent = ({ navigation }) => (
	<ScrollView contentContainerStyle={styles.container}>
		{[
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
		].map((name, i) => (
			<View style={styles.row} key={i}>
				<Text onPress={() => navigation.navigate("Chat")} style={styles.name}>
					{name}
				</Text>
			</View>
		))}
		<NewContactButton navigation={navigation} />
	</ScrollView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
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
});
