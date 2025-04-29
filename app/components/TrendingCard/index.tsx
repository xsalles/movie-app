import { View, TouchableOpacity, Image, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function TrendingCard({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity>
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="w-full h-full mt-1">
          <Text className="text-white font-bold text-4xl text-center">
            {index + 1}
          </Text>

          <Text
            className="text-light-200 font-bold text-sm mt-2 text-center"
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
