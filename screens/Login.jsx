import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://admin.beilcoff.shop/api/login', {
                email,
                password,
            });

            if (response.data.success) {
                await AsyncStorage.setItem('jwtToken', response.data.token);
                navigation.navigate('Home');
            } else {
                Alert.alert('Login failed', response.data.message);
            }
        } catch (error) {
            Alert.alert('Login error', error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
        });

        return unsubscribe;
    }, [navigation]);

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <KeyboardAvoidingView className="flex-1" behavior="padding">
            <View className="bg-red-900 w-full h-full justify-center px-10">
                <Text className="text-6xl text-yellow-200 font-bold mb-2">BeilCoff</Text>
                <Text className="text-4xl text-white font-bold">Login</Text>
                <Text className="text-xl text-white font-light mb-4">Sign in to continue</Text>
                <Text className="mb-2 text-white text-xl font-semibold text-left">Email</Text>
                <TextInput
                    className="p-3 mb-4 bg-white rounded-xl border border-gray-400"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text className="mb-2 text-white text-xl font-semibold text-left">Password</Text>
                <TextInput
                    className="p-3 mb-4 bg-white rounded-xl border border-gray-400"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View className="flex-row justify-between mb-4">
                    <Text className="text-white text-lg font-light text-left">Don't have an account?</Text>
                    <TouchableOpacity onPress={navigateToRegister}>
                        <Text className="text-blue-400 text-lg font-light text-left underline">Register</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex items-center">
                    <TouchableOpacity
                        className="border-4 border-yellow-200 p-2 w-3/4 rounded-3xl"
                        onPress={handleLogin}
                    >
                        <Text className="text-white text-center font-extrabold text-2xl">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Login;
