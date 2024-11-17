import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SheetPicker from "./components/SheetPicker";


let data = [];
let sheet;
export default function App() {
  const [dat, setDat] = useState([]);


  const [sheetname, setSheetname] = useState("Eng%205%20to%208");
  const [range, setRange] = useState("A1:A6");





  const getSheets = async () => {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/10hIAQfbMwCzq--4-rrR_ROITjmrAkLe6_aq6hP1WlGs?key=AIzaSyAGmHlfjxg8TVfJppBO5ckv3CrG_5hkT9w`
      );
      // console.log(res.url)

      const dataCollected = await res.json();
      const thing = dataCollected.sheets;
      sheet = thing;

      console.log(sheet);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/10hIAQfbMwCzq--4-rrR_ROITjmrAkLe6_aq6hP1WlGs/values/${sheetname}!${range}?key=AIzaSyAGmHlfjxg8TVfJppBO5ckv3CrG_5hkT9w`
        // `https://sheets.googleapis.com/v4/spreadsheets/10hIAQfbMwCzq--4-rrR_ROITjmrAkLe6_aq6hP1WlGs?key=AIzaSyAGmHlfjxg8TVfJppBO5ckv3CrG_5hkT9w`
      );
      // console.log(res.url)

      const dataCollected = await res.json();

      data = dataCollected;
      setDat(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  


  useEffect(() => {
    getSheets();
    getSheets();
  }, []);

  return (
    <View style={{ marginTop: 50 }}>
      <SheetPicker item={sheet} />
      <TouchableOpacity
        onPress={()=>{console.log(sheet)}}
      >
        <Text>X</Text>
      </TouchableOpacity>
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
