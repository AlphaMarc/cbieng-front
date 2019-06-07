import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { NewContactButton } from "../components/newContactButton";

export const HomeScreen: NavigationScreenComponent = ({ navigation }) => (
	<SafeAreaView style={styles.container}>
		<Text style={styles.header}>C'est bieng !</Text>
		<NewContactButton navigation={navigation} />
	</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontSize: 40,
		textAlign: "center",
		margin: 10,
		fontFamily: "Hind-Bold",
		color: "#F0F1E0",
	},
	addButton: {
		backgroundColor: "#f4b300",
		width: 100,
		height: 100,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	plus: {
		width: 40,
		height: 40,
	},
});
