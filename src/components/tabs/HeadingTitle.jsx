import { View, Text } from "react-native";
import React from "react";

const HeadingTitle = ({ backgroundClass, title, mainClass }) => {
  return (
    <View
      className={
        backgroundClass
          ? backgroundClass
          : "my-2 bg-slate-500 py-2 rounded px-2"
      }
    >
      <Text className={mainClass ? mainClass : "text-white text-xl font-bold"}>
        {title}
      </Text>
    </View>
  );
};

export default HeadingTitle;
