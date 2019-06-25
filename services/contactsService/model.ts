type RegistrationInfo =
	| { isUserRegistered: true; uid: string; }
	| { isUserRegistered: false; uid?: never };

export type OsContact = {
	name: string;
	phoneNumber: string;
} & RegistrationInfo;
