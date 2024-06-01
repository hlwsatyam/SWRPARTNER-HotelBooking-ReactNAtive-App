import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Button,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import React, {useEffect, useState} from 'react';
import InputTab from '../../components/tabs/InputTab';
import TouchableButton from '../../components/tabs/TouchableButton';
import axios from 'axios';
import PrevNavigation from '../../components/tabs/PrevNavigation';
import {baseApiURL} from '../../components/Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingButton from '../../components/tabs/LoadingButton';
import {useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import CountrySelection from '../../components/SupportiveFunction/CountrySelection';
const UpdateHotel = ({navigation}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const hotelId = useRoute().params?.hotelId;
  const [navigationMessage, setNavigationMessage] = useState(
    hotelId ? 'Update Hotel' : 'Add Hotel',
  );

  useEffect(() => {
    hotelId ? null : _getLocationPermission();
  }, []);

  const _getLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'Please Alllow You Device Location to Access Your Hotel Location!',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          _getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const _getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setUserData(prev => ({
          ...prev,
          HotelLocation: JSON.stringify(location),
        }));
        setPermissionGranted(true);
      })
      .catch(error => {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Location Permission',
          textBody:
            'Please Turn On Location Permissions To Get Actual Hotel Location',
          button: 'close',
        });
      });
  };

  const [userData, setUserData] = React.useState({
    ownerName: '',
    email: '',
    stars: '',
    totalRooms: '',
    pin: '',
    password: '',
    //Hotel Name
    phone: '',
    country: '',
    hotelName: '',
    //Hotel Name
    hotelPhone: '',
    //Hotel Address
    address: '',
    //Hotel City
    city: '',
    //Hotel State
    state: '',
    //Hotel Location
    HotelLocation: '',
    description: '',
    charge: '',
    facilities: [],
    details: [],
  });
  const [details, setDetails] = React.useState([
    'Hotel',
    'Bedrooms',
    'Bathrooms',
    'Air Conditioning',
    'Kitchen',
    'TV',
    'Balcony',
    'Laundry',
    'Parking',
    'Garden',
    'Fireplace',
    'Free Breakfast',
    'Ocean View',
    'Work Desk',
    'Hair Dryer',
    'Iron & Ironing Board',
    'Pet-Friendly Rooms',
    'Mountain View',
    'Mini-Bar',
    'In-Room Safe',
    'Room Service',
    'Luggage Storage',
    'Sofa Bed',
    'Spa Bath',
    'Separate Living Room',
    'Connecting Rooms',
    'Accessible Rooms',
    'Baby Crib',
    'Fire Extinguisher',
    'Emergency Exit',
    'Smoke Detector',
  ]);
  const [facilities, setFacilities] = React.useState([
    'Swimming Pool',
    'wifi',
    'Restaurant',
    'Parking',
    'Meeting Room',
    'elvator',
    'Fitness Center',
    '24-hours Open',
    'Spa',
    'Bar',
    'Airport Shuttle',
    'Laundry Service',
    'Business Center',
    'Concierge',
    'Kids Club',
    'Beachfront',
    'Tennis Courts',
    'Jacuzzi',
    'Gym',
    'Sauna',
    'Room Cleaning',
    'Library',
    'Gift Shop',
    'Banquet Hall',
    'Karaoke',
    'Snack Bar',
    'BBQ Facilities',
    'Tour Desk',
    'ATM/Cash Machine',
    'Currency Exchange',
  ]);
  const OnchangeText = (text, field) => {
    setUserData({...userData, [field]: text});
  };
  const [isLoading, setIsLoading] = useState(false);
  const OnSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!hotelId && !permissionGranted) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Location Permission',
        textBody:
          'Please Turn On Location To Get Actual Hotel Location Then Reopen The App.',
        button: 'close',
      });
      _getLocationPermission();
      return;
    }
    setIsLoading(true);
    try {
      await axios
        .post(`${baseApiURL}/api/createUpHotel`, {
          userData,
          hotelId: hotelId ? hotelId : null,
          token,
        })
        .then(async res => {
          if (res.status == 200) {
            navigation.navigate('addHotel');
            setIsLoading(false);
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Hotel Updated!',
              button: 'close',
            });
          } else {
            setIsLoading(false);
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Failed',
              textBody: res.data.message,
            });
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.warn(error);
    }
  };
  const deleteHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios
        .post(`${baseApiURL}/api/vi/deleteHotel`, {
          hotelId: hotelId,
          token: token,
        })
        .then(async res => {
          if (res.status == 200) {
            navigation.navigate('addHotel');
          } else {
          }
        })
        .catch(err => {});
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    hotelId ? fetchHotelData(hotelId) : null;
  }, []);
  const fetchHotelData = async () => {
    await axios
      .post(`${baseApiURL}/api/searchingHotel/${hotelId}`)
      .then(res => {
        if (res.status == 200) {
          // console.log(res.data.facilities);

          setUserData(prev => ({
            ...prev,
            pin: res.data.pin,
            stars: res.data.stars,
            totalRooms: res.data.totalRooms,
            country: res.data.country,
            ownerName: res.data.ownerName,
            city: res.data.city,
            hotelPhone: res.data.hotelPhone,
            address: res.data.address,
            state: res.data.state,
            description: res.data.description,
            hotelName: res.data.hotelName,
            charge: res.data.charge,
            facilities: res.data.facilities,
            details: res.data.details,
            HotelLocation: res.data.hotelLocation,
          }));
        }
      });
    try {
    } catch (error) {}
  };
  return (
    <ScrollView>
      <View className="flex-1 p-2 pt-9 bg-teal-400  ">
        <StatusBar />
        <PrevNavigation navigation={navigation} text={navigationMessage} />
        <Text className="text-sm mb-5 mt-7 from-neutral-200 font-bold text-center">
          Your Hotel Details
        </Text>
        <View>
          <Text>Enter Your Hotel Name:-</Text>
          <InputTab
            name="hotelName"
            value={hotelId ? userData.hotelName : null}
            OnChangeText={OnchangeText}
            placeholder={'Eg: The Hotel Taj'}
          />
        </View>
        {hotelId ? null : (
          <CountrySelection userData={userData} setUserData={setUserData} />
        )}
        <View>
          <Text>Total Number Of Rooms:-</Text>
          <InputTab
            name="totalRooms"
            value={hotelId ? userData.totalRooms?.toString() : null}
            OnChangeText={OnchangeText}
            placeholder={'Eg: 4'}
          />
        </View>
        <View>
          <Text>Type Of Hotels:-</Text>
          <InputTab
            name="stars"
            value={hotelId ? userData.stars?.toString() : null}
            OnChangeText={OnchangeText}
            placeholder={'Eg: 7'}
          />
        </View>
        <View>
          <Text>Enter Your Hotel Address:-</Text>
          <InputTab
            name="address"
            value={hotelId ? userData.address : null}
            OnChangeText={OnchangeText}
            placeholder={'Near Metro Station, Sec 16 Noida up'}
          />
        </View>
        <View>
          <Text>Enter Your Hotel Description:-</Text>
          <InputTab
            name="description"
            value={hotelId ? userData.description : null}
            OnChangeText={OnchangeText}
            placeholder={'we offers a cool rooms.'}
          />
        </View>
        <View>
          <Text>Enter Your Pin Code:-</Text>
          <InputTab
            name="pin"
            value={hotelId ? userData.pin : null}
            OnChangeText={OnchangeText}
            placeholder={'Eg:132114'}
          />
        </View>
        <View>
          <Text>Enter Your Hotel Contact Number:-</Text>
          <InputTab
            name={'hotelPhone'}
            value={hotelId ? userData.hotelPhone : null}
            OnChangeText={OnchangeText}
            placeholder={'Eg:8059424475'}
          />
        </View>
        <View>
          <Text>Enter One Night Charge:-</Text>
          <InputTab
            name={'charge'}
            value={hotelId ? userData.charge.toString() : null}
            OnChangeText={OnchangeText}
            placeholder={'Eg:1897'}
          />
        </View>
        <SelectDetails
          userData={userData}
          name={'details'}
          setUserData={setUserData}
          label={'Select Your Details :-'}
          facilities={details}
        />
        <SelectDetails
          userData={userData}
          setUserData={setUserData}
          name={'facilities'}
          label={'Select Your Facilities :-'}
          facilities={facilities}
        />
        <View>
          <Text className="my-2 font-bold "> Enter Your Hotel Location:- </Text>

          <InputTab
            readOnly={true}
            name={'HotelLocation'}
            value={hotelId ? userData.HotelLocation : userData.HotelLocation  }
            OnChangeText={OnchangeText}
            placeholder={'Eg: https://maps.app.goo.gl/YHLN...'}
          />
        </View>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <TouchableButton
            onPress={OnSubmit}
            label={hotelId ? 'Update Hotel' : 'Add Hotel'}
          />
        )}
        {hotelId ? (
          <TouchableButton
            variant={'danger'}
            onPress={deleteHandler}
            label={'Delete '}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};
export default UpdateHotel;

const SelectDetails = ({label, userData, name, facilities, setUserData}) => {
  const [selectedFacilities, setSelectedFacilities] = React.useState(
    userData[name] || [],
  );
  useEffect(() => {
    setSelectedFacilities(userData[name]);
  }, [userData[name]]);
  const toggleFacilitySelection = facility => {
    let updatedFacilities;
    if (selectedFacilities.includes(facility)) {
      updatedFacilities = selectedFacilities.filter(item => item !== facility);
    } else {
      updatedFacilities = [...selectedFacilities, facility];
    }
    setSelectedFacilities(updatedFacilities);
    setUserData({...userData, [name]: updatedFacilities});
  };

  return (
    <View className="mt-4">
      <Text className="mb-4 font-bold "> {label} </Text>
      <View className="flex-row mt- gap-x-2 gap-y-3 flex-wrap">
        {facilities?.map((facility, idx) => (
          <Text
            onPress={() => toggleFacilitySelection(facility)}
            className={
              selectedFacilities.includes(facility)
                ? 'py-1 text-[12px] px-3 bg-yellow-400 rounded-full  '
                : 'py-1 text-[12px] px-3 bg-gray-200 rounded-full'
            }
            key={idx * idx}>
            {' '}
            {facility}{' '}
          </Text>
        ))}
      </View>
    </View>
  );
};
