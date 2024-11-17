import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

var x = 0;

export default function SheetPicker({ item }) {
  const [visible, setVisible] = useState(false);
  const [button, setButton] = useState(true);
  const [placeholder, setPlaceholder] = useState("SLECT YO SHIT");

  const [x, setX] = useState();

  return (
    <View style={{ marginTop: 50 }}>
      {button && (
        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
            setButton(false);
          }}
        >
          <Text>{placeholder}</Text>
        </TouchableOpacity>
      )}

      <View>
        {visible && (
          <View>
            <FlatList
              data={item}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <TouchableOpacity
                    onPress={() => {
                      setX(item.properties.title);
                      setButton(true);
                      setPlaceholder(x)
                      setVisible(false);
                    }}
                  >
                    <Text style={styles.title}>{item.properties.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            
          </View>
        )}
        <Text>{x}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#3A3A3A",
    padding: 13,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
    color: "#AAA",
  },
});
