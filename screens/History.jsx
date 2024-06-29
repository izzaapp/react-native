import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import { Appbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

function History() {
    const [history, setHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    const fetchHistory = async () => {
        try {
            const token = await AsyncStorage.getItem("jwtToken");
            if (!token) {
                Alert.alert("Unauthorized", "Please log in to access this page.");
                return;
            }

            const response = await axios.get("https://admin.beilcoff.shop/api/historys", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response:", response.data);  // Log the entire response

            if (response.data.history && Array.isArray(response.data.history)) {
                setHistory(response.data.history);
            } else {
                console.log("No history found");
                setHistory([]);
            }
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleError = (error) => {
        if (error.response && error.response.status === 401) {
            Alert.alert("Unauthorized", "Please log in to access this page.");
        } else {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to fetch history data. Please try again later.");
        }
    };

    return (
        <>
            <Appbar.Header className="rounded-b-xl">
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="History" />
            </Appbar.Header>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className="flex-1 bg-gray-100 space-y-5">
                {history.length > 0 ? (
                    <DataTable className="border-2">
                        <DataTable.Header className="">
                            <DataTable.Title><Text>No</Text></DataTable.Title>
                            <DataTable.Title><Text>Date</Text></DataTable.Title>
                            <DataTable.Title><Text>Order Id</Text></DataTable.Title>
                            <DataTable.Title><Text>Name</Text></DataTable.Title>
                            <DataTable.Title><Text>Chair</Text></DataTable.Title>
                            <DataTable.Title><Text>Order</Text></DataTable.Title>
                            <DataTable.Title><Text>Total</Text></DataTable.Title>
                            <DataTable.TitletaTable.Title><Text>Status</Text></DataTable.TitletaTable.Title>
                        </DataTable.Header>
                        {history.map((item, index) => (
                            <DataTable.Row className="" key={index}>
                                <DataTable.Cell><Text>{index + 1}</Text></DataTable.Cell>
                                <DataTable.Cell>
                                    <Text>{moment(item.created_at).format("MM/DD/YYYY")}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell><Text>{item.no_order}</Text></DataTable.Cell>
                                <DataTable.Cell><Text>{item.atas_nama}</Text></DataTable.Cell>
                                <DataTable.Cell><Text>{item.cart.user.name}</Text></DataTable.Cell>
                                <DataTable.Cell>{item.cart.total_amount}</DataTable.Cell>
                                <DataTable.Cell><Text>{item.status}</Text></DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                ) : (

                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-600">No history available.</Text>
                    </View>
                )}
            </View>
        </ScrollView>
        </>
    )
}

export default History
