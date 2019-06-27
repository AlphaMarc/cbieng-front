import React, { useContext, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { ServicesContext } from "../../services/servicesContext";
import { TextInput } from "../components/searchInput";

export const LoginScreen: NavigationScreenComponent = ({ navigation }) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [code, setCode] = useState("");
	const [verificationId, setVerificationId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const { authService } = useContext(ServicesContext);

	const verifyPhoneNumber = async () => {
		setLoading(true);
		setVerificationId((await authService.verifyPhoneNumber(`+33${phoneNumber}`)) || null);
		setLoading(false);
	};

	const verifyCode = async () => {
		setLoading(true);
		await authService.authWithVerificationIdAndCode(verificationId!, code);
		setLoading(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<ActivityIndicator />
			) : verificationId ? (
				<>
					<Text style={styles.header}>Balance ton code</Text>
					<TextInput style={styles.input} type="default" keyboardType="numeric" value={code} onChangeText={setCode} />
					<TouchableWithoutFeedback onPress={verifyCode}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>C'est bieng le code 👌🏻</Text>
						</View>
					</TouchableWithoutFeedback>
				</>
			) : (
				<>
					<Text style={styles.header}>C'est quoi ton numéro ?</Text>
					<TextInput
						style={styles.input}
						type="phone"
						keyboardType="numeric"
						value={phoneNumber}
						onChangeText={setPhoneNumber}
					/>
					<TouchableWithoutFeedback onPress={verifyPhoneNumber}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>C'est bieng mon numéro 😎</Text>
						</View>
					</TouchableWithoutFeedback>
				</>
			)}
		</SafeAreaView>
	);
};

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
	input: {
		alignSelf: "center",
		width: 200,
	},
	plus: {
		width: 40,
		height: 40,
	},
	button: {
		backgroundColor: "#f4b300",
		margin: 20,
		width: 200,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
	},
	buttonText: {
		color: "white",
		fontSize: 15,
		textAlign: "center",
	},
});
