import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import EpisodeDetail from "./src/screen/EpisodeDetail";
import EpisodesScreen from "./src/screen/EpisodesScreen";
import Character from "./src/screen/Character";
import { Provider as EpisodeProvider } from "./src/contexts/EpisodeContext";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Episodes"
        component={EpisodesScreen}
        options={{
          title: "Rick And Morty",
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
            color: "white",
          },
          headerStyle: { backgroundColor: "#056674" },
        }}
      />
      <Stack.Screen
        name="EpisodeDetail"
        component={EpisodeDetail}
        initialParams={{ title: "Episode" }}
        options={{
          title: "Episode",
          headerStyle: { backgroundColor: "#F29191" },
          headerTitleStyle: { fontWeight: "bold", color: "white" },
        }}
      />
      <Stack.Screen
        name="Character"
        component={Character}
        initialParams={{ title: "Character" }}
        options={{
          headerStyle: { backgroundColor: "#424874" },
          headerTitleStyle: { fontWeight: "bold", color: "white" },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <EpisodeProvider>
        <NavigationContainer>{<RootStack />}</NavigationContainer>
      </EpisodeProvider>
    </SafeAreaProvider>
  );
}
