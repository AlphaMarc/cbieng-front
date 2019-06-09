import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export const ChatScreen = () => (
	<SafeAreaView style={styles.container}>
		<ScrollView contentContainerStyle={styles.container}>
			{["", "", "", "", "", "", "", ""].map((_, i) => (
				<Bubble key={i} position={i % 2 === 0 ? "left" : "right"} />
			))}
		</ScrollView>
	</SafeAreaView>
);

const Bubble: React.FC<{ position: "left" | "right" }> = ({ position }) => {
	const viewStyle = position === "left" ? styles.leftBubble : styles.rightBubble;
	const textStyle = position === "left" ? styles.leftBubbleText : styles.rightBubbleText;
	return (
		<View style={[styles.bubble, viewStyle]}>
			<Text style={[styles.bubbleText, textStyle]}>C'est bieng !</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
	},
	row: {
		backgroundColor: "#1b147c",
		borderRadius: 10,
		padding: 20,
		margin: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	bubble: {
		padding: 10,
		borderRadius: 10,
	},
	bubbleText: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Hind-Bold",
		color: "#F0F1E0",
	},
	leftBubble: {
		alignSelf: "flex-start",
		backgroundColor: "white",
	},
	rightBubble: {
		alignSelf: "flex-end",
		backgroundColor: "#21C3D0",
	},
	leftBubbleText: {
		color: "#0a0a0a",
	},
	rightBubbleText: {
		color: "white",
	},
});
