import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { baseApiURL } from "../../components/Variable";
import axios from "axios";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
const ShowRooms = () => {
  const [hotelDetails, setHotelDetails] = useState({
    _id: "",
    address: "",
    charge: 0,
    city: "",
    description: "",
    details: [],
    facilities: [],
    hotelLocation: "",
    hotelName: "",
    hotelPhone: "",
    images: [],
    owners: "",
    pin: "",
    reviews: [],
    state: "",
  });
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = React.useState(null);
  const [roomId, setRoomId] = useState("");
  const route = useRoute();
  useEffect(() => {
    fetData();
   
    fetAllRoomForThisHotel();
  }, [roomId]);
  useFocusEffect(
    React.useCallback(() => {
      fetAllRoomForThisHotel();
    }, [])
  );
  const fetData = async () => {
    try {
      const res = await axios.post(
        `${baseApiURL}/api/searchingHotel/${route.params?.hotelId}`
      );
      if (res.status == 200) {
        setHotelDetails(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetAllRoomForThisHotel = async () => {
    
    try {
      const res = await axios.post(
        `${baseApiURL}/api/AllRoomForThisHotel/${route.params?.hotelId}`
      );
      if (res.status == 200) {
        setRooms(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRoomHandler = async (id) => {
    try {
      const res = await axios.post(`${baseApiURL}/api/deleteRoom/${id}`);
      if (res.status == 200) {
        setRoomId(id);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "success",
          textBody: res.data.message,
          button: "close",
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody: res.data.message,
          button: "close",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView className="flex-1 pt-8 px-3 bg-yellow-400 ">
      <PrevNavigation
        navigation={navigation}
        text={`${hotelDetails?.hotelName || "Your Hotel"}'s Rooms`}
      />
      {rooms?.map((room, idx) => (
        <View
          key={idx * idx}
          className="border bg-purple-600  border-gray-300 rounded-lg p-2 m-2 flex-col justify-between items-center"
        >
          <View className=" border-gray-300 rounded-lg  flex-row justify-between items-center">
            <Text className="text-white font-extralight ">
              Room No: {room.roomNo}{" "}
            </Text>
            <Text className="text-white font-extralight ">
              {" "}
              Room Type:{room.roomType}{" "}
            </Text>
          </View>
          <View className=" border-gray-300 rounded-lg  flex-row justify-between items-center">
            <Text className="text-white font-extralight ">
              One Night Charge: {room.roomPrice}{" "}
            </Text>
          </View>
          <ScrollView horizontal={true} className="rounded py-4">
            {room?.imageUrls?.map((url, idx) => (
              <Image
                key={idx}
                source={{
                  uri: `${baseApiURL}/uploads/${url}`,
                }}
                className="w-[300px] mx-4 h-[300px] "
              />
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => deleteRoomHandler(room._id)}>
            <Text className="text-white font-semibold"> Delete Room </Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddRoom", {
            hotelDetails,
            isAddingNew: true,
            hotelId: route.params?.hotelId,
          })
        }
        className=" py-3 mb-14 bg-black"
      >
        <Text className="text-white text-center text-sm">Add Room</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ShowRooms;
