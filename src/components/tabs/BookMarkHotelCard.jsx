import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const BookMarkHotelCard = () => {
  const [hotelData, setHotelData] = useState({
    HotelName: "The Kichen House",
    Descreaption:
      "loremfdsjfds hfjdsn fgjds gfdsa fgds hgfds gfds gfds gfgds fgds gfds fds  tre vcx tre fdsx tyre gfds tre fd hgfd loremfdsjfds hfjdsn fgjds gfdsa fgds hgfds gfds gfds gfgds fgds gfds fds loremfdsjfds hfjdsn fgjds gfdsa fgds hgfds gfds gfds gfgds fgds gfds fds  tre vcx tre fdsx tyre gfds tre fd hgfd  tre vcx tre fdsx tyre gfds tre fd hgfd",
    location: "12 Gali behind mc macdonald sec 13 noida",
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
    totalNoOfRev: 545,
    HotelStar: 2,
    OneNightCharge: 500,
    hotelImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdoEJ2_rsGiXjeugDWSY0kLW18eRLcFdRcrSTat9PJSA&s",
  });
  return (
    <View className=" w-1/2">
      <View className="flex-col gap-x-2 p-2 bg-slate-700 rounded-2xl items-center  ">
        <Image
          source={{ uri: hotelData.hotelImage }}
          className="w-[88%]  rounded h-[100px]"
        />
        <View>
          <Text className="text-white font-bold mt-4">
            {hotelData.HotelName}
          </Text>

          <View className="flex-row ">
            <View className="flex-row justify-end items-center rounded-full gap-x-2 ">
              <Text className="text-right text-white font-bold ">
                {hotelData.HotelStar}
              </Text>
              <Icon name="star" color={"white"} />
              <Text className="text-[7px] text-white ">
                {hotelData.location}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row w-full justify-around items-center ">
          <View className="flex-row items-center gap-x-1">
            <Text className="text-white font-bold">
              ₹{hotelData.OneNightCharge}
            </Text> 
            <Text className="text-white text-[10px] font-bold">/Night</Text>
          </View>
          <Text className="mt-3">
            
            <Icon size={18} name="bookmark" />
          </Text>
        </View>
      </View>
    </View>
  );
};
export default BookMarkHotelCard;
