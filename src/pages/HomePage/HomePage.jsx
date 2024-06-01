import {View, Text, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';

import FooterList from './Footer';
import asyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseApiURL} from '../../components/Variable';
import {ScrollView} from 'react-native-gesture-handler';
import Ad1 from '../../components/tabs/Ad1';
import Ad2 from '../../components/tabs/Ad2';
import {useFocusEffect} from '@react-navigation/native';

const HomePage = ({navigation}) => {
  const [hotelList, setHotelList] = useState();
  const [status, setStatus] = useState('Booking');
  useEffect(() => {
    fetchMyHotel();
  }, [status]);
  useFocusEffect(
    React.useCallback(() => {
      fetchMyHotel();
    }, []),
  );
  const fetchMyHotel = async () => {
    try {
      const token = await asyncStorage.getItem('token');
      const response = await axios.post(`${baseApiURL}/api/Owner/myBooking`, {
        token,
      });
      if (response.status == 200) {
        setHotelList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const backPressHandler = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backPressHandler);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
      };
    }, []), // Empty dependency array ensures that the effect runs only once when the component mounts
  );
  // const []
  return (
    <View className="flex-1 px-2 pt-8 bg-yellow-500 ">
      <ScrollView>
        <Text className="text-dark font-bold mb-5 text-3xl mt-2">
          Dashboard
        </Text>
        <CardForPaymentStatus hotelList={hotelList} />
        <CardForTotalPaymentStatus hotelList={hotelList} />
        <CardForCancelledStatus hotelList={hotelList} />
        <Ad1 />
        <Ad2 />
      </ScrollView>

      <FooterList
        navigation={navigation}
        className="flex-row bg-amber-300 py-4 rounded-2xl mt-auto justify-around "
      />
    </View>
  );
};
export default HomePage;
const CardForPaymentStatus = ({hotelList}) => {
  return (
    <View className="border rounded mt-4 bg-slate-600 p-2">
      <View className="p-4">
        <Text className="text-white">
          {' '}
          Total No Of Booking: {hotelList?.length}{' '}
        </Text>
      </View>
    </View>
  );
};
const CardForTotalPaymentStatus = ({hotelList}) => {
  const totalAmount = hotelList?.reduce(
    (acc, item) => acc + item?.roomId?.roomPrice,
    0,
  );
  return (
    <View className="border rounded mt-4 bg-slate-600 p-2">
      <View className="p-4">
        <Text className="text-white"> Total Amount: {totalAmount} </Text>
      </View>
    </View>
  );
};
const CardForCancelledStatus = ({hotelList}) => {
  const totalCancelled = hotelList?.reduce(
    (acc, item) => (item.isCanceled ? acc + 1 : acc),
    0,
  );
  return (
    <View className="border rounded mt-4 bg-slate-600 p-2">
      <View className="p-4">
        <Text className="text-white">
          Total Cancelled Booking: {totalCancelled}
        </Text>
      </View>
    </View>
  );
};
