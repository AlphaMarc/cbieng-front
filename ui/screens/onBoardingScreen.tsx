import { SafeAreaView, StyleSheet, Text, View, Animated, Image, Dimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const OnBoardingScreen = () => {

    const yOffset : Animated.Value = new Animated.Value(0);


   const translationAnimation = (maxRange: number) => {
        return {
            
            transform :[
                {translateY: yOffset.interpolate({
                    inputRange: [
                        0, SCREEN_HEIGHT
                    ],
                    outputRange: [
                        0, maxRange
                    ]
                })}
            ]
        }
   }

   const rotationAnimation = (maxRange: number) => {
    return {
        
        transform :[
            {rotate: yOffset.interpolate({
                inputRange: [
                    0, SCREEN_HEIGHT
                ],
                outputRange: ["29deg", "129deg"]
                })
            }, 
            {translateX: yOffset.interpolate({
                inputRange: [
                    0, SCREEN_HEIGHT
                ],
                outputRange: [
                    0, maxRange
                ]})
            }
        ]
    }
}

    return (
       <Animated.ScrollView
            pagingEnabled={true}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: yOffset } } }],
            { useNativeDriver: true })}
            style={styles.container}
       >
            <Animated.Image
                style={[styles.yellowBubble, translationAnimation(500)]}
                source={require('../../assets/images/yellowoval.png')} 
             />
            <Animated.Image
                source={require('../../assets/images/blueoval.png')} style={[styles.blueBubble, translationAnimation(-200)]}
             />
            <Animated.View style={[styles.blueRectangle, rotationAnimation(-1000)]}/>
            <View style={styles.welcomeView}>
                <Text style={styles.header}>Bienvenue sur l'application C'est Bieng!</Text>
                <Text style={styles.paragraph}>La première app qui te permet de dire à tes potes c'est bieng  🤟</Text>
            </View>

            <View style={styles.padding}/>
            <View style={styles.volumeview}>
                <Image
                    style={styles.volume}
                    source={require('../../assets/images/volume.png')}
                />
                <Text style={styles.header} >C'est Bieng !</Text>

            </View>
            <View style={styles.padding}/>

        </Animated.ScrollView>
    );

};

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor : 'transparent'
    },
    padding : {
        paddingBottom: SCREEN_HEIGHT/2,
    },
    welcomeView: {
        paddingLeft: 46,
        paddingRight: 137,
        paddingTop: SCREEN_HEIGHT /10,
        marginBottom: 28,
        height: SCREEN_HEIGHT /2,
        alignItems: 'flex-start',
    },
    header: {
        fontSize: 30,
        fontFamily: "Hind-Bold",
        lineHeight : 35,
        color: "#FFFFFF",
        paddingTop: 15,
    },
    paragraph : {
        fontSize: 16,
		fontFamily: "Hind",
        color: "#FFFFFF",
        paddingTop: 15,
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
        width: 300,
        backgroundColor: '#50EDFF',
    },
    volume : {
        height: 40,
        width: 40,
    },
    volumeview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: SCREEN_HEIGHT /2,
    }
});


