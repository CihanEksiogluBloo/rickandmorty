import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  LogBox,
} from "react-native";
import { Text, Image } from "react-native-elements";
import { Context as EpisodeContext } from "../contexts/EpisodeContext";

const EpisodeDetail = ({ route, navigation }) => {
  const { url } = route.params;
  const { fetchEpisodeDetail, state, fetchEpisodeCharacters, resetCharacter } =
    useContext(EpisodeContext);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    fetchEpisodeDetail(url.split("/")[url.split("/").length - 1]);
  }, []);

  useEffect(() => {
    fetchEpisodeCharacters(state.episodeDetail.characters);
  }, [state.episodeDetail]);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.ScrollViewWrap}
      >
        {
          // Episode Detail check - loading
          state.episodeDetail ? (
            <View>
              <Text h2 h2Style={styles.EpisodeName}>
                {state.episodeDetail.name}
              </Text>

              <View style={styles.episodeDateContainer}>
                <Text style={styles.episodeDate}>
                  {state.episodeDetail.episode}
                </Text>
                <Text style={styles.episodeDate}>
                  {state.episodeDetail.air_date}
                </Text>
              </View>

              <Text style={styles.characterHeaderTitle}>
                Characters in the Episode
              </Text>
            </View>
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size={75} color="#0000ff" />
            </View>
          )
        }

        {state.episodeCharacters.length > 0 ? (
          <FlatList
            data={state.episodeCharacters}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View style={{ flex: 1, marginVertical: 3 }}>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      resetCharacter(),
                        navigation.navigate("Character", { id: item.id });
                    }}
                  >
                    <Image
                      style={styles.imageStyles}
                      source={{
                        uri: item.image,
                      }}
                    />
                    <Text style={styles.charName}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={50} color="#0000ff" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  episodeDate: {
    padding: 5,
    color: "#6E5773",
  },
  ScrollViewWrap: {
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "space-evenly",
  },
  EpisodeName: {
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingHorizontal: 15,
    color: "#EF7B7B",
    margin: 10,
    borderRadius: 10,
  },
  characterHeaderTitle: {
    backgroundColor: "#EF7B7B",
    alignSelf: "center",
    margin: 5,
    fontSize: 20,
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  episodeDateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: "#53596290",
  },
  charName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6E5773",
  },
  imageStyles: { width: 150, height: 150, borderRadius: 5 },
});

export default EpisodeDetail;
