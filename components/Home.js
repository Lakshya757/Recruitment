import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";



import Table from "./Table";

let data = [];
let sheets = [];
export default function Home() {
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
      <View style={{ marginTop: 50 }}>
        <Table item={sheets} />
      </View>
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
