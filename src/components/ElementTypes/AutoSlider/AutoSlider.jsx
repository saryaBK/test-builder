import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Easing, I18nManager } from "react-native";
import DataDisplay from "../DataDisplay/DataDisplay";
import useLang from "../../../../contexts/useLanguage/useLanguage";

const AutoSlider = ({ element, speedPxPerSec = 60 }) => {
  const { lang, changeLanguage } = useLang();
  const isEnglish = lang === "en";
  const translateX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    // changeLanguage('en')
    if (!contentWidth) return;
    const durationMs = (contentWidth / Math.max(1, speedPxPerSec)) * 300;
    translateX.setValue(isEnglish ? -contentWidth : 0);
    const toValue = isEnglish ? 0 : -contentWidth;

    const anim = Animated.loop(
      Animated.timing(translateX, {
        toValue,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    anim.start();
    return () => anim.stop();
  }, [contentWidth, speedPxPerSec, translateX, isEnglish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.track,
          { transform: [{ translateX }] },
        ]}
      >
        <View
          style={styles.row}
          onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
        >
          {element?.data_source_model && <DataDisplay element={element} />}
        </View>

        {/* <View style={styles.row}>
          {element?.data_source_model && <DataDisplay element={element} />}
        </View> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    overflow: "hidden", 
  },
  track: {
    flexDirection: "row",
    direction: "ltr",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AutoSlider;
