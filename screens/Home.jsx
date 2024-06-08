import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://custom.beilcoff.shop/api/categories"
                );

                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => { };
    }, []);

    const handleLogout = async () => {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
            try {
                const response = await axios.post('https://admin.beilcoff.shop/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    await AsyncStorage.removeItem('jwtToken');
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Logout failed', response.data.message);
                }
            } catch (error) {
                Alert.alert('Logout error', error.response?.data?.message || 'Something went wrong');
            }
        } else {
            Alert.alert('No token found', 'You are not logged in.');
        }
    };

    return (
        <View className="p-5 h-full w-full bg-gray-200">
            <View className="justify-center flex-1">
                <Text>Home</Text>
                <Button
                    title="Go to About"
                    onPress={() => navigation.navigate("About")}
                />
                {categories.map((category) => (
                    <View key={category.id}>
                        <Text>{category.category}</Text>
                        {category.posts.map((post) => (
                            <View key={post.id}>
                                <Text>{post.judul}</Text>
                                <Text>{post.content}</Text>
                            </View>
                        ))}
                    </View>
                ))}
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    color="red"
                />
            </View>
        </View>
    );
}
