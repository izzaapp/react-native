import React from "react";
import { View, Text, Button, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const navigation = useNavigation();

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

    return (
        <ScrollView>
            <View className="flex-1 bg-gray-100 space-y-5">
                <View className="p-10 bg-red-600 rounded-b-3xl space-y-8">
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
                                    <Text className="text-xl font-extrabold text-black">Flit Coffe</Text>
                                </View>
                                <TouchableOpacity className="p-1 rounded-xl border-2 border-black">
                                    <Text className="text-center text-lg text-black px-2 font-semibold my-auto">
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text className="text-lg font-light text-black">Jl. Anjasmoro Raya No.42</Text>
                            <Text className="text-lg font-light text-black">Buka, 07.00 - 21.00 WIB</Text>
                            <Text className="text-lg font-light underline text-black">Hubungi WhatsApp</Text>
                        </View>
                    </View>
                </View>
                <View className="w-1/2 mx-auto">
                    <TouchableOpacity
                        className="p-2 bg-red-600 rounded-xl"
                        onPress={handleLogout}>
                        <Text className="text-lg text-center my-auto font-bold text-white">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
