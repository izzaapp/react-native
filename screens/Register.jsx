import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { s } from 'react-native-wind';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://admin.beilcoff.shop/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });

            if (response.data.success) {
                Alert.alert('Registration successful', `Welcome, ${response.data.user.name}`);
                navigation.navigate('Login');
            } else {
                Alert.alert('Registration failed', response.data.error.message);
            }
        } catch (error) {
            Alert.alert('Registration error', 'Something went wrong');
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView style={s`flex-1`} behavior="padding">
            <View style={s`bg-red-900 w-full h-full justify-center px-10`}>
                <Text style={s`text-6xl text-yellow-200 font-bold mb-2`}>BeilCoff</Text>
                <Text style={s`text-4xl text-white font-bold`}>Registration</Text>
                <Text style={s`text-xl text-white font-light mb-4`}>Create new account</Text>
                <Text style={s`mb-2 text-white text-xl font-semibold text-left`}>Name</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={s`mb-2 text-white text-xl font-semibold text-left`}>Email</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={s`mb-2 text-white text-xl font-semibold text-left`}>Password</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Text style={s`mb-2 text-white text-xl font-semibold text-left`}>Password Confirmation</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Password Confirmation"
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry={true}
                />
                <View style={s`flex-row justify-between mb-4`}>
                    <Text style={s`text-white text-lg font-light text-left`}>Already have an account?</Text>
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={s`text-blue-400 text-lg font-light text-left underline`}>Login here</Text>
                    </TouchableOpacity>
                </View>
                <View style={s`flex items-center`}>
                    <TouchableOpacity
                        style={s`border-4 border-yellow-200 p-2 w-3/4 rounded-3xl`}
                        onPress={handleRegister}
                    >
                        <Text style={s`text-white font-semibold text-center font-extrabold text-2xl`}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
}

export default Register;
