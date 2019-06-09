import React from "react";
import { Image, Platform, StyleSheet, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const SearchInput: React.FC<TextInputProps> = ({ style, ...props }) => {
	return (
		<View style={[styles.container, style]}>
			<Image style={styles.icon} source={require("../../assets/images/search.png")} />
			<TextInput {...props} style={styles.input} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 24,
		backgroundColor: "white",
		paddingVertical: 14,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: 16,
	},
	input: {
		fontSize: 15,
		paddingVertical: 0,
		...Platform.select({
			android: {
				lineHeight: 15,
				height: 20,
			},
		}),
		flex: 1,
	},
});
