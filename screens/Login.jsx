import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { s } from 'react-native-wind';
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
                Alert.alert('Login successful', `Welcome, ${response.data.user.name}`);
                navigation.navigate('Home'); // Navigate to Home screen
            } else {
                Alert.alert('Login failed', response.data.message);
            }
        } catch (error) {
            Alert.alert('Login error', error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <View style={s`bg-white w-full h-full`}>
            <View style={s`justify-center flex-auto px-10 space-y-10`}>
                <Text style={s`text-3xl font-bold mb-6`}>Login</Text>
                <Text style={s`text-black text-xl font-bold text-left`}>Email</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={s`mb-2 text-black text-xl font-bold text-left`}>Password</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={s`bg-blue-400 py-3 rounded-xl`}
                    onPress={handleLogin}
                >
                    <Text style={s`text-white font-semibold text-center font-bold text-2xl`}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;
