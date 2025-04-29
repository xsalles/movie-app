// track the searchs made by users
import { Client, Databases, ID, Query } from "react-native-appwrite";

if (
  !process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ||
  !process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ||
  !process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID
) {
  throw new Error("Appwrite environment variables are not set");
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    // check if a record of that search has already been stored
    if (result.documents.length > 0) {
      const existingRecord = result.documents[0];

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingRecord.$id,
        {
          count: existingRecord.count + 1,
        }
      );
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        movie_id: movie.id,
        title: movie.title,
      });
    }
  } catch (error) {
    throw error;
  }

  // if yes, update the record incrementing the searchField
  // if not, create a new record
};

export const getTrandingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    throw error;
  }
}