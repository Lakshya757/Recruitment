import {} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function Table({ item }) {
  return (
    <View style={styles.item}>
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
      />
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
