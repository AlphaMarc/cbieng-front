import { Signal } from "micro-signals";
import firebase, { RNFirebase } from "react-native-firebase";

export class AuthService {
	private _firebaseUser: RNFirebase.User | null = null;
	onFirebaseUserChanged = new Signal<RNFirebase.User | null>();

	constructor() {
		firebase.auth().onAuthStateChanged(user => {
			this._firebaseUser = user;
			this.onFirebaseUserChanged.dispatch(this._firebaseUser);
			console.log("LOGGED", user);
		});
	}

	async verifyPhoneNumber(phoneNumber: string) {
		try {
			const snapshot = await firebase.auth().verifyPhoneNumber(phoneNumber);

			switch (snapshot.state) {
				// IOS
				case firebase.auth.PhoneAuthState.ERROR:
					console.log("VERIFICATION ERROR");
					console.log(snapshot.error);
					break;
				case firebase.auth.PhoneAuthState.CODE_SENT:
					console.log("CODE SENT");
					return snapshot.verificationId;
					break;
				// ANDROID
				case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
					console.log("TIMETOUT AUTO VERIFY");
					break;
				case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
					console.log("AUTO VERIFIED");
					const { verificationId, code } = snapshot;
					if (verificationId && code) {
						this.authWithVerificationIdAndCode(verificationId, code);
					} else {
						await firebase.auth().signInWithPhoneNumber(phoneNumber);
					}
					break;
			}
		} catch (e) {
			console.log("CAUGHT ERROR");
			console.log(e);
		}
	}

	async authWithVerificationIdAndCode(verificationId: string, code: string) {
		const authCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
		await firebase.auth().signInWithCredential(authCredential);
	}
}
