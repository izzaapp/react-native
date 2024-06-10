import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    Button,
    Alert,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const handleLogout = async () => {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
            try {
                const response = await axios.post(
                    "https://admin.beilcoff.shop/api/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    await AsyncStorage.removeItem("jwtToken");
                    navigation.navigate("Login");
                } else {
                    Alert.alert("Logout failed", response.data.message);
                }
            } catch (error) {
                Alert.alert(
                    "Logout error",
                    error.response?.data?.message || "Something went wrong"
                );
            }
        } else {
            Alert.alert("No token found", "You are not logged in.");
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View className="flex-1 bg-gray-100 space-y-5">
                <View className="p-6 bg-red-600 rounded-b-3xl space-y-6">
                    <View>
                        <Text className="text-center text-2xl font-semibold text-white">
                            Beilcoff
                        </Text>
                        <Text className="text-center text-lg font-semibold text-white">
                            Welcome, Afy
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <View className="my-auto">
                            <Text className="text-center text-lg text-white font-bold">
                                Total Pendapatan
                            </Text>
                            <Text className="text-center text-lg text-white font-bold">
                                Rp.2.500.000,00
                            </Text>
                        </View>
                        <TouchableOpacity className="p-1.5 rounded-xl border-2 border-white my-auto">
                            <Text className="text-center text-lg text-white font-semibold my-auto">
                                Settlement
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View className="bg-white rounded-xl p-4">
                            <View className="flex-row justify-between">
                                <View className="my-auto">
                                    <Text className="text-xl font-extrabold text-black">
                                        Flit Coffe
                                    </Text>
                                </View>
                                <TouchableOpacity className="p-1 rounded-xl border-2 border-black">
                                    <Text className="text-center text-lg text-black px-2 font-semibold my-auto">
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text className="text-lg font-light text-black">
                                Jl. Anjasmoro Raya No.42
                            </Text>
                            <Text className="text-lg font-light text-black">
                                Buka, 07.00 - 21.00 WIB
                            </Text>
                            <Text className="text-lg font-light underline text-black">
                                Hubungi WhatsApp
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="mx-4">
                    <TouchableOpacity
                        className="p-4 bg-blue-500 rounded-xl"
                        onPress={handleLogout}>
                        <Text className="text-lg text-center my-auto font-bold text-white">
                            Create Order
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="p-4">
                    <View className="rounded-2xl bg-red-600 p-2 space-y-4">
                        <View className="flex-row justify-around ">
                            <TouchableOpacity className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">
                                    Menu
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">
                                    Order
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">
                                    History
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-around ">
                            <TouchableOpacity className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">
                                    Menu
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">
                                    Menu
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">
                                    Menu
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="mx-4">
                    <TouchableOpacity
                        className="p-2 bg-red-600 rounded-xl"
                        onPress={handleLogout}>
                        <Text className="text-lg text-center my-auto font-bold text-white">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
