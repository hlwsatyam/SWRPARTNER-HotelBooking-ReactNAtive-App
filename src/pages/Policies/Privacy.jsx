import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import BackNavigation from "../../components/tabs/BackNavigation";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackNavigation
        navigation={navigation}
        styleForFullComp="bg-slate-400 px-2 py-2 flex-row items-center gap-x-3"
        styleForTitle={"text-sm font-semibold"}
        title={"Privacy And Policy"}
      />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          At Relive, we are committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and disclose your information
          when you use our mobile application.
        </Text>
        <Text style={styles.subheading}>Information We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect various types of information from you when you use
          Relive, including:
        </Text>
        <Text style={styles.listItem}>
          - Personal Information: such as your name, email address, and contact
          details.
        </Text>
        <Text style={styles.listItem}>
          - Device Information: such as your device type, operating system, and
          unique device identifiers.
        </Text>
        <Text style={styles.listItem}>
          - Usage Information: such as your interactions with the app, including
          gameplay data, preferences, and settings.
        </Text>
        <Text style={styles.paragraph}>
          We may collect this information directly from you or automatically
          through the use of cookies and similar tracking technologies.
        </Text>
        <Text style={styles.subheading}>How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We may use the information we collect from you for various purposes
          related to providing and improving Relive, including:
        </Text>
        <Text style={styles.listItem}>
          - To provide and maintain our services, including enabling you to play
          games and interact with other users.
        </Text>
        <Text style={styles.listItem}>
          - To personalize your experience and improve our app's functionality
          and performance.
        </Text>
        <Text style={styles.listItem}>
          - To communicate with you, respond to your inquiries, and send you
          updates and notifications related to Relive.
        </Text>
        <Text style={styles.paragraph}>
          We may also use your information for other purposes as required or
          permitted by law, or as disclosed to you at the time of collection.
        </Text>
        {/* Add more sections as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
});

export default PrivacyPolicy;
