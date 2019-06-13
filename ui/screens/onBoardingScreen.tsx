import { SafeAreaView, StyleSheet, Text, View, Animated, Image } from "react-native";
import React from "react";


export const OnBoardingScreen = () => {

   

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/yellowoval.png')} style={styles.yellowBubble}
             />
            <Image
                source={require('../../assets/images/blueoval.png')} style={styles.blueBubble}
             />
            <View style={styles.blueRectangle}/>

            <Text style={styles.header}>Bienvenue sur l'application C'est Bieng!</Text>
            <Text style={styles.paragraph}>La première app qui te permet de dire à tes potes c'est bieng  🤟</Text>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
	container: {
        flex: 1,
    },
    header: {
        fontSize: 30,
        fontFamily: "Hind-Bold",
        lineHeight : 35,
        color: "#FFFFFF",
        paddingLeft: 46,
        paddingRight: 137,
        paddingTop: 15,
        marginBottom: 28,
    },
    paragraph : {
        fontSize: 16,
		fontFamily: "Hind",
        color: "#FFFFFF",
        paddingLeft: 46,
        paddingRight: 137,
    },
    yellowBubble: {
        position: 'absolute',
        top: 458,
        left: 62,
    },
    blueBubble:{
        position: 'absolute',
        top: 212,
        left: 273,
    },
    blueRectangle: {
        position: 'absolute',
        top: 326,
        left: 253,
        borderRadius: 50,
        height: 356,
        width: 400,
        transform: [{rotate: '29deg'}],
        backgroundColor: '#50EDFF',
    }
});


