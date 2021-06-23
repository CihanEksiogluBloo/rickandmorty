import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { Context as EpisodeContext } from "../contexts/EpisodeContext";
import Characterstatus from "../components/Characterstatus";

const Character = ({ route, navigation }) => {
  const { id } = route.params;
  const { state, fetchCharacter } = useContext(EpisodeContext);

  useEffect(() => {
    fetchCharacter(id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          containerStyle={styles.characterImage}
          source={{
            uri: state.character.image,
          }}
        />
        {
          //state character array control with random key
          state.character.location ? (
            <View style={styles.container}>
              <View style={styles.infoView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Characterstatus
                    header={"Name"}
                    value={state.character.name}
                  />
                  <Characterstatus
                    header={"Gender"}
                    value={state.character.gender}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Characterstatus
                    header={"Species"}
                    value={state.character.species}
                  />
                  <Characterstatus
                    header={"Origin"}
                    value={state.character.origin.name}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Characterstatus
                    header={"Type"}
                    value={state.character.type}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Characterstatus
                    header={"Location"}
                    value={state.character.location.name}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <ActivityIndicator size={75} color="#0000ff" />
            </View>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  characterImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
    margin: 5,
    borderRadius: 5,
  },
  infoView: {
    backgroundColor: "#424874",
    borderRadius: 20,
    padding: 5,
  },
  imageContainer: { flex: 1, margin: 10 },
});
export default Character;
