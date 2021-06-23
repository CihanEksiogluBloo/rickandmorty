import React, { useContext, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Text, Tile } from "react-native-elements";
import { Context as EpisodeContext } from "../contexts/EpisodeContext";

const EpisodesScreen = ({ navigation }) => {
  const { fetchEpisodes, state, resetEpisodesDetail, resetEpisodeCharacters } =
    useContext(EpisodeContext);

  useEffect(() => {
    fetchEpisodes({ page: null });
  }, []);

  return (
    <View style={styles.container}>
      {
        //state.episodes control - loading
        state.episodes.info ? (
          <FlatList
            data={state.episodes.results}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={
              //state.episodes control it's really need that
              state.episodes ? (
                <View style={styles.listFooterContainer}>
                  {
                    //prev page control
                    state.episodes.info.prev ? (
                      <TouchableOpacity
                        onPress={() => {
                          fetchEpisodes({
                            page: state.episodes.info.prev.split("?")[1],
                          });
                        }}
                      >
                        <Text style={styles.pageButton}>Prev</Text>
                      </TouchableOpacity>
                    ) : null
                  }

                  {
                    //next page control
                    state.episodes.info.next ? (
                      <TouchableOpacity
                        onPress={() => {
                          fetchEpisodes({
                            page: state.episodes.info.next.split("?")[1],
                          });
                        }}
                      >
                        <Text style={styles.pageButton}>Next</Text>
                      </TouchableOpacity>
                    ) : null
                  }
                </View>
              ) : (
                <ActivityIndicator size={75} color="#0000ff" />
              )
            }
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    resetEpisodeCharacters(),
                      resetEpisodesDetail(),
                      navigation.navigate("EpisodeDetail", { url: item.url });
                  }}
                >
                  <View style={styles.episodeContainer}>
                    <Tile
                      imageSrc={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/320px-Rick_and_Morty.svg.png",
                      }}
                      featured
                      caption={item.episode}
                      containerStyle={styles.imageContainer}
                      imageContainerStyle={{ width: 250, height: 73 }}
                      captionStyle={{ color: "red" }}
                      onPress={() => {
                        resetEpisodeCharacters(),
                          resetEpisodesDetail(),
                          navigation.navigate("EpisodeDetail", {
                            url: item.url,
                          });
                      }}
                    />

                    <View style={styles.episodeairContainer}>
                      <Text style={styles.episodeName}>{item.name}</Text>
                      <Text style={styles.airdate}>{item.air_date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ActivityIndicator size={75} color="#0000ff" />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#08B1C9",
    fontSize: 22,
    fontWeight: "bold",
    color: "#F9F7F7",
  },
  listFooterContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    margin: 5,
  },
  airdate: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    color: "#535962",
  },
  episodeName: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#535962",
  },
  imageContainer: {
    width: 260,
    height: 83,
    alignItems: "center",
    margin: 5,
    padding: 10,
  },
  episodeairContainer: {
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
  },
  episodeContainer: {
    alignItems: "center",
    margin: 10,
    backgroundColor: "#9BE3DE90",
    borderRadius: 10,
  },
});

export default EpisodesScreen;
