import React from "react";
import { Image, StyleSheet, Text, TextInput as RNTextInput, TextInputProps, View } from "react-native";

export const TextInput: React.FC<TextInputProps & { type: "search" | "phone" | "default" }> = ({
	style,
	type,
	...props
}) => {
	return (
		<View style={[styles.container, style]}>
			{type === "search" ? (
				<Image style={styles.icon} source={require("../../assets/images/search.png")} />
			) : type === "phone" ? (
				<View>
					<Text style={styles.phoneCode}>+33</Text>
				</View>
			) : null}
			<RNTextInput {...props} style={styles.input} />
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
	phoneCode: {
		fontSize: 15,
	},
	input: {
		fontSize: 15,
		paddingVertical: 0,
		flex: 1,
	},
});
