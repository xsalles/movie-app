import { View, Text, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchBarProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ placeholder, onPress, value, onChangeText }: SearchBarProps) {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-3 gap-3 mb-3">
        <Image
          source={icons.search}
          className="size-5"
          tintColor="#ab8bff"
          resizeMode="contain"
        />
        <TextInput
          className="text-white"
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor="#A8B5DB"
        />
      </View>
    </Pressable>
  );
}
