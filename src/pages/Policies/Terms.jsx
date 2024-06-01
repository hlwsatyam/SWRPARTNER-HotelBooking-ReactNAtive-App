import { View, Text, StyleSheet } from "react-native";
import React from "react";
 
import { ScrollView } from "react-native";
import BackNavigation from "../../components/tabs/BackNavigation";

const TermsConditions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackNavigation
        navigation={navigation}
        styleForFullComp="bg-slate-400 px-2 py-2 flex-row items-center gap-x-3"
        styleForTitle={"text-sm font-semibold"}
        title={"Terms And Conditions"}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Terms and Conditions</Text>
        <Text style={styles.paragraph}>
          By accessing and using the Relive mobile application, you agree to
          abide by these terms and conditions. If you do not agree with any part
          of these terms, you must not use the app.
        </Text>
        <Text style={styles.subheading}>Use of Content</Text>
        <Text style={styles.paragraph}>
          The content provided in the Relive app, including but not limited to
          images, text, and audio/video files, is for informational and
          entertainment purposes only. You may not reproduce, distribute, or
          modify any content without prior authorization.
        </Text>
        <Text style={styles.subheading}>User Conduct</Text>
        <Text style={styles.paragraph}>
          You agree to use the Relive app in compliance with applicable laws and
          regulations. You must not engage in any conduct that may disrupt the
          functioning of the app or infringe upon the rights of others.
        </Text>
        <Text style={styles.subheading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Our Privacy Policy governs the collection, use, and disclosure of
          personal information provided by users of the Relive app. By using the
          app, you consent to the terms outlined in the Privacy Policy.
        </Text>
        <Text style={styles.subheading}>Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All intellectual property rights associated with the Relive app,
          including but not limited to trademarks, logos, and software, are
          owned by [Your Company Name] and protected by applicable laws.
        </Text>
        <Text style={styles.subheading}>Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Relive shall not be liable for any indirect, incidental, special, or
          consequential damages arising out of or in connection with the use of
          the Relive app, even if advised of the possibility of such damages.
        </Text>
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
  content: {
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
});

export default TermsConditions;
