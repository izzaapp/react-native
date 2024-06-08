import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { s } from 'react-native-wind';

function Login() {
    return (
        <View style={s`bg-white w-full h-full`}>
            <View style={s`justify-center flex-auto px-10`}>
                <Text style={s`text-3xl font-bold mb-6`}>Login</Text>
                <Text style={s`mb-2 text-black text-xl font-bold text-left`}>Email</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Username"
                />
                <Text style={s`mb-2 text-black text-xl font-bold text-left`}>Password</Text>
                <TextInput
                    style={s`p-3 mb-4 bg-white rounded-xl border border-gray-400`}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={s`bg-blue-400 py-3 rounded-xl`}
                    onPress={() => console.log("Login pressed")}
                >
                    <Text style={s`text-white font-semibold text-center font-bold text-2xl`}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;
