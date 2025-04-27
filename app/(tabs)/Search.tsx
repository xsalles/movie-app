import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import CardMovie from "../components/CardMovie";
import { images } from "@/constants/images";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";

export default function Search() {
  const [search, setSearch] = useState("");

  const {
    data: movie = [],
    loading: movieLoading,
    error: movieError,
    refetch: loadMovies,
    reset,
  } = useFetch(() =>
    fetchMovies({
      query: search,
    }), false
  );

  useEffect(() => {
    const funcToCallMovies = setTimeout(async () => {
      if (search.trim()) {
        await loadMovies();

        if (movie?.results.length! > 0 && movie?.results[0]) {
          await updateSearchCount(search, movie.results[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(funcToCallMovies);
  }, [search]);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View className="flex-1 bg-primary w-full">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" />
      <FlatList
        data={movie?.results as Movie[]}
        renderItem={({ item }) => <CardMovie {...item} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View>
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-20 mb-5 mx-auto"
              />
            </View>

            <View>
              <SearchBar
                placeholder="Search for a movie"
                value={search}
                onChangeText={handleSearch}
              />
              <Text className="text-xl text-white font-bold">
                Search results for{" "}
                <Text className="text-blue-500 font-bold">{search}</Text>
              </Text>
            </View>

            {movieLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            )}

            {movieError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {movieError?.message}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {search.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
