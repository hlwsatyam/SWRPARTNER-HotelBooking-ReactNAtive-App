import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const InputTab = ({
  iconName,
  name,
  readOnly,
  value,
  OnChangeText,
  placeholder,
  lastIconName,
}) => {
  return (
    <View className="mx-3 my-2 relative">
      <Icon
        name={iconName}
        color={'white'}
        style={{
          position: 'absolute',
          marginTop: 16,
          marginLeft: 12,
          zIndex: 22,
        }}
      />
      <TextInput
        readOnly={readOnly ? readOnly : false}
        placeholderTextColor="white"
        value={value ? value : null}
        onChangeText={text => OnChangeText(text, name)}
        className="rounded-xl px-3 pl-8 py-2 bg-zinc-700 outline-none text-white placeholder:text-white"
        placeholder={placeholder}
      />
      <Pressable className="absolute right-[5%] top-[30%]">
        <Icon name={lastIconName} color={'white'} />
      </Pressable>
    </View>
  );
};
export default InputTab;
