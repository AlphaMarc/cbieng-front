import { SafeAreaView, StyleSheet, Text, View, Animated, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import {SoundService} from "../../services/soundService"

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


export const OnBoardingScreen = ({ navigation }) => {

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
                <TouchableOpacity onPress={() => SoundService.playSong(SoundService.cBieng)}>
                <Image
                    style={styles.volume}
                    source={require('../../assets/images/volume.png')}
                />
                </TouchableOpacity>
                <Text style={styles.header} >C'est Bieng !</Text>
            </View>
            <View style={styles.padding}/>
            <View style={styles.inviteview}>
                <View style={styles.inviteTextView}> 
                <Text style={styles.header}>Pour commencer à bienguer invite un pote</Text>
                </View>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('NewContact')}>
                    <Text style = {styles.actionButtonText}>Invite un pote</Text>
                </TouchableOpacity>
            </View>


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
        paddingLeft: SCREEN_WIDTH/10,
        paddingRight: SCREEN_WIDTH/3,
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
    },
    inviteview: {
        
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: SCREEN_HEIGHT /2,
    },
    inviteTextView : {
        paddingLeft: SCREEN_WIDTH/10,
        paddingRight: SCREEN_WIDTH/4,
        paddingBottom: 25,
    },
    actionButton: {
        backgroundColor: "#f4b300",
        borderRadius : 30,
        height : 50,
        alignItems : 'center',
        justifyContent : 'center'
    },
    actionButtonText: {
        fontSize: 15,
		fontFamily: "Hind-Bold",
        color: "#000",
        paddingHorizontal: 50,
    }
});


