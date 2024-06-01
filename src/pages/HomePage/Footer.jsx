import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

const FooterList = ({ navigation, ...style }) => {
  const listData = [
    { label: "home", name: "Dashboard", route: "home" },
    {
      label: "laptop",
      name: "Status",
      route: "Status",
    },
    {
      label: "hotel",
      name: "Hotels",
      route: "addHotel",
    },
    {
      label: "user",
      name: "Setting",
      route: "AppSetting",
    },
  ];
  return (
    <View {...style}>
      {listData.map((item, idx) => (
        <TouchableOpacity
          className="flex items-center justify-center"
          onPress={() => navigation.navigate(item.route)}
          key={Date.now() + idx}
        >
          <Icon size={30} color={"green"} name={item.label} />
          <Text className="text-center font-bold">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default FooterList;
