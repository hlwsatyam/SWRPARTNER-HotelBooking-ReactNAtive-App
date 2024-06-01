import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import BackNavigation from '../../components/tabs/BackNavigation';
 

const HelpSupport = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackNavigation
        navigation={navigation}
        styleForFullComp="bg-slate-400 px-2 py-2 flex-row items-center gap-x-3"
        styleForTitle={'text-sm'}
        title={"Help And Support "}
      />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Frequently Asked Questions (FAQs)</Text>
          <Text style={styles.text}>
            Q: How do I start a game in relive app?
          </Text>
          <Text style={styles.text}>
            A: To start a game, navigate to the Games section from the main menu, select the desired game (e.g., Ludo), and follow the on-screen instructions to start or join a game session.
          </Text>
          <Text style={styles.text}>
            Q: Can I invite friends to play games with me?
          </Text>
          <Text style={styles.text}>
            A: Yes, you can invite friends to play games with you by sending them game invites through the app's invitation feature. Simply select the 'Invite Friends' option within the game lobby and choose the friends you want to invite.
          </Text>
          {/* Add more FAQs as needed */}
          <Text style={styles.heading}>Technical Support</Text>
          <Text style={styles.text}>
            If you encounter any technical issues while using the relive app, please contact our support team at support@reliveapp.com for assistance. Our dedicated support staff will help resolve your issues promptly.
          </Text>
          <Text style={styles.heading}>Community Forums</Text>
          <Text style={styles.text}>
            Join our community forums to connect with other relive app users, share tips and strategies for playing games, and discuss new features and updates. Our forums provide a platform for users to engage in meaningful discussions and support each other.
          </Text>
          <Text style={styles.heading}>Privacy and Safety</Text>
          <Text style={styles.text}>
            At relive, we prioritize the privacy and safety of our users. We adhere to strict privacy policies and security measures to ensure that your personal information remains protected. If you have any concerns about privacy or safety, please reach out to our support team for assistance.
          </Text>
          <Text style={styles.heading}>Feedback and Suggestions</Text>
          <Text style={styles.text}>
            We value your feedback and suggestions! If you have any ideas for improving the relive app or if you encounter any issues while using it, please let us know. Your feedback helps us make the app better for everyone.
          </Text>
          {/* Add more support sections as needed */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: 44,
    backgroundColor: '#FFFFFF', // Adjust background color as needed
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default HelpSupport;
