import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Country, State, City } from "country-state-city";

const CountrySelection = ({ userData, setUserData }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const allCountries = await Country.getAllCountries();
      setCountries(allCountries);
    };
    fetchCountries();
  }, []);
  useEffect(() => {
    console.log(selectedCountry, selectedState, selectedDistrict);
    setUserData({
      ...userData,
      country: selectedCountry,
      state: selectedState,
      city: selectedDistrict,
    });
    // console.log(userData);
  }, [selectedCountry, selectedState, selectedDistrict]);
  const handleCountryChange = async (countryName) => {
    setSelectedCountry(countryName);
    setSelectedState("");
    setSelectedDistrict("");

    // Fetch states of the selected country
    const country = countries.find((country) => country.name === countryName);

    if (country) {
      const countryStates = await State?.getStatesOfCountry(country.isoCode);

      setStates(countryStates);
    } else {
      console.log("else");
      setStates([]);
    }
  };
  const handleStateChange = async (stateName) => {
    setSelectedState(stateName);
    setSelectedDistrict("");

    // Fetch districts of the selected state
    const state = states.find((state) => state.name === stateName);
    if (state) {
      const stateDistricts = await City?.getCitiesOfState(
        state?.countryCode,
        state?.isoCode
      );
      setDistricts(stateDistricts);
    } else {
      setDistricts([]);
    }
  };
  return (
    <View className="p-3">
      <Text>Country:</Text>
      <RNPickerSelect
        onValueChange={(value) => handleCountryChange(value)}
        items={countries.map((country) => ({
          label: country.name,
          value: country.name,
        }))}
      />

      <Text>State:</Text>
      <RNPickerSelect
        onValueChange={(value) => handleStateChange(value)}
        items={states.map((state) => ({
          label: state.name,
          value: state.name,
        }))}
      />

      <Text>District:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedDistrict(value)}
        items={districts.map((district) => ({
          label: district.name,
          value: district.name,
        }))}
      />
    </View>
  );
};

export default CountrySelection;
