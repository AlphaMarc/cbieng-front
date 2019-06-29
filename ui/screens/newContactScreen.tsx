import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { useChangingValue } from "../../core/hooks";
import { OsContact } from "../../services/contactsService/model";
import { ServicesContext } from "../../services/servicesContext";
import { TextInput } from "../components/searchInput";

export const NewContactScreen = () => {
	const { contactService } = useContext(ServicesContext);
	const contacts = useChangingValue(contactService.phoneContacts, contactService.onPhoneContacts, []);
	const [filter, setFilter] = useState("");
	const filteredContacts = useMemo(
		() => contacts.filter(({ name, phoneNumber }) => phoneNumber && name.includes(filter)).toArray(),
		[contacts, filter]
	);

	useEffect(() => {
		contactService.syncContacts();
	}, []);

	const keyExtractor = useCallback((item: OsContact) => item.phoneNumber, []);
	const renderItem = useCallback<ListRenderItem<OsContact>>(({ item }) => <ContactRow contact={item} /> , []);

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				type="search"
				style={styles.input}
				placeholder="Chercher un contact"
				value={filter}
				onChangeText={v => setFilter(v)}
			/>
			<FlatList
				data={filteredContacts}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
			/>
		</SafeAreaView>
	);
};

NewContactScreen.navigationOptions = { title: "Ajoute un pote ✌" };

const ContactRow: React.FC<{ contact: OsContact }> = ({ contact }) => {
	const navigation = useNavigation();
	const { friendService } = useContext(ServicesContext);
	const addFriend = useCallback(() => {
		if (contact.isUserRegistered) {
			friendService.add(contact);
			navigation.pop();
		}
	}, [contact, friendService, navigation]);

	return (
		<TouchableOpacity onPress={addFriend}>
			<View style={styles.row}>
				<Text style={styles.name}>{contact.name}</Text>
				<Text style={styles.infos}>{`${contact.isUserRegistered ? "Utilise" : "N'utilise pas"} c'est bieng - ${
					contact.phoneNumber
				}`}</Text>
			</View>
		</TouchableOpacity>
	);
};

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
