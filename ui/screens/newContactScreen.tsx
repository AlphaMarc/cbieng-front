import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useChangingValue } from "../../core/hooks";
import { OsContact } from "../../services/contactsService/model";
import { ServicesContext } from "../../services/servicesContext";
import { TextInput } from "../components/searchInput";

export const NewContactScreen = () => {
	const { contactService } = useContext(ServicesContext);
	const contacts = useChangingValue(contactService.phoneContacts, contactService.onPhoneContacts, []);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		contactService.syncContacts();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				type="search"
				style={styles.input}
				placeholder="Chercher un contact"
				value={filter}
				onChangeText={v => setFilter(v)}
			/>
			<ScrollView>
				{contacts
					.filter(contact => contact.phoneNumber)
					.filter(contact => contact.name.includes(filter))
					.map((contact, i) => (
						<ContactRow contact={contact} key={i} />
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

NewContactScreen.navigationOptions = { title: "Ajoute un pote ✌" };

const ContactRow: React.FC<{ contact: OsContact }> = ({ contact }) => (
	<View style={styles.row}>
		<Text style={styles.name}>{contact.name}</Text>
		<Text style={styles.infos}>{`${contact.isUserRegistered ? "Utilise" : "N'utilise pas"} c'est bieng - ${contact.phoneNumber}`}</Text>
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
