import React from "react";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenProp } from "react-navigation";

interface NewContactButtonProps {
	style?: StyleProp<ViewStyle>;
}
export const NewContactButton: React.FC<{ navigation: NavigationScreenProp<{}> } & NewContactButtonProps> = ({
	navigation,
	style,
}) => {
	return (
		<View style={style}>
			<TouchableOpacity onPress={() => navigation.navigate("NewContact")}>
				<View style={styles.addButton}>
					<Image style={styles.plus} source={require("../../assets/images/plus.png")} />
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	addButton: {
		backgroundColor: "#f4b300",
		width: 100,
		height: 100,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	plus: {
		width: 40,
		height: 40,
	},
});
