import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import PrevNavigation from '../../components/tabs/PrevNavigation';
import axios from 'axios';
import {baseApiURL} from '../../components/Variable';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmallCardHotel from '../../components/tabs/SmallCardHotel';
import TouchableButton from '../../components/tabs/TouchableButton';
const AddHotel = ({navigation}) => {
  const [hotels, setHotels] = useState(null);
  const [isNewChange, setIsNewChange] = useState(false);

  useEffect(() => {
    fetData();
  }, [isNewChange]);
  useFocusEffect(
    React.useCallback(() => {
      fetData();
    }, []),
  );
  const fetData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(`${baseApiURL}/api/vi/allHotels/`, {
        token,
      });
      if (res.status == 200) {
        setHotels(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 bg-yellow-400 pt-10">
      <ScrollView>
        <PrevNavigation navigation={navigation} text={'Add Hotel'} />
        <Text className=" border-b-2 pb-2 mx-5 text-white text-center text-2xl font-bold">
          Your Hotels
        </Text>
        {hotels?.map((hotel, idx) => (
          <SmallCardHotel key={idx} navigation={navigation} item={hotel} />
        ))}
        {
          <View>
            <TouchableButton
              onPress={() => navigation.navigate('updateHotel')}
              label={'Add New Hotel'}
            />
          </View>
        }
      </ScrollView>
    </View>
  );
};

export default AddHotel;
