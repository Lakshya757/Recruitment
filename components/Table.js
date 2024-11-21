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
let heads;

export default function Table({ item }) {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Sheet");
  const [firstSelect, setFirstSelect] = useState(false);
  const [showNames, setShowNames] = useState(true);
  const [showAlert, setShowAlert] = useState(true)

  const [sheetName, setsheetName] = useState("Master");

  const getData = async (name) => {
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/10hIAQfbMwCzq--4-rrR_ROITjmrAkLe6_aq6hP1WlGs/values/${name}!A1:Z1000?key=AIzaSyAGmHlfjxg8TVfJppBO5ckv3CrG_5hkT9w`
      );

      const dataCollected = await res.json();
      const x = dataCollected.values;

      data = x;

      removeFirstElement(data)

    } catch (error) {
      console.log(error);
    }
  };

  const handleHeader = async(name) => {
    try{
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/10hIAQfbMwCzq--4-rrR_ROITjmrAkLe6_aq6hP1WlGs/values/${name}!A1:Z1000?key=AIzaSyAGmHlfjxg8TVfJppBO5ckv3CrG_5hkT9w`
      );

      const dataCollected = await res.json();

      const x = dataCollected.values

      heads=x[0]



    }catch(error){
      console.log(error)
    }
    // for(var i=0;i<200;i++){
    //   heads[i]=data[i]
    // }
  };

  const removeFirstElement=(arr)=>{
    if (Array.isArray(arr) && arr.length > 0) {
        arr.shift(); // Removes the first element
    }
    return arr; // Returns the modified array
}

  return (
    <View>
      <View style={styles.selector_container}>
        <View style={styles.selector}>
          <TouchableOpacity
            style={styles.selector_button}
            onPress={() => {
              setVisible(!visible);
              setShowAlert(!showAlert)
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 19, color: "#FFF" }}>
                  {placeholder}
                </Text>
              </View>
              <View>
                <Ionicons name="caret-down-outline" color={'white'}  size={25}></Ionicons>
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
                      handleHeader(item.properties.title);
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
        {!firstSelect && showAlert &&(
          <View style={{ marginTop:(Dimensions.get('window').width/1.5) }}>
            <Text style={{fontSize:25,paddingBottom:50,color:'#888',fontWeight:'bold'}}>Select a sheet to be displayed</Text>
          </View>
        )}
      </View>

      {firstSelect &&
        showNames && ( //names
          <View style={{ marginTop: 15 }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={styles.name_container}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Profile", {
                        a: item,
                        headers: heads,
                      });
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
    backgroundColor: "#777",
    // borderTopWidth:1
  },
  title: {
    fontSize: 18,
    color: "#FFF",
  },
  selector_container: {
    alignItems: "center",
    marginTop:-45
  },
  selector: {
    width: Dimensions.get("window").width -3,
    backgroundColor: "#777",
    borderRadius:6
  },
  selector_button: {
    padding: 8,
  },
  sheetList_container: {
    backgroundColor: "#F1F1F1",
  },
  name_container: {
    padding: 5,
  },
  names: {
    fontSize: 17,
    padding: 9,
    backgroundColor: "#CCC",
  },
});
