import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FooterList from '../../pages/HomePage/Footer';
import profileLogo from '../../../assets/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {baseApiURL} from '../../components/Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modals from '../../components/tabs/LogoutTab';
import BackNavigation from '../../components/tabs/BackNavigation';
const AppSetting = ({navigation}) => {
  const [settingList, setSettingList] = useState([
    {
      label: 'My Wallet',
      icon: 'money',
      route: 'wallet',
    },
    {
      label: 'Help and Support',
      icon: 'book',
      route: 'HelpAndSupport',
    },
    {
      label: 'Privacy Policy',
      icon: 'user',
      route: 'PrivacyAndPolicy',
    },
    {
      label: 'Terms and Conditions',
      icon: 'pencil',
      route: 'TermsConditions',
    },
    {
      label: 'Logout',
      icon: 'cog',
      route: 'logout',
    },
  ]);
  const [userDetails, setUserDetails] = useState({
    name: 'Hotel Owner',
    image: profileLogo,
    email: 'fgd32@gmail.com',
    phone: '90999039223',
  });
  useEffect(() => {
    FetchData();
  });
  const FetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios
        .post(`${baseApiURL}/api/vi/hotelOwnerInfo`, {token})
        .then(res => {
          if (res.status == 200) {
            setUserDetails(res.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const logoutHandler = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View className="flex-1 pt-8 bg-yellow-500 ">
      <BackNavigation
        navigation={navigation}
        styleForFullComp=" px-2 py-2 flex-row items-center gap-x-3"
        styleForTitle={'text-sm'}
        title={'Application Setting '}
      />
      {isModalVisible ? (
        <Modals
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      ) : (
        ''
      )}
      <ScrollView className="">
        <View className="bg-yellow-400 m-2 rounded-2xl p-2 ">
          <TouchableOpacity className="my-8 flex-row gap-x-4  items-center ">
            <Image
              source={image ? {uri: image} : profileLogo}
              className="w-[50px] rounded-full h-[50px] "
            />

            <View className="f">
              <Text className="text-xl font-bold">{userDetails.name} </Text>
              <Text className="text-[12px]">{userDetails.email} </Text>
              <Text className="text-[10px] font-semibold">
                phone: {userDetails.phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {settingList.map((item, idx) => (
          <View
            className="bg-yellow-400 m-2 rounded-2xl p-2 "
            key={idx + idx * idx}>
            <TouchableOpacity
              onPress={() =>
                item.route === 'logout'
                  ? logoutHandler()
                  : navigation.navigate(item.route)
              }
              className="my-2 items-center flex-row">
              <View className="w-[12%]">
                <Icon name={item.icon} size={30} color="green" />
              </View>
              <Text className="font-bold  text-sm">{item.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default AppSetting;
