import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import LottieView from "lottie-react-native"
// import Animated from "react-native-reanimated"

export default function WelcomeScreen() {
    const animation = useRef(null)
    const navigation = useNavigation()
    return (
        <View className="bg-black  flex-1 justify-center items-center">
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1615220204129-3904c1f0ef96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGJsYWNrJTIwZm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D' }}
                style={{
                    position: "absolute",
                    width: wp(100),
                    height: hp(100),
                    resizeMode: "cover",
                }}
            />
            {/* <View>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: wp(40),
                        height: hp(40)
                    }}
                    source={require("../../assets/lottie/food-logo.json")}
                />
            </View> */}

            <View className="flex items-center space-y-2">
                <Text
                    className="text-white font-extrabold tracking-widest"
                    style={{
                        fontSize: hp(5),
                    }}
                >
                    Dish Discovery
                </Text>

                <Text
                    className="text-white tracking-widest font-medium"
                    style={{
                        fontSize: hp(2.5),
                    }}
                >
                    Embark on a flavorful journey
                </Text>
            </View>


            <View className="mt-8 ">
                <TouchableOpacity
                    className="bg-emerald-600 "
                    style={{
                        // backgroundColor: "#fff",
                        paddingVertical: hp(1.5),
                        paddingHorizontal: hp(5),
                        borderRadius: hp(1.5),
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: hp(2.2),
                            fontWeight: "medium",
                        }}
                    >
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}