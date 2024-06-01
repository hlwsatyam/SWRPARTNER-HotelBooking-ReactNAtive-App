import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import { useNavigation } from "@react-navigation/native";
import asyncStorage from "@react-native-async-storage/async-storage";
import { baseApiURL } from "../../components/Variable";
import axios from "axios";
import NeedHelp from "../../components/tabs/NeedHelp";

const Wallet = () => {
  const navigation = useNavigation();
  const [hotelList, setHotelList] = useState();
  const [status, setStatus] = useState("Booking");
  useEffect(() => {
    fetchMyHotel();
  }, [status]);
  const fetchMyHotel = async () => {
    try {
      const token = await asyncStorage.getItem("token");
      const response = await axios.post(`${baseApiURL}/api/Owner/myBooking`, {
        token,
      });
      if (response.status == 200) {
        console.log(response.data);
        setHotelList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 p-2 pt-9 bg-yellow-400  ">
      <PrevNavigation navigation={navigation} text={"Wallet"} />
      <CardForCancelledStatus hotelList={hotelList} />
      <CardForPaymentStatus hotelList={hotelList} />

      <NeedHelp />
    </View>
  );
};
export default Wallet;

const CardForCancelledStatus = ({ hotelList }) => {
  const totalCancelled = hotelList?.reduce(
    (acc, item) => (item.isCanceled ? acc + 1 : acc),
    0
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
const CardForPaymentStatus = ({ hotelList }) => {
  const totalPaid = hotelList?.reduce(
    (acc, item) => (item.totalPaid ? acc + 1 : acc),
    0
  );
  return (
    <View className="border mb-2 rounded mt-4 bg-slate-600 p-2">
      <View className="p-4">
        <Text className="text-white">Total Paid: {totalPaid}</Text>
      </View>
    </View>
  );
};
