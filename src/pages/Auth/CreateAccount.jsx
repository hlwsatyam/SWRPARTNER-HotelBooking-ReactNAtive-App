import {View, Text, StatusBar, ScrollView, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputTab from '../../components/tabs/InputTab';
import TouchableButton from '../../components/tabs/TouchableButton';
import axios from 'axios';
import PrevNavigation from '../../components/tabs/PrevNavigation';
import {baseApiURL} from '../../components/Variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingButton from '../../components/tabs/LoadingButton';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import {
  isContainsNumber,
  isGmail,
  isValidGoogleMapsLink,
  isValidPhoneNumber,
  isValidPostalCode,
} from '../../SupportiveFunction/SupportiveFunction1';
import CountrySelection from '../../components/SupportiveFunction/CountrySelection';
import {PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';
const CreateAccount = ({navigation}) => {
  let newNavigation = navigation ? navigation : useNavigation();
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
    if (field == 'email') {
      if (isGmail(text)) {
        setIsEmailError(null);
      } else {
        setIsEmailError('Please Enter Valid Email Address');
      }
    }
    if (field == 'pin') {
      if (isValidPostalCode(text)) {
        setIsPincodeError(null);
      } else {
        setIsPincodeError('Please Enter Valid Code!');
      }
    }
    if (field == 'HotelLocation') {
      if (isValidGoogleMapsLink(text)) {
        setIsMapError(null);
      } else {
        setIsMapError('Please Enter Valid Google Map Link!');
      }
    }

    if (field == 'charge') {
      if (isContainsNumber(text)) {
        setIsChargeError(null);
      } else {
        setIsChargeError('Please Enter Charge!');
      }
    }
    if (field == 'phone') {
      if (isValidPhoneNumber(text)) {
        setIsPhoneError(null);
      } else {
        setIsPhoneError('Please Enter Valid Mobile No');
      }
    }
    setUserData({...userData, [field]: text});
  };

  useEffect(() => {
    _getLocationPermission();
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
  const [permissionGranted, setPermissionGranted] = useState(false);
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

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(null);
  const [isPhoneError, setIsPhoneError] = useState(null);
  const [isPincodeError, setIsPincodeError] = useState(null);
  const [isMapError, setIsMapError] = useState(null);
  const [isChargeError, setIsChargeError] = useState(null);
  const OnSubmit = async () => {
    if (isChargeError || isEmailError || isPhoneError || isPincodeError) {
      return;
    }
    if (!permissionGranted) {
      _getLocationPermission();
    }
    setIsLoading(true);
    try {
      await axios
        .post(`${baseApiURL}/api/createHotel`, userData)
        .then(async res => {
          if (res.status == 200) {
            await AsyncStorage.setItem('token', res.data.token);
            navigation.navigate('home');
            setIsLoading(false);
          } else {
            Toast.show({
              type: ALERT_TYPE.INFO,
              title: 'Failed',
              textBody: res.data.message,
            });
            setIsLoading(false);
          }
        })
        .catch(err => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Failed',
            textBody: 'Internal Server Error!',
          });
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: 'Internal Server Error!',
      });
      setIsLoading(false);
      console.warn(error);
    }
  };
  const [userData, setUserData] = React.useState({
    ownerName: '',
    email: '',
    pin: '',
    password: '',
    //Hotel Name
    phone: '',
    hotelName: '',
    stars: '',
    //Hotel Name
    hotelPhone: '',
    //Hotel Address
    address: '',
    country: '',
    totalRooms: '',
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
  return (
    <ScrollView>
      <View className="flex-1 p-2 pt-9">
        <StatusBar />
        <PrevNavigation
          navigation={newNavigation}
          text={'Create Your Account'}
        />
        <View className="my-5 border-b-2">
          <Text className="text-sm my-3 from-neutral-200 font-bold text-center">
            {' '}
            Hotel Owner Details
          </Text>
          <Text>Enter Your Name:-</Text>
          <InputTab
            name="ownerName"
            OnChangeText={OnchangeText}
            placeholder={'Eg: Rajesh Singha'}
          />
          <Text>Enter Your Email:-</Text>
          <InputTab
            name="email"
            OnChangeText={OnchangeText}
            placeholder={'Eg: rajeshotel43@gmail.com'}
          />
          <View>
            {isEmailError && (
              <Text className="my-2 text-center font-semibold text-red-500 ">
                {isEmailError}
              </Text>
            )}
          </View>
          <Text>Create Your Strong Password:-</Text>
          <InputTab
            name="password"
            OnChangeText={OnchangeText}
            placeholder={'Eg: john$#322'}
          />
          <Text>Enter Your Contact No:-</Text>
          <InputTab
            name="phone"
            OnChangeText={OnchangeText}
            placeholder={'Eg: +9112345679'}
          />
          <View>
            {isPhoneError && (
              <Text className="my-2 text-center font-semibold text-red-500 ">
                {isPhoneError}
              </Text>
            )}
          </View>
        </View>
        <Text className="text-sm mb-5 mt-7 from-neutral-200 font-bold text-center">
          Your Hotel Details
        </Text>
        <View>
          <Text>Enter Your Hotel Name:-</Text>
          <InputTab
            name="hotelName"
            OnChangeText={OnchangeText}
            placeholder={'Eg: The Hotel Taj'}
          />
        </View>
        <View>
          <CountrySelection userData={userData} setUserData={setUserData} />
        </View>
        <View>
          <Text>Type Of Hotel:-</Text>
          <InputTab
            name="stars"
            OnChangeText={OnchangeText}
            placeholder={'Eg: 5'}
          />
        </View>
        <View>
          <Text>No Of Rooms:-</Text>
          <InputTab
            name="totalRooms"
            OnChangeText={OnchangeText}
            placeholder={'Eg: 8'}
          />
        </View>

        <View>
          <Text>Enter Your Hotel Address:-</Text>
          <InputTab
            name="address"
            OnChangeText={OnchangeText}
            placeholder={'Near Metro Station, Sec 16 Noida up'}
          />
        </View>
        <View>
          <Text>Enter Your Hotel Description:-</Text>
          <InputTab
            name="description"
            OnChangeText={OnchangeText}
            placeholder={'we offers a cool rooms.'}
          />
        </View>
        <View>
          <Text>Enter Your Pin Code:-</Text>
          <InputTab
            name={'pin'}
            OnChangeText={OnchangeText}
            placeholder={'132117'}
          />
          <View>
            {isPincodeError && (
              <Text className="my-2 text-center font-semibold text-red-500 ">
                {isPhoneError}
              </Text>
            )}
          </View>
          <View>
            {isPincodeError && (
              <Text className="my-2 text-center font-semibold text-red-500 ">
                {isPincodeError}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text>Enter Your Hotel Contact Number:-</Text>
          <InputTab
            name={'hotelPhone'}
            OnChangeText={OnchangeText}
            placeholder={'Eg-:+91 987654321'}
          />
        </View>
        <View>
          <Text>Enter One Night Charge:-</Text>
          <InputTab
            name={'charge'}
            OnChangeText={OnchangeText}
            placeholder={'Eg:1897'}
          />
          <View>
            {isChargeError && (
              <Text className="my-2 text-center font-semibold text-red-500 ">
                {isChargeError}
              </Text>
            )}
          </View>
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
            name={'HotelLocation'}
            readOnly={true}
            value={userData.HotelLocation}
            OnChangeText={OnchangeText}
            placeholder={'Eg: https://maps.app.goo.gl/YHLN...'}
          />
          <View>
            {isMapError && (
              <Text className="my-2 text-center font-semibold text-red-500 ">
                {isMapError}
              </Text>
            )}
          </View>
        </View>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <TouchableButton onPress={OnSubmit} label={'Create Now'} />
        )}
      </View>
    </ScrollView>
  );
};
export default CreateAccount;

// const SelectDetails = ({ label, userData, name, facilities, setUserData }) => {
//   const [selectedFacilities, setSelectedFacilities] = React.useState([]);
//   const toggleFacilitySelection = (facility) => {
//     if (selectedFacilities.includes(facility)) {
//       setSelectedFacilities(
//         selectedFacilities.filter((item) => item !== facility)({
//           ...userData,
//           [name]: selectedFacilities.filter((item) => item !== facility),
//         })
//       );
//       setUserData({
//         ...userData,
//         [name]: selectedFacilities.filter((item) => item !== facility),
//       });
//     } else {
//       setSelectedFacilities([...selectedFacilities, facility]);
//       setUserData({ ...userData, [name]: [...selectedFacilities, facility] });
//     }
//   };
//   return (
//     <View className="mt-4">
//       <Text className="mb-4 font-bold "> {label} </Text>
//       <View className="flex-row mt- gap-x-2 gap-y-3 flex-wrap">
//         {facilities?.map((facility, idx) => (
//           <Text
//             onPress={() => toggleFacilitySelection(facility)}
//             className={
//               selectedFacilities.includes(facility)
//                 ? "py-1 text-[12px] px-3 bg-yellow-400 rounded-full  "
//                 : "py-1 text-[12px] px-3 bg-gray-200 rounded-full"
//             }
//             key={idx * idx}
//           >
//             {" "}
//             {facility}{" "}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );
// };

const SelectDetails = ({label, userData, name, facilities, setUserData}) => {
  const [selectedFacilities, setSelectedFacilities] = React.useState(
    userData[name] || [],
  );

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
