import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { s } from "react-native-wind";


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

    return (
        <View style={s`p-5 h-full w-full bg-gray-200`}>
            <View style={s`justify-center flex-1`}>
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
            </View>
        </View>
    );
}