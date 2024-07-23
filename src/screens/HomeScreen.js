import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    BellIcon
} from "react-native-heroicons/outline";
import Animated from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Catagory from '../components/Catagory';
import axios from 'axios';
import Recipes from '../components/Recipes';
// import Catagories from '../components/catagories';

export default function HomeScreen() {
    const [activeCatagory, setActiveCatagory] = useState("Beef")
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])


    useEffect(() => {
        getCategories()
        getMeals()
    }, [])

    const handleChangeCategory = (category) => {
        getMeals(category)
        setActiveCatagory(category)
        setMeals([])
    }

    const getCategories = async () => {
        try {
            const res = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            if (res && res.data) {
                setCategories(res?.data?.categories)
            }
        } catch (error) {
            console.log("err" + error)
        }
    }


    const getMeals = async (category = "Beef") => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (error) {
            console.log(error.message);
        }
    };



    return (
        <View className="flex-1 bg-white">
            <StatusBar style='dark' />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-14 "

            >
                <View className="mx-4 flex-row justify-between items-center mb-2">
                    <Image source={require("../../assets/images/pp.jpg")}
                        style={{
                            height: hp(5),
                            width: wp(10),
                        }}
                        className="rounded-full"
                    />
                    <View>
                        <BellIcon size={hp(4)} color="gray" />
                    </View>
                </View>

                {/* heading */}
                <View className="mx-4 space-y-2 mb-2">
                    <Text
                        style={{ fontSize: hp(2) }}
                        className="text-neutral-600 font-semibold">Hello, User</Text>
                    <View >
                        <Text style={{ fontSize: hp(3.2) }} className="font-semibold text-neutral-600">Cook your own <Text className="text-emerald-800 ">dishes</Text> </Text>

                    </View>
                </View>

                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput placeholder='Search  recipe'
                        style={{ fontSize: hp(1.8) }}
                        placeholderTextColor={"gray"}
                        className="pl-3 tracking-wider mb-1 flex-1 text-base"
                    />
                    <View className="rounded-full bg-white p-3">
                        <MagnifyingGlassIcon color={"gray"} size={hp(2.8)} strokeWidth={3} />
                    </View>
                </View>

                {/* catagories */}
                <Catagory categories={categories} activeCatagory={activeCatagory} handleChangeCategory={handleChangeCategory} />
                <Recipes categories={categories} meals={meals} />

            </ScrollView>

        </View>
    )
}