import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { categoryData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated';



export default function Catagory({ categories, activeCatagory, handleChangeCategory }) {
    // console.log(categories)

    return (
        <Animated.View entering={FadeInDown.duration(500).springify()} className="px-2">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 15 }}
                className="space-x-4"
            >
                {

                    categories?.length > 0 && categories.map((item, index) => {
                        let isActive = item.strCategory == activeCatagory
                        let activeButton = isActive ? "bg-emerald-200" : "bg-black/10"
                        return <TouchableOpacity
                            key={index}
                            className="flex items-center space-y-1 "
                            onPress={() => handleChangeCategory(item?.strCategory)}

                        >
                            <View className={`p-[6px] mt-6 rounded-full ${activeButton}`}>
                                <Image
                                    source={{ uri: item.strCategoryThumb }}
                                    style={{ height: hp(6), width: wp(12) }}
                                    className="rounded-full "
                                    resizeMode='cover'
                                />

                            </View>
                            <Text className="text-neutral-600" style={{ fontSize: hp(1.8) }}>{item.strCategory}</Text>
                        </TouchableOpacity>
                    })
                }


            </ScrollView>
        </Animated.View>
    )
}