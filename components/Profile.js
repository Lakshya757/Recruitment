import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  FlatList,
  FlatListComponent,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export default function Profile({ route }) {
  const { a, headers } = route.params;
  const [url, setUrl] = useState();

  const list1Ref = useRef(null); // Ref for the first FlatList
  const list2Ref = useRef(null); // Ref for the second FlatList
  const isSyncing = useRef(false);

  const handleScroll = (event, targetListRef) => {
    if (isSyncing.current) return; // Skip if already syncing
    isSyncing.current = true; // Set syncing flag

    const offset = event.nativeEvent.contentOffset.y;
    if (targetListRef.current) {
      targetListRef.current.scrollToOffset({ offset, animated: false });
    }

    setTimeout(() => {
      isSyncing.current = false; // Reset syncing flag after execution
    }, 0); // Release flag immediately
  };

  useEffect(() => {
    setUrl(a[9]);
  }, []);

  return (
    <View>
      <View
        style={{
          // alignSelf: "center",
          width: "100",
          marginTop: 3,
        }}
      >
        <OpenURLButton url={url}>Open CV</OpenURLButton>
      </View>
      <View
        style={{
          display: "flex",
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ref={list1Ref}
            showsVerticalScrollIndicator={false}
            style={styles.value_list}
            data={headers}
            renderItem={({ item }) => (
              <View style={styles.value_view}>
                <Text style={styles.value_text}>{item}</Text>
              </View>
            )}
            onScroll={(e) => handleScroll(e, list2Ref)} // Sync second list
            bounces={false}
/>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={list2Ref}
            style={styles.value_list}
            data={a}
            renderItem={({ item }) => (
              <View style={styles.value_view}>
                <Text style={styles.value_text}>{item}</Text>
              </View>
            )}
            onScroll={(e) => handleScroll(e, list1Ref)} // Sync first list
            bounces={false}
            
          />
        </View>
      </View>
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
    marginTop: -45,
  },
  selector: {
    borderWidth: 1,
    width: Dimensions.get("window").width - 1,
    backgroundColor: "#777",
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
  value_text: {
    height: 70,
  },
  value_view: {
    flexDirection:'row',
    backgroundColor:'#999',
    paddingVertical:2
  },
  value_list: {},
});
