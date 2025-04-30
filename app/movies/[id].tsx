import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  Linking,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import { minutesToHours } from "@/utils/minutesToHours";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[447px]"
            resizeMode="cover"
          />
        </View>

        <View className="absolute bg-white w-12 h-12 rounded-[50%] flex items-center justify-center right-[23px] top-[420px] cursor-pointer">
          <Image source={icons.play} style={{ width: 23, height: 23 }} />
        </View>

        <View className="flex-col px-5">
          <View className="w-fit h-fit flex-col mt-4">
            <Text numberOfLines={1} className="text-white font-bold text-xl">
              {movie?.title}
            </Text>
            <View className="flex-row items-center gap-2.5 mt-1.5">
              <Text className="text-light-200 font-normal text-sm">
                {movie?.release_date.slice(0, 4)}
              </Text>
              <Image source={icons.dot} style={{ width: 3, height: 3 }} />
              <Text className="text-light-200 font-normal text-sm">
                {minutesToHours(movie?.runtime || 0)}
              </Text>
            </View>

            <View className="flex-row gap-2.5">
              <View className="flex-row items-center gap-1 mt-4 bg-dark-100 w-fit px-2.5 py-2 rounded-[4px] ">
                <Image source={icons.star} />
                <Text className="text-light-200 font-normal text-sm mt-1">
                  <Text className="text-white font-bold text-sm">
                    {movie?.vote_average.toFixed(1)}
                  </Text>
                  /10
                </Text>
              </View>

              <View className="flex-row items-center gap-1 mt-4 bg-dark-100 w-fit px-2.5 py-2 rounded-[4px] ">
                <Text className="text-light-200 font-normal text-sm mt-1">
                  {movie?.vote_count}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-col gap-1 mt-7">
            <Text className="text-light-200 ">Overview</Text>
            <Text className="text-white text-sm">{movie?.overview}</Text>
          </View>

          <View className="flex-col gap-1 mt-6">
            <Text className="text-light-200">Status</Text>
            <Text className="text-light-200 font-bold">{movie?.status}</Text>
          </View>

          <View className="flex-col gap-1 mt-6">
            <Text className="text-light-200">Generes</Text>
            <View className="flex-row gap-2.5 mt-2 flex-wrap">
              {movie?.genres.map((genre) => (
                <View className=" w-fit px-2.5 py-2 rounded-[4px] bg-dark-100 mt-2">
                  <Text
                    key={genre.id}
                    className="text-light-200 font-bold text-sm"
                  >
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-col gap-1 mt-6">
            <Text className="text-light-200">Production Countries</Text>
            <View className="flex-row gap-2.5 mt-2 flex-wrap">
              {movie?.production_countries.map((country) => (
                <View className=" w-fit px-2.5 py-2 rounded-[4px] bg-dark-100 mt-2">
                  <Text
                    key={country.iso_3166_1}
                    className="text-light-200 font-bold text-sm"
                  >
                    {country.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-row gap-8 mt-6">
            <View className="flex-col gap-1">
              <Text className="text-light-200">Budget</Text>
              <Text className="text-light-200 font-bold">
                {movie?.budget
                  ? `$${movie.budget.toLocaleString()} million`
                  : "N/A"}
              </Text>
            </View>
            <View className="flex-col gap-1">
              <Text className="text-light-200">Revenue</Text>
              <Text className="text-light-200 font-bold">
                {movie?.revenue
                  ? `$${movie.revenue.toLocaleString()} million`
                  : "N/A"}
              </Text>
            </View>
          </View>

          <View className="flex-col gap-1 mt-6">
            <Text className="text-light-200">Tagline</Text>
            <Text className="text-light-200 text-sm font-bold">
              {movie?.tagline ? movie.tagline : "N/A"}
            </Text>
          </View>

          <View className="flex-col gap-1 mt-6">
            <Text className="text-light-200">Production Companies</Text>
            <View className="flex-row gap-2.5 mt-2 flex-wrap">
              {movie?.production_companies.map((company) => (
                <View className=" w-fit px-2.5 py-2 rounded-[4px] bg-dark-100 mt-2">
                  <Text
                    key={company.id}
                    className="text-light-200 font-bold text-sm"
                  >
                    {company.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {movie?.homepage && (
            <Pressable
              className="w-full py-2.5 px-5 bg-gradient-to-r from-light-100 to-light-200 rounded-[4px] mt-6"
              onPress={() => {
                movie.homepage ? Linking.openURL(movie.homepage) : null;
              }}
            >
              <Text className="text-center text-secondary font-semibold">
                Visit Homepage
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}