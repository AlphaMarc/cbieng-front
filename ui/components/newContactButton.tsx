import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenProp } from "react-navigation";

export const NewContactButton: React.FC<{ navigation: NavigationScreenProp<{}> }> = ({ navigation }) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate("NewContact")}>
			<View style={styles.addButton}>
				<Image style={styles.plus} source={require("../../assets/images/plus.png")} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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
