import { View, Image, ScrollView, ActivityIndicator, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

export default function Home() {
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;
  const posterWidth = (screenWidth - 60) / 3;

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(
    () =>
      fetchMovies({
        query: "",
      })
  );

  return (
    <View className="flex-1 bg-primary w-full">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5 z-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {movieLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError ? (
          <Text className="text-white text-center">
            Error: {movieError?.message}
          </Text>
        ) : (
          <View>
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/Search")}
            />
            <Text className="text-white text-bold">Latest Movies</Text>
            <FlatList
              data={movie?.results}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              className="mt-2 pb-32 w-fullw"
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                paddingRight: 5,
                gap: 20,
                marginBottom: 10,
              }}
              renderItem={({item}) => (
                <View className="mt-5 flex-1 items-center">
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="text-white font-bold text-sm">{item.title}</Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
