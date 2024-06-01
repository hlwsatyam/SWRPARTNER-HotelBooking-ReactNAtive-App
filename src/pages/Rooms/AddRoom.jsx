import {
  View,
  Text,
  ScrollView,
  Image,
  useColorScheme,
  Alert,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import {launchImageLibrary} from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import PrevNavigation from '../../components/tabs/PrevNavigation';
import RNPickerSelect from 'react-native-picker-select';
import roomTypes from '../../data/RoomType.json';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {baseApiURL} from '../../components/Variable';
import axios from 'axios';
import InputTab from '../../components/tabs/InputTab';
import AddRoomNumbers from '../../components/tabs/AddRoomNumbers';
const AddRoom = () => {
  const navigation = useNavigation();
  const [hotels, setHotels] = React.useState(null);
  const {hotelDetails, hotelId, isAddingNew} = useRoute().params;
  const [roomDetails, setRoomDetails] = React.useState({
    roomType: '',
    noOfRooms: [],
    roomPrice: '',
    roomDescription: '',
    roomCapacity: '',
    hotelRoomImage: [],
    selectedFacilities: [],
    roomAvailability: '',
  });
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    if (!isAddingNew) fetData();
  }, []);
  const fetData = async () => {
    try {
      const res = await axios.post(
        `${baseApiURL}/api/searchingHotel/${hotelId}`,
      );
      if (res.status == 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveHandler = async () => {
    const formData = new FormData();
    try {
      Object.entries(roomDetails).forEach(([key, value]) => {
        if (key === 'hotelRoomImage') {
          value.forEach((item, index) => {
            formData.append(`${key}`, {
              uri: item,
              type: `image/*`,
              name: 'image',
            });
          });
        } else if (key === 'noOfRooms' || key === 'selectedFacilities') {
          value.forEach((item, index) => {
            formData.append(`${key}`, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      formData.append('hotelId', hotelId);

      const response = await axios.post(
        `${baseApiURL}/api/addUpRoom`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 200) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: response.data.message,
        });
        navigation.navigate('RoomListing', {hotelId});
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed',
          textBody: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error.message,
      });
    }
  };

  const onChangeHandler = (value, field) => {
    if (field == 'noOfRooms') {
      setRoomDetails({
        ...roomDetails,
        [field]: Array.from({length: parseInt(value)}, (_, i) => ''),
      });
    } else {
      setRoomDetails({...roomDetails, [field]: value});
    }
  };

  const facilities = [
    'Bed',
    'Bathroom',
    'Towels',
    'Toiletries',
    'Hairdryer',
    'Closet',
    'Iron and Ironing Board',
    // Add more facilities as needed
  ];

  const toggleFacility = facility => {
    if (roomDetails.selectedFacilities.includes(facility)) {
      setRoomDetails({
        ...roomDetails,
        selectedFacilities: roomDetails.selectedFacilities.filter(
          item => item !== facility,
        ),
      });
      // setSelectedFacilities(
      //   selectedFacilities.filter((item) => item !== facility)
      // );
    } else {
      // setSelectedFacilities([...selectedFacilities, facility]);
      setRoomDetails({
        ...roomDetails,
        selectedFacilities: [...roomDetails.selectedFacilities, facility],
      });
    }
  };

  const pickImage = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          maxWidth: 640,
          maxHeight: 480,
          selectionLimit: 50,
        },
        response => {
          if (response.didCancel) {
            return console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            return console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            const selectedImage = response.assets.map(image => image.uri);
            setRoomDetails({
              ...roomDetails,
              hotelRoomImage: [...roomDetails.hotelRoomImage, ...selectedImage],
            });
          }
        },
      );
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  const deleteImage = index => {
    const updatedImages = [...roomDetails.hotelRoomImage];
    updatedImages.splice(index, 1);
    setRoomDetails({...roomDetails, hotelRoomImage: updatedImages});
  };

  return (
    <ScrollView
      className={`px-3  ${
        isDarkMode ? 'bg-gray-800' : 'bg-yellow-400'
      }  file: pt-8 `}>
      <PrevNavigation
        navigation={navigation}
        text={isAddingNew ? 'Add Room' : 'Update Room'}
      />
      <Text className="text-sm mt-2 text-white ">Select Room Type</Text>
      <RNPickerSelect
        onValueChange={value => onChangeHandler(value, 'roomType')}
        items={roomTypes.map(roomType => ({
          label: roomType.label,
          value: roomType.value,
        }))}
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            color: 'black',
          },
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'gray',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
          },
        }}
        value={roomDetails.roomType}
      />
      <InputTab
        name={'noOfRooms'}
        OnChangeText={value => onChangeHandler(value, 'noOfRooms')}
        placeholder={'Total Number Of Rooms'}
      />
      <AddRoomNumbers
        roomDetails={roomDetails}
        setRoomDetails={setRoomDetails}
      />
      <InputTab
        name={'roomPrice'}
        OnChangeText={value => onChangeHandler(value, 'roomPrice')}
        placeholder={'Room Price'}
      />
      <InputTab
        name={'roomDescription'}
        OnChangeText={value => onChangeHandler(value, 'roomDescription')}
        placeholder={'Room Description'}
      />
      {/* Facilities start From Here */}
      <View style={styles.container}>
        <Text style={styles.title}>Select Facilities:</Text>
        {facilities.map((facility, index) => (
          <TouchableOpacity
            key={index}
            style={styles.facilityItem}
            onPress={() => toggleFacility(facility)}>
            <Text style={styles.facilityText}>{facility}</Text>
            <View style={styles.radio}></View>
            {roomDetails.selectedFacilities.includes(facility) && (
              <View style={styles.selectedIndicator}></View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {/* Facilities End From Here */}
      {/* Image Gallery start From Here */}
      <View style={styles.container}>
        <Text style={styles.title}>Selected Images:</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="my-4"
          horizontal={true}>
          {roomDetails.hotelRoomImage?.map((image, index) => (
            <View key={index} className="mx-3 rounded">
              <Image source={{uri: image}} style={styles.image} />
              <TouchableOpacity
                onPress={() => deleteImage(index)}
                className="bg-yellow-300 w- rounded">
                <Text className="text-center font-bold ">Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={pickImage} style={styles.addButton}>
          <Text style={styles.addText}>Add Image</Text>
        </TouchableOpacity>
      </View>
      {/* Image Gallery End From Here */}
      <TouchableOpacity onPress={saveHandler} className=" mb-12  py-3 bg-black">
        <Text className="text-white text-center text-sm">
          {isAddingNew ? 'Add Room' : 'Update Room'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRoom;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  facilityText: {
    fontSize: 16,
    marginRight: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: -15,
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
});
