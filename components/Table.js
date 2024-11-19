import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";




let data = [];

export default function Table({ item }) {
  const navigation = useNavigation();


  const [visible, setVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Sheet");
  const [firstSelect, setFirstSelect] = useState(false);
  const [showNames, setShowNames] = useState(true);

  const [sheetName, setsheetName] = useState("Master");

  const getData = async (name) => {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/10hIAQfbMwCzq--4-rrR_ROITjmrAkLe6_aq6hP1WlGs/values/${name}!A2:Z1000?key=AIzaSyAGmHlfjxg8TVfJppBO5ckv3CrG_5hkT9w`
      );

      const dataCollected = await res.json();
      const x = dataCollected;

      data = x.values;
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.selector_container}>
        <View style={styles.selector}>
          <TouchableOpacity
            style={styles.selector_button}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 19, color:'#FFF' }}>{placeholder}</Text>
              </View>
              <View>
                <Ionicons name="caret-down-outline" size={25}></Ionicons>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {visible && (
          <View style={styles.sheetList_container}>
            <FlatList
              style={styles.sheetList}
              data={item}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      setFirstSelect(true);
                      setShowNames(true);
                      setPlaceholder(item.properties.title);
                      setsheetName(item.properties.title);
                      getData(item.properties.title);
                      setVisible(false);
                      console.log(data);
                    }}
                  >
                    <Text style={styles.title}>{item.properties.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      </View>
      <View style={{ alignItems: "center" }}>
        {!firstSelect && (
          <View style={{ marginTop: Dimensions.get("screen").width / 1.5 }}>
            <Text>Select a sheet to be displayed</Text>
          </View>
        )}
      </View>

      {firstSelect &&
        showNames && ( //names
          <View style={{marginTop:25}}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={styles.name_container}>
                  <TouchableOpacity
                    onPress={()=>{
                      navigation.navigate('Profile',)
                    }}
                  >
                    <Text style={styles.names}>{item[2]}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // backgroundColor: "#3A3A3A",
    padding: 13,
    marginVertical: 8,
    marginHorizontal: 16,
    // borderBottomWidth: 1,
    backgroundColor:"#777"
    // borderTopWidth:1
  },
  title: {
    fontSize: 18,
    color: "#FFF",
  },
  selector_container: {
    alignItems: "center",
  },
  selector: {
    borderWidth: 1,
    width: Dimensions.get("window").width - 1,
    backgroundColor:'#777',
  },
  selector_button: {
    padding: 8,
  },
  sheetList_container: {
    backgroundColor: "#F1F1F1",
  },
  name_container: {
    padding:5,
  },
  names: {
    fontSize: 17,
    padding: 9,
    backgroundColor:'#CCC'
  },
});
