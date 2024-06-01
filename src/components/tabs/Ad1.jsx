import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Ad1 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Your Hotel with Us!</Text>
      <Text style={styles.description}>
        Join thousands of hotels already benefiting from our platform. Increase
        your visibility, bookings, and revenue!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("addHotel")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
        <Text style={styles.arrow}>➡️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    marginTop: 23,
    borderRadius: 10,
    alignItems: "center",
  },
  ownerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  arrow: {
    color: "white",
    fontSize: 20,
  },
});

export default Ad1;
