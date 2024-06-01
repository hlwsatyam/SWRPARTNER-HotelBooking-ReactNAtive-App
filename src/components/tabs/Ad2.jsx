import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Ad2 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why Choose Us?</Text>
      <View style={styles.feature}>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>Wide Selection</Text>
          <Text style={styles.featureDescription}>
            Choose from a vast range of hotels worldwide.
          </Text>
        </View>
      </View>
      <View style={styles.feature}>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>Easy Booking</Text>
          <Text style={styles.featureDescription}>
            Simple and secure booking process in just a few clicks.
          </Text>
        </View>
      </View>
      <View style={styles.feature}>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>Best Deals</Text>
          <Text style={styles.featureDescription}>
            Find exclusive deals and discounts for your stay.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HelpAndSupport")}
      >
        <Text style={styles.buttonText}>Start Exploring</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Ad2;
