import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

export default function CardMovie({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-white font-bold text-sm mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center gap--x-1 justify-start">
          <Image className="size-4" source={icons.star} />
          <Text className="text-white font-bold uppercase text-xs">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-399 font-medium mt-1 text-white">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs text-light-399 font-medium mt-1 text-white">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
