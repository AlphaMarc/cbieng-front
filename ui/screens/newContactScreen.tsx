import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export const NewContactScreen = () => (
	<ScrollView contentContainerStyle={styles.container}>
		{[
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
			"Guillaume Berthonneau",
		].map((name, i) => (
			<View style={styles.row} key={i}>
				<Text style={styles.name}>{name}</Text>
			</View>
		))}
	</ScrollView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	row: {
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	name: {
		fontSize: 25,
		textAlign: "center",
		fontFamily: "Hind-Bold",
		color: "#F0F1E0",
	},
});
