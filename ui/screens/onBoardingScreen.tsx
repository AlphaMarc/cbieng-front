import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import LinearGradient from 'react-native-linear-gradient';


export const OnBoardingScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFEF50','#FF9E4E']} style={styles.yellowBubble}/>
            <LinearGradient colors={['#2CA8FF','#50EDFF']} style={styles.blueBubble}/>
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
        borderRadius: 50,
        height: 80,
        width: 80,
    },
    blueBubble:{
        position: 'absolute',
        top: 212,
        left: 273,
        borderRadius: 50,
        height: 20,
        width: 20,
        backgroundColor: '#2CA8FF',
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


