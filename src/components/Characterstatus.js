import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const Characterstatus = ({ header, value }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: 25, color: "#FFFFFF99", fontWeight: "bold" },
  value: { fontSize: 15, color: "white", textAlign: "center" },
});

export default Characterstatus;
