import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";


export default function TabIcon({ focused, icon, title }: TabIconProps) {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 justify-center items-center rounded-full gap-2 overflow-hidden"
        >
          <Image source={icon} tintColor="#151312" className="size-5" />
          <Text className="text-secondary text-base">{title}</Text>
        </ImageBackground>
      </>
    );
  }

  return (
    <View className="size-full justify-center items-center  rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}
