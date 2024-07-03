import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import { Appbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

function Profile() {
  const [profile, setProfile] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        Alert.alert("Unauthorized", "Please log in to access this page.");
        return;
      }

      const response = await axios.get("https://admin.beilcoff.shop/api/profil", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);  // Log the entire response

      if (response.data && Array.isArray(response.data)) {
        setProfile(response.data[0]);
      } else {
        console.log("No profile found");
        setProfile([]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 401) {
      Alert.alert("Unauthorized", "Please log in to access this page.");
    } else {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch history data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const renderData = () => {
    const properties = Object.keys(profile);

    const dataElements = properties.map((property, index) => (
      <View key={index} style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{property.replace('_', ' ')}</Text>
          <Text style={styles.cardCategory}>{profile[property]}</Text>
        </View>
      </View>
    ));

    return dataElements;
  };

  return (
    <>
      <Appbar.Header className="rounded-b-xl">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <View className="flex-1 bg-gray-100 space-y-5">
          {renderData()}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#131313',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f7f7f',
  },
  cardPrice: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: '700',
    color: '#2c9d3b',
  },
});

export default Profile
