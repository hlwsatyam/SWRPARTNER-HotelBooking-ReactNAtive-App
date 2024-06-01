import { View, Text, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import passImg from "../../../assets/Local/password.png";
import PrevNavigation from "../../components/tabs/PrevNavigation";
import InputTab from "../../components/tabs/InputTab";
import TouchableButton from "../../components/tabs/TouchableButton";
import LoadingButton from "../../components/tabs/LoadingButton";
import axios from "axios";
import { baseApiURL } from "../../components/Variable";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
const ForgotPassword = ({ navigation }) => {
  const [forgetPasswordError, setForgotPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await axios
        .post(`${baseApiURL}/api/forgetPassword`, {
          email,
        })
        .then((res) => {
          if (res.status == 200) {
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Success",
              textBody: `We Sent Your Password On ${email}`,
              button: "close",
            });
            setIsLoading(false);
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "Failed",
              textBody: `${res.data.message}`,
              button: "close",
            });
            setIsLoading(false);
          }
        });
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed",
        textBody: `Server Internal Error!`,
        button: "close",
      });
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 pt-10   ">
      <StatusBar />
      <PrevNavigation
        navigation={navigation}
        className={"px-2"}
        
        text={"Forgot Password"}
      />
      <View>
        <Image source={passImg} className="w-40 h-40 m-auto" />
      </View>
      <View className="px-2">
        <Text className="text-sm font-bold ">Enter Your Email</Text>
        <InputTab
          OnChangeText={(text) => setEmail(text)}
          placeholder={"E-mail"}
        />
        <View>
          <Text>{forgetPasswordError}</Text>
        </View>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <TouchableButton onPress={handleSubmit} label={"Get Password"} />
        )}
      </View>
    </View>
  );
};
export default ForgotPassword;
