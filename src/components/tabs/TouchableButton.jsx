import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const TouchableButton = ({ onPress, className, variant, label }) => {
  const Styles = {
    danger:
      "bg-red-600 rounded-full font-bold text-[15px] text-white py-4 text-center mx-5",
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className={className ? className : "mt-5"}
    >
      <Text
        className={
          variant
            ? Styles[variant]
            : "bg-green-600 rounded-full font-bold text-[15px] text-white py-4 text-center mx-5"
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchableButton;
