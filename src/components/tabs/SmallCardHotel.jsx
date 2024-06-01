import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const SmallCardHotel = ({ navigation, item }) => {
  const [hotelData, setHotelData] = useState({
    HotelName: item.hotelName,
    Descreaption: item?.description || "Best Hotels In this Collection",
    location: item?.address || "India",
    Details: ["Hotels", "4 Bedrooms", "2 Bathrooms", "3000 sqft"],
    Facilities: [
      "Swimming Pool",
      "WIFI",
      "Restaurant",
      "Parking",
      "Meeting Room",
      "Elevator",
      "Fitness Center",
      "@4 Hours Open",
    ],
    locationIframe: "ghfd",
    totalNoOfRev: item?.reviews?.length || 0,
    HotelStar: item?.stars || 5,
    OneNightCharge: item?.charge || 3000,
    hotelImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdoEJ2_rsGiXjeugDWSY0kLW18eRLcFdRcrSTat9PJSA&s",
  });
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("updateHotel", { hotelId: item._id })}
      className="w-full my-2   rounded-2xl bg-slate-700 px-4 "
    >
      <View className="flex-row justify-center gap-x-2   items-center  ">
        <Image
          source={{ uri: hotelData.hotelImage }}
          className="w-[100px] rounded m-1 h-[100px]"
        />
        <View>
          <Text className="text-white font-bold">{hotelData.HotelName}</Text>
          <Text className="text-[10px] text-white ">{hotelData.location}</Text>
          <View className="flex-row">
            <View className="flex-row justify-end my-2 items-center rounded-full gap-x-2 ">
              <Text className="text-right text-white font-bold ">
                {hotelData.HotelStar} Star
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-col items-center ">
          <Text className="text-white font-bold">
            {" "}
            ₹{hotelData.OneNightCharge}{" "}
          </Text>
          <Text className="text-white text-[10px] font-bold">/Night</Text>
          <Text className="mt-3">
            {" "}
            <Icon size={18} name="bookmark" />
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RoomListing", { hotelId: item._id })
        }
        className="py-2 px-3 w-[140px] m-auto my-2 rounded bg-yellow-400"
      >
        <Text>Room Listing</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default SmallCardHotel;
