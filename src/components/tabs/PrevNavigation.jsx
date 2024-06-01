import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome";
const PrevNavigation = ({
  navigation,
  iconColor,
  styleForText,
  text,
  className,
}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      onPress={goBack}
      className={className ? className : "flex-row items-center gap-x-4 px-2"}
    >
      <Text>
        <Icon
          name="arrow-left"
          size={17}
          color={iconColor ? iconColor : "black"}
        />
      </Text>
      <Text
        className={styleForText ? styleForText : "text-black text-xl font-bold"}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrevNavigation;
