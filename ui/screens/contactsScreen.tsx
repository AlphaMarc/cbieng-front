import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { NewContactButton } from "../components/newContactButton";

export const ContactsScreen: NavigationScreenComponent = ({ navigation }) => (
	<SafeAreaView style={styles.container}>
		<ScrollView contentContainerStyle={styles.container}>
			{["Tom Holer", "Guillaume Berthonneau", "Marc Allaire", "Florian Lassont", "Martin Perinet"].map((name, i) => (
				<View style={styles.row} key={i}>
					<Text onPress={() => navigation.navigate("Chat")} style={styles.name}>
						{name}
					</Text>
				</View>
			))}
			<NewContactButton navigation={navigation} />
		</ScrollView>
	</SafeAreaView>
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
