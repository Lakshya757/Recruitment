import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Table from "./components/Table";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Entry from "./components/Entry";
const Stack = createStackNavigator();




let data = [];
let sheets = [];
export default function App() {
  const [dat, setDat] = useState([]);

  const [sheetname, setSheetname] = useState("Eng%205%20to%208");
  const [range, setRange] = useState("A1:R5");

  const getSheets = async () => {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/10hIAQfbMwCzq--4-rrR_ROITjmrAkLe6_aq6hP1WlGs?key=AIzaSyAGmHlfjxg8TVfJppBO5ckv3CrG_5hkT9w`
      );

      const dataCollected = await res.json();
      const xsheet = dataCollected.sheets;

      sheets = xsheet;
      setDat(xsheet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //getData();
    getSheets();
  }, []);

  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerTitle:'Recruiter',
        }}
      >
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="Home" component={Home} options={{headerStyle:{alignSelf:'center'}}} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
