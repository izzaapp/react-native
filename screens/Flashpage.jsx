import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Flashpage() {
    const navigation = useNavigation();

    const openGoogle = () => {
        Linking.openURL('https://admin.beilcoff.shop/');
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };


    return (
        <View className="flex-1 bg-red-900 w-full h-full justify-center px-10 space-y-5">
            <View>
                <Text className="text-6xl text-yellow-200 font-bold">BeilCoff</Text>
            </View>
            <View>
                <Text className="text-4xl text-white font-bold">Login</Text>
                <Text className="text-xl text-white font-light">As</Text>
                <View className="flex-row justify-between p-6">
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openGoogle}>
                        <Text className="text-xl font-extrabold text-white p-2">Back Office</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={navigateToLogin}>
                        <Text className="text-xl font-extrabold text-white p-2">Cashier</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 4,
        borderColor: "#fff59d",
        borderRadius: 20,
        padding: 7,
        marginHorizontal: 16,
        width: "auto",
    },
});

export default Flashpage;
