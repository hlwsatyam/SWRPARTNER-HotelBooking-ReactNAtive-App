import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const AddRoomNumbers = ({ roomDetails, setRoomDetails }) => {
  const [roomNumbers, setRoomNumbers] = useState(
    Array.from(
      { length: roomDetails.noOfRooms ? roomDetails.noOfRooms : 1 },
      (_, i) => i + 1
    )
  );
  return (
    <View className="border flex-row items-center gap-x-5 gap-y-3 flex-wrap p-1 rounded-lg m-2">
      {roomDetails.noOfRooms?.map((roomNumber, index) => (
        <TextInput
          key={index}
          onChangeText={(value) => {
         
            const updatedRooms = roomDetails.noOfRooms.map((room, i) =>
              i === index ? value : room
            );
            setRoomDetails({ ...roomDetails, noOfRooms: updatedRooms });
          }}
          placeholder="Room NO"
          className="border-2 w-[80px] h-[50px] border-gray-300 p-2 rounded-lg"
        />
      ))}
    </View>
  );
};

export default AddRoomNumbers;
