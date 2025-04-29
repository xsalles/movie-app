import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import CardMovie from "../components/CardMovie";
import { getTrandingMovies } from "@/services/appwrite";
import TrendingCard from "../components/TrendingCard";

export default function Home() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrandingMovies);

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() =>
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

        {movieLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError || trendingError ? (
          <Text className="text-white text-center">
            Error: {movieError?.message || trendingError?.message}
          </Text>
        ) : (
          <View>
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/Search")}
            />

            {trendingMovies && (
              <View className="mt-10 ">
                <Text className="font-bold text-lg text-white mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  horizontal
                  keyExtractor={(item) => item.movie_id.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 20,
                  }}
                  className="mb-4 mt-3"
                />
              </View>
            )}

            <Text className="text-white  text-lg font-bold mb-3">
              Latest Movies
            </Text>
            <FlatList
              data={movie?.results}
              renderItem={({ item }) => <CardMovie {...item} />}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              className="mt-2 pb-32 w-full"
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                paddingRight: 5,
                gap: 20,
                marginBottom: 10,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
