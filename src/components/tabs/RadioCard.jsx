import { View, Text, Image } from "react-native";
import React from "react";
import CheckBox from "react-native-check-box";
const RadioCard = ({ img, name, isChecked, setIsChecked, checkBoxStyl }) => {
  return (
    <View className="bg-slate-700 flex-row justify-between items-center mt-3 rounded-2xl  px-1">
      <Image source={img} className="w-[50px] h-[50px]" />
      <Text className="flex-1 text-sm font-bold text-white "> {name} </Text>
      <CheckBox
        style={checkBoxStyl}
        isChecked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
      />
    </View>
  );
};
export default RadioCard;
