import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, ScrollView, RefreshControl, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    const [user, setUser] = useState({});
    const [profil, setProfil] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [showAllLines, setShowAllLines] = useState(false); // Step 1: State to track whether to show all lines
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem("jwtToken");
            if (!token) {
                return Alert.alert("No token found", "You are not logged in.");
            }
            const response = await axios.post("https://admin.beilcoff.shop/api/logout", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                await AsyncStorage.removeItem("jwtToken");
                navigation.navigate("Login");
            } else {
                Alert.alert("Logout failed", response.data.message);
            }
        } catch (error) {
            Alert.alert("Logout error", error.response?.data?.message || "Something went wrong");
        }
    };

    const navigateToMenu = () => {
        navigation.navigate('Menu');
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    useEffect(() => {
        const fetchData = async (endpoint, setState) => {
            try {
                const token = await AsyncStorage.getItem("jwtToken");
                if (!token) {
                    return Alert.alert("Unauthorized", "Please log in to access this page.");
                }

                const response = await axios.get(`https://admin.beilcoff.shop/api/${endpoint}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setState(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    Alert.alert("Unauthorized", "Please log in to access this page.");
                } else {
                    console.error("Error fetching data:", error);
                    Alert.alert("Error", `Failed to fetch ${endpoint} data. Please try again later.`);
                }
            }
        };

        fetchData("profil", setProfil);
        fetchData("user", setUser);
    }, []);

    const editProfile = (id) => {
        navigation.navigate('Editprofil', { id });
    };

    const toggleLines = () => {
        setShowAllLines(!showAllLines); // Step 2: Toggle the state
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className="flex-1 bg-gray-100 space-y-5">
                <View className="p-8 bg-red-600 rounded-b-3xl space-y-4">
                    <View>
                        <Text className="text-center text-3xl font-semibold text-white">Beilcoff</Text>
                        <Text className="text-center text-lg font-semibold text-white">Semangat Bekerja, {user.name}</Text>
                    </View>
                    {profil && profil.map((profile, index) => (
                        <View key={index} className="bg-white rounded-xl p-4 space-y-2">
                            <View className="flex-row justify-between">
                                <View className="my-auto">
                                    <Text className="text-xl font-extrabold text-black">{profile.name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={toggleLines}> 
                                <Text
                                    numberOfLines={showAllLines ? undefined : 1}
                                    style={{ fontSize: 16, fontWeight: 'thin', color: 'black' }}>
                                    {profile.alamat}
                                </Text>

                            </TouchableOpacity>
                            <Text className="text-base font-base text-black">{profile.jam}</Text>
                            <Text className="text-base font-base underline text-black">{profile.no_wa}</Text>
                        </View>
                    ))}
                    <View className="flex-row justify-between">
                        <View className="my-auto">
                            <Text className="text-center text-lg text-white font-bold">Shift</Text>
                        </View>
                            <Text className="text-center text-lg text-white font-semibold my-auto">Afy</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <View className="my-auto">
                            <Text className="text-center text-lg text-white font-bold">Total Pendapatan</Text>
                            <Text className="text-center text-lg text-white font-bold">Rp.2.500.000,00</Text>
                        </View>
                        <TouchableOpacity className="p-1.5 rounded-xl my-auto bg-green-400">
                            <Text className="text-center text-lg text-white font-semibold my-auto">Settlement</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View className="mx-4">
                    <TouchableOpacity className="p-4 bg-yellow-500 rounded-xl" onPress={handleLogout}>
                        <Text className="text-lg text-center my-auto font-bold text-white">Shift</Text>
                    </TouchableOpacity>
                </View>
                <View className="mx-4">
                    <TouchableOpacity className="p-4 bg-blue-500 rounded-xl" onPress={handleLogout}>
                        <Text className="text-lg text-center my-auto font-bold text-white">Create Order</Text>
                    </TouchableOpacity>
                </View>
                <View className="p-4">
                    <View className="rounded-2xl bg-red-600 p-3 space-y-4">
                        <View className="flex-row justify-around">
                            <TouchableOpacity onPress={navigateToMenu} className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={navigateToMenu} className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">History</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={navigateToMenu} className="p-1 rounded-xl">
                                <Image className="w-8 h-8 mx-auto" source={require('../assets/menu.png')} />
                                <Text className="text-center text-lg text-white font-semibold my-auto">Setting</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="mx-4">
                    <TouchableOpacity className="p-4 bg-red-600 rounded-xl" onPress={handleLogout}>
                        <Text className="text-lg text-center my-auto font-bold text-white">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
