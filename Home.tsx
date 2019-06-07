import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>C'est bieng !</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#3511B1",
	},
	header: {
		fontSize: 40,
		textAlign: "center",
		margin: 10,
		fontFamily: "Hind-Bold",
		color: "#F0F1E0",
	},
});
