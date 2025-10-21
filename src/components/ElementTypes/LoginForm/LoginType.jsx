import React, { useEffect, useState } from "react";
import { Radio, Form, Input, Button, Card, Space } from "@ant-design/react-native";
import { Text, View } from "react-native";
import { t } from "i18next";
import FormByEmailType from "./FormByEmailType";
import FormByMobileType from "./FormByMobileType";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginType = ({configData}) => {
  var sign_in_email_opt = configData?.sign_in_email_opt?.code

  var sign_in_mobile_opt = configData?.sign_in_mobile_opt?.code

  const defaultLoginType =
    sign_in_email_opt != "guest_sign_email_none"
      ? "email"
      : sign_in_mobile_opt != "guest_sign_mobile_none"
      ? "mobile"
      : null;

  const [loginType, setLoginType] = useState(defaultLoginType);

  // useEffect(() => {
  //   const removeKey = async () => {
  //     await AsyncStorage.removeItem("user");
  //   };
  //   removeKey();
  // }, []);

  return (
    <>
      {defaultLoginType && (
        <Radio.Group
          onChange={(e) => setLoginType(e.target.value)}
          value={loginType}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
          {sign_in_email_opt !== "guest_sign_email_none" && (
            <Radio value="email">{t('email')}</Radio>
          )}

          {sign_in_mobile_opt !== "guest_sign_mobile_none" && (
            <Radio value="mobile">{t('mobile')}</Radio>
          )}
          </View>
        </Radio.Group>
      )}

      {loginType === "email" && <FormByEmailType sign_in_email_opt={sign_in_email_opt}/>}
      {loginType === "mobile" && <FormByMobileType sign_in_mobile_opt={sign_in_mobile_opt}/>}
    </>
  );
};

export default LoginType;