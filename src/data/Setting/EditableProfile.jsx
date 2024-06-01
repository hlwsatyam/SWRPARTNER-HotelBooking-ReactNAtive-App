import { View, Text, Image } from "react-native";
import React from "react";
import logo from "./../../../assets/logo.png";
const EditableProfile = () => {
  return (
    <View>
      <View className="w-full h-full">
        <Image className="w-[40px] h-[50px]" source={logo} />
      </View>
    </View>
  );
};

export default EditableProfile;
