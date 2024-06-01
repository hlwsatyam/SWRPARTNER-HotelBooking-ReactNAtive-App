// import {View, Text} from 'react-native';
// import React from 'react';
// import {Button} from '@rneui/themed';
// import {BackHandler, Platform} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
// const Modals = ({setIsModalVisible}) => {
//   const navigation = useNavigation();
//   const confirmLogout = async () => {
//     try {
//       await AsyncStorage.clear();
//       navigation.reset();
//       closeApp();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <View className=" bg-slate-500 z-50  flex-1 w-screen h-screen opacity-90 rounded absolute  ">
//       <View className="flex-1 justify-center items-center   ">
//         <Text className="my-4 text-sm font-bold uppercase">
//           Are you sure you want to logout?
//         </Text>
//         <View>
//           <Button color={'black'} onPress={confirmLogout} title={'Continue'} />
//           <View className="my-3">
//             <Button
//               color={'success'}
//               onPress={() => setIsModalVisible(false)}
//               title={'Cancel'}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
// export default Modals;
// const closeApp = () => {
//   if (Platform.OS === 'android') {
//     console.log(Platform);
//     BackHandler.exitApp();
//   } else {
//     console.log('Closing the app...');
//   }
// };
import React, {useEffect} from 'react';
import {View, Text, Platform, BackHandler} from 'react-native';
import {Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LogoutModal = ({setIsModalVisible}) => {
  const navigation = useNavigation();

  const confirmLogout = async () => {
    try {
      await AsyncStorage.clear();
      closeApp();
    } catch (error) {
      console.log(error);
    }
  };

  const closeApp = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'splash'}],
    });
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      console.log('Closing the app...');
    }
  };
  return (
    <View className="bg-slate-500 z-50 flex-1 w-screen h-screen opacity-90 rounded absolute">
      <View className="flex-1 justify-center items-center">
        <Text className="my-4 text-sm font-bold uppercase">
          Are you sure you want to logout?
        </Text>
        <View>
          <Button color="black" onPress={confirmLogout} title="Continue" />
          <View className="my-3">
            <Button
              color="success"
              onPress={() => setIsModalVisible(false)}
              title="Cancel"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LogoutModal;
