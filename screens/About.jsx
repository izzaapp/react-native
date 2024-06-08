import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { s } from "react-native-wind";

export default function About() {
    const navigation = useNavigation();
    return (
        <View style={s`p-5 w-full h-full bg-red-500`}>
            <View></View>
            <Text>About</Text>
            <Button title="go home" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}