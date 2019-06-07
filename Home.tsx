import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

export default class Home extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>C'est bieng !</Text>
				<TouchableOpacity onPress={() => {Alert.alert('You tapped the button!');}} style={styles.button}>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
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
	button : {
		backgroundColor: "#F4B300",
		paddingHorizontal: 45,
		paddingVertical : 25,
		borderRadius : 38,
	},
	buttonText : {
		fontFamily: "Hind-Semibold",
		fontSize: 40,
	}
});
