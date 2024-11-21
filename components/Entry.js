import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Entry() {
  const navigation = useNavigation();

  return (
    <View style={styles.logo_container}>
      <View style={styles.logo_recruiter}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={{ width: 550, height: 300 }}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{
            backgroundColor: "#464F60",
            borderRadius: 8,
            height: 75,
            width: 275,
            alignItems: "center",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            View Applications
          </Text>
          <Ionicons
            name="arrow-forward-outline"
            color={"white"}
            size={25}
            style={{ marginLeft: 25, marginRight: -10 }}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.logo_smrj}>
        <Image
          source={require("../assets/smrj-text.png")}
          style={{
            width: 120,
            height: 61.27,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo_container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo_recruiter: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 275,
  },
  logo_smrj: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
});
