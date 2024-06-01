import {View, Text, Animated, Image, Easing} from 'react-native';
import React, {useEffect} from 'react';
import logo from '../../../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
const Splash = ({navigation}) => {
  const textAnimation = new Animated.Value(0); // Initial animation value
  const scaleAnimation = new Animated.Value(0); // Initial scale value

  useEffect(() => {
    // Sequence animation for text: fade in, scale up, and bounce
    Animated.sequence([
      // Step 1: Fade in animation
      Animated.timing(textAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // Step 2: Scale up animation
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      // Step 3: Bounce animation
      Animated.spring(scaleAnimation, {
        toValue: 1.1,
        friction: 0.3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  useFocusEffect(() => {
    const timeoutId = setTimeout(async () => {
      const isLoggedIn = await AsyncStorage.getItem('token');
      if (isLoggedIn) {
        return navigation.navigate('home');
      } else {
        return navigation.navigate('login');
      }
    }, 1000); // Specify the timeout duration in milliseconds
    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }); // Empty dependency array ensures the effect runs only once

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#003366',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={logo} />
      <Animated.Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 32,
          opacity: textAnimation,
          transform: [{scale: scaleAnimation}],
        }}>
        Welcome To Swr Partner
      </Animated.Text>
    </View>
  );
};

export default Splash;
