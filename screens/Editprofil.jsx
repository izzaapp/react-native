import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Editprofil = ({ route, navigation }) => {
    const { id } = route.params;
    const [name, setName] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jam, setJam] = useState('');
    const [noWa, setNoWa] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [token, setToken] = useState(null);
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const getToken = async () => {
            const storedToken = await AsyncStorage.getItem("jwtToken");
            if (storedToken) {
                setToken(storedToken);
            } else {
                Alert.alert("Unauthorized", "Please log in to access this page.");
                navigation.navigate("Login");
            }
        };

        getToken();
    }, []);

    const handleUpdate = () => {
        if (!name || !alamat || !jam || !noWa || !deskripsi) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        const updatedProfile = {
            name,
            alamat,
            jam,
            no_wa: noWa,
            deskripsi,
        };

        axios.put(`https://api.beilcoff.shop/api/profil/${id}`, updatedProfile, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
            .then(response => {
                console.log('Profile updated successfully:', response.data);
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                Alert.alert('Error', 'An error occurred while updating profile');
            });
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View className="flex-1 bg-gray-100 space-y-5">
                <View className="p-8 bg-red-600 rounded-b-3xl space-y-6">
                    <View>
                        <Text className="text-center text-2xl font-semibold text-white">
                            Edit Profil
                        </Text>
                    </View>
                </View>
                <View className="p-3 space-y-3">
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Nama :</Text>
                        <TextInput
                            className="border-2 p-3 rounded-xl"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Alamat :</Text>
                        <TextInput
                            className="border-2 p-3 rounded-xl"
                            value={alamat}
                            onChangeText={setAlamat}
                        />
                    </View>
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Jam Buka :</Text>
                        <TextInput
                            className="border-2 p-3 rounded-xl"
                            value={jam}
                            onChangeText={setJam}
                        />
                    </View>
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">No Whatsapp :</Text>
                        <TextInput
                            className="border-2 p-3 rounded-xl"
                            value={noWa}
                            onChangeText={setNoWa}
                        />
                    </View>
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Deskripsi :</Text>
                        <TextInput
                            className="border-2 p-3 h-64 rounded-xl"
                            value={deskripsi}
                            onChangeText={setDeskripsi}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"

                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleUpdate}
                        className="p-2 bg-blue-500 rounded-xl"
                    >
                        <Text className="text-center text-white font-bold text-lg">Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Editprofil;
