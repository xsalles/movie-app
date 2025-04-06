import { View, Text, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
}

export default function SearchBar({ placeholder, onPress }: SearchBarProps) {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center bg rounded-full px-5 py-3 gap-3">
        <Image
          source={icons.search}
          className="size-5"
          tintColor="#ab8bff"
          resizeMode="contain"
        />
        <TextInput
          className="text-white"
          placeholder={placeholder}
          onChangeText={() => {}}
          value=""
          placeholderTextColor="#A8B5DB"
        />
      </View>
    </Pressable>
  );
}
