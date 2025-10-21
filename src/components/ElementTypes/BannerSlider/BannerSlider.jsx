import React, { useRef, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import DataDisplay from "../DataDisplay/DataDisplay";
import { getElementData } from "../../../apiCall/get";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CustomComponent from "../../CustomComponent/CustomComponent";
import LoadingSection from "../../LoadingSection/LoadingSection";
import CustomBannerComponent from "../../CustomComponent/CustomBannerComponent";
import useLang from "../../../../contexts/useLanguage/useLanguage";

const { width } = Dimensions.get("window");

const HomeCarouselBar = ({element}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {lang} = useLang()

  const handlePress = (e , item) => {
    return 
  }

  const {data: componentData , isLoading , isFetching} = useQuery({
    queryKey: [{elementId: `${element?.id}` , model: `${element?.data_source_model}`,lang}],
    queryFn: async () => {
        
        return await getElementData({modelId: element?.data_source_model})
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    // enabled: (!is_item_display && element?.data_display_component?.id ) || (is_item_display && element?.item_display_component?.id) ? true : false
  })
  var items = componentData?.data?.data || componentData?.data || null

  return (
    isLoading ? <LoadingSection /> : 
    <View style={styles.container}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={10000}
        width={width * 0.99}
        height={240}
        data={items}
        scrollAnimationDuration={1000}
        pagingEnabled={true}
        snapEnabled={true}
        mode="parallax"
        onProgressChange={(offsetProgress, absoluteProgress) => {
          const index = Math.round(absoluteProgress);
          setActiveIndex(index == items?.length ? 0 : index) ;
        }}
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 70,
          parallaxAdjacentItemScale: 0.7,
        }}
        renderItem={({ item }) => (
          <View style={{ ...styles.card}}>
            <CustomBannerComponent item={item} element={element} handlePress={handlePress}/>
          </View>
        )}
      />

      <View
        style={[
          styles.pagination,
          { flexDirection: "row" ,direction: "ltr"},
        ]}
      >
        {items?.map((_, index) => (
          <View
            key={index}
            style={styles.dotWrapper}
          >
            <View
              style={[
                styles.dot,
                index === activeIndex ? {backgroundColor:'black'} : null,
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#aaa",
  },
});

export default HomeCarouselBar;