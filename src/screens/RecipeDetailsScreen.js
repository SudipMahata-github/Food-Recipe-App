import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { CheckCircleIcon, ChevronLeftIcon, PaperAirplaneIcon } from 'react-native-heroicons/outline'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function RecipeDetailsScreen(props) {
    const navigation = useNavigation()
    const data = props.route.params

    const [allRecipes, setAllRecipes] = useState([])
    const [loading, setLoading] = useState()

    useEffect(() => {
        getRecipes(data?.idMeal)
    }, [])

    const getRecipes = async (id) => {
        setLoading(true)
        try {
            const response = await axios.get(
                `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            if (response && response.data) {
                setAllRecipes(response.data.meals[0])
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    console.log(allRecipes.strMeal)

    const ingredientsAvail = (meals) => {
        if (!meals) return []
        let indexes = []
        for (let i = 1; i <= 20; i++) {
            if (meals['strIngredient' + i]) {
                indexes.push(i)
            }
        }
        return indexes
    }

    return (
        <ScrollView className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            {/* <StatusBar /> */}

            <View className="flex-row justify-center p-1">
                <Image
                    source={{ uri: data.strMealThumb }}
                    style={{ width: wp(98), height: hp(50), borderRadius: 20 }}
                />
            </View>

            <View className="w-full absolute flex-row justify-between items-center pt-10">
                <TouchableOpacity className="rounded-full ml-2 bg-white p-2" onPress={() => navigation.navigate("Home")}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4} color={"black"} />
                </TouchableOpacity>
            </View>
            {
                loading ? <ActivityIndicator size="large" color="black" style={{ marginTop: hp(10) }} /> : <View className="px-4 flex justify-between space-y-4 pt-8">
                    <View className="space-y-2">
                        <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                            {allRecipes?.strMeal}
                        </Text>

                        <Text style={{ fontSize: hp(2) }} className="font-bold flex-1 text-neutral-700">
                            {allRecipes?.strArea}
                        </Text>
                    </View>
                </View>
            }

            {/* Ingredients */}
            {
                !loading && <View className="space-y-2 ml-4 mt-2">
                    <Text style={{ fontSize: hp(2.3) }} className="font-semibold text-neutral-700 mt-4">Ingredients</Text>
                    <View className="space-y-2 ">
                        {
                            ingredientsAvail(allRecipes).map(i => {
                                return (
                                    <View key={i}>

                                        <View className="flex-row space-x-2 items-center">
                                            <View>
                                                <CheckCircleIcon size={hp(1.6)} strokeWidth={4} color={"gray"} />

                                            </View>
                                            <Text style={{ fontSize: hp(1.7) }} className="font-semibold">{allRecipes['strMeasure' + i]}</Text>
                                            <Text style={{ fontSize: hp(1.7) }} className="font-semibold">{allRecipes['strIngredient' + i]}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <Text style={{ fontSize: hp(2.3) }} className="font-semibold text-neutral-700 mt-4">Instructions</Text>
                    <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-700 mt-4">{
                        allRecipes.strInstructions
                    }</Text>
                </View>
            }



        </ScrollView>
    )
}