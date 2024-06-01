import axios from 'axios';

import React, {useEffect, useState} from 'react';
import asyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {baseApiURL} from '../../components/Variable';
import LoadingButton from '../../components/tabs/LoadingButton';
import {useFocusEffect} from '@react-navigation/native';
export default function App({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(null);
    await axios
      .post(`${baseApiURL}/api/v1/users`, {
        email,
        password,
      })
      .then(async res => {
        if (res.status == 200) {
          await asyncStorage.setItem('token', res.data.token);
          setIsLoading(false);
          navigation.navigate('home');
        } else {
          setIsError(res.data.message);
          setIsLoading(true);
        }
      })
      .catch(err => {
        setIsError('Something Went Worng!');
        setIsLoading(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Exit the app when the hardware back button is pressed
        navigation.reset({index: 0, routes: [{name: 'splash'}]});
        BackHandler.exitApp();
        return true; // Return true to prevent default behavior (going back)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Remove event listener when the screen loses focus or unmounts
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/logo.png')}
      />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>
      {isError && (
        <Text className="text-center mb-3 text-red-700 font-semibold">
          {isError}
        </Text>
      )}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('createAccount')}>
        <Text>Create One Account For Your Hotel ?</Text>
      </TouchableOpacity>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  loginText: {
    color: 'white',
    fontWeight: '600',
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 9,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
