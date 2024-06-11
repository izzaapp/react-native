
import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, ScrollView, RefreshControl, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

function Addmenu() {
    const [refreshing, setRefreshing] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [description, setDescription] = useState('');
    const navigation = useNavigation(); // Initialize navigation

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Permission to access media library is required!');
        }
    };

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Permission to access media library is required!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log('ImagePicker result:', result);

            if (!result.cancelled && result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                console.log('Selected image URI:', selectedImage.uri);
                setImage(selectedImage.uri);
                console.log('Image state updated:', image);
            } else {
                console.log('No image selected or URI undefined');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'An error occurred while picking the image');
        }
    };

    const getToken = async () => {
        return await AsyncStorage.getItem('jwtToken');
    };

    const handleSubmit = async () => {
        if (!image) {
            Alert.alert('Error', 'Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('img', {
            uri: image,
            type: 'image/jpeg',
            name: 'menu-image.jpg'
        });
        formData.append('description', description);

        try {
            const token = await getToken();
            if (!token) {
                Alert.alert('Error', 'No authentication token found');
                return;
            }

            const response = await axios.post('https://api.beilcoff.shop/api/menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                Alert.alert('Success', 'Product successfully created!');
                setImageUrl(response.data.imgUrl);
                setName('');
                setPrice('');
                setImage(null);
                setDescription('');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to create product');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while creating the product');
        }
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={setRefreshing} />
            }>
            <View className="flex-1 bg-gray-100 space-y-5">
                <View className="p-8 bg-red-600 rounded-b-3xl space-y-6">
                    <View>
                        <Text className="text-center text-2xl font-semibold text-white">
                            Add Menu
                        </Text>
                    </View>
                </View>
                <View className="p-3 space-y-3">
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Nama Menu :</Text>
                        <TextInput
                            className="border-2 p-3 rounded-xl"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Harga Menu :</Text>
                        <TextInput
                            className="border-2 p-3 rounded-xl"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                        />
                    </View>
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Foto Menu :</Text>
                        <TouchableOpacity className="border-2 p-3 rounded-xl" onPress={pickImage}>
                            <Text className="text-lg text-center font-light">{image ? 'Image Selected' : 'Pick an image'}</Text>
                        </TouchableOpacity>
                        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
                    </View>
                    <View className="space-y-1">
                        <Text className="text-lg font-semibold">Deskripsi Menu :</Text>
                        <TextInput
                            className="border-2 p-3 rounded-xl"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                    <TouchableOpacity
                        className="p-2 bg-blue-500 rounded-xl"
                        onPress={handleSubmit}>
                        <Text className="text-center text-white font-bold text-lg">Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default Addmenu;
