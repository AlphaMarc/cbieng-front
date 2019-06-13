import { SafeAreaView, StyleSheet, Text, View, Animated, Image, Dimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";


export const OnBoardingScreen = () => {

    const yOffset : Animated.Value = new Animated.Value(0);
    const SCREEN_WIDTH = Dimensions.get("window").width;


   const translationAnimation = (maxRange: number) => {
        return {
            
            transform :[
                {translateY: yOffset.interpolate({
                    inputRange: [
                        0, SCREEN_WIDTH
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
                    0, SCREEN_WIDTH
                ],
                outputRange: ["29deg", "129deg"]
                })
            }, 
            {translateY: yOffset.interpolate({
                inputRange: [
                    0, SCREEN_WIDTH
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
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: yOffset } } }],
            { useNativeDriver: true }
        )}
       >
            <Animated.Image
                style={[styles.yellowBubble, translationAnimation(500)]}
                source={require('../../assets/images/yellowoval.png')} 
             />
            <Animated.Image
                source={require('../../assets/images/blueoval.png')} style={[styles.blueBubble, translationAnimation(-200)]}
             />
            <Animated.View style={[styles.blueRectangle, rotationAnimation(-100)]}/>

            <Text style={styles.header}>Bienvenue sur l'application C'est Bieng!</Text>
            <Text style={styles.paragraph}>La première app qui te permet de dire à tes potes c'est bieng  🤟</Text>
        </Animated.ScrollView>
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
        backgroundColor: '#50EDFF',
    }
});


