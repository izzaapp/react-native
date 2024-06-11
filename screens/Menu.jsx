import React, { useState, useCallback, useEffect } from "react";
import {View,Text,ScrollView,RefreshControl,Alert,TouchableOpacity,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Menu() {
    const [menu, setMenu] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const navigateAddmenu = () => {
        navigation.navigate('Addmenu');
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchMenu().finally(() => setRefreshing(false));
    }, []);

    const fetchMenu = async () => {
        try {
            const token = await AsyncStorage.getItem("jwtToken");
            if (!token) {
                return Alert.alert("Unauthorized", "Please log in to access this page.");
            }

            const response = await axios.get("https://api.beilcoff.shop/api/menus", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMenu(response.data.menus);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const handleError = (error) => {
        if (error.response && error.response.status === 401) {
            Alert.alert("Unauthorized", "Please log in to access this page.");
        } else {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to fetch menu data. Please try again later.");
        }
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className="flex-1 bg-gray-100 space-y-5">
                <View className="p-8 bg-red-600 rounded-b-3xl space-y-6">
                    <View>
                        <Text className="text-center text-2xl font-semibold text-white">Menu</Text>
                    </View>
                </View>
                <View className="mx-10 ">
                    <TouchableOpacity onPress={navigateAddmenu} className="bg-green-500 p-4 rounded-xl">
                        <Text className="text-lg text-white font-semibold text-center">Add Menu</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {menu.length > 0 ? (
                        menu.map((item, index) => (
                            <View key={index} className="p-4 bg-white m-4 rounded-lg shadow-md">
                                <Text className="text-lg font-bold">{item.name}</Text>
                                <Text className="text-gray-800">${item.price}</Text>
                            </View>
                        ))
                    ) : (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-gray-600">No menu items available.</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

export default Menu;
