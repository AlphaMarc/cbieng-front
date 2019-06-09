import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Contact } from "react-native-contacts";
import { useChangingValue } from "../../core/hooks";
import { ServicesContext } from "../../services/servicesContext";
import { SearchInput } from "../components/searchInput";

export const NewContactScreen = () => {
	const { contactService } = useContext(ServicesContext);
	const contacts = useChangingValue(contactService.contacts, contactService.onContactsChange, []);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		contactService.syncContacts();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<SearchInput
				style={styles.input}
				placeholder="Chercher un contact"
				value={filter}
				onChangeText={v => setFilter(v)}
			/>
			<ScrollView>
				{contacts
					.filter(contact => contact.phoneNumbers[0])
					.filter(contact => contact.givenName.includes(filter))
					.map((contact, i) => (
						<ContactRow contact={contact} key={i} />
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

NewContactScreen.navigationOptions = { title: "Ajoute un pote ✌" };

const ContactRow: React.FC<{ contact: Contact }> = ({ contact }) => (
	<View style={styles.row}>
		<Text style={styles.name}>{contact.givenName}</Text>
		<Text style={styles.infos}>{`N'utilise pas c'est bieng - ${contact.phoneNumbers[0].number}`}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	input: {
		width: 285,
		marginTop: 30,
		marginBottom: 40,
		alignSelf: "center",
	},
	row: {
		padding: 20,
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "#1b147c",
		marginBottom: 8,
	},
	name: {
		fontSize: 25,
		fontFamily: "Hind-Bold",
		color: "white",
	},
	infos: {
		fontSize: 13,
		fontFamily: "Hind-Regular",
		color: "white",
	},
});
