import React, { useCallback, useEffect, useState } from "react";
import { PermissionsAndroid, ScrollView, StyleSheet, Text, View } from "react-native";
import { getAll } from "react-native-contacts";

export const NewContactScreen = () => {
	const [contacts, setContacts] = useState<string[]>([]);

	const retrieveContacts = useCallback(async () => {
		const granted = await PermissionsAndroid.request("android.permission.READ_CONTACTS", {
			title: "salut",
			message: "message",
			buttonNeutral: "Ask Me Later",
			buttonNegative: "Cancel",
			buttonPositive: "OK",
		});
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log("GRANTED");
			getAll((e, retrievedContacts) => {
				if (e) {
					console.warn(e);
				} else {
					setContacts(retrievedContacts.map(c => c.givenName));
				}
			});
		} else {
			console.log("Camera permission denied");
		}
	}, []);

	useEffect(() => {
		retrieveContacts();
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{contacts.map((name, i) => (
				<View style={styles.row} key={i}>
					<Text style={styles.name}>{name}</Text>
				</View>
			))}
		</ScrollView>
	);
};

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
