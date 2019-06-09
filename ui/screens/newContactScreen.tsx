import React, { useContext, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useChangingValue } from "../../core/hooks";
import { ServicesContext } from "../../services/servicesContext";

export const NewContactScreen = () => {
	const { contactService } = useContext(ServicesContext);
	const contacts = useChangingValue(contactService.contacts, contactService.onContactsChange, []);

	useEffect(() => {
		contactService.syncContacts();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{contacts.map((contact, i) => (
					<View style={styles.row} key={i}>
						<Text style={styles.name}>{contact.givenName}</Text>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
