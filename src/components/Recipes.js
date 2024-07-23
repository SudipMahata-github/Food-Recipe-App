import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from './RecipeCard';

export default function Recipes({ categories, meals }) {
    const navigation = useNavigation();

    return (
        <View className="mx-4 mt-3">
            {/* <Text className="font-semibold  mb-4" style={{ fontSize: hp(3) }}>Recipes</Text> */}
            {meals.length === 0 ? (
                <ActivityIndicator size="large" color="black" style={{ marginTop: hp(10) }} />
            ) : (
                <View className="flex-row flex-wrap justify-between">
                    {categories?.length > 0 && meals?.length > 0 ? meals?.map((item, index) => (
                        <View key={index} style={{ width: wp('45%') }}>
                            <RecipeCard item={item} index={index} navigation={navigation} />
                        </View>
                    )) : null}
                </View>
            )}
        </View>
    )
}
