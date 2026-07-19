import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

export default function Index() {

  return (
    <View style={styles.container}>
      <Link href="/benchmark" style={styles.button}>Welcome to the Index Page</Link>
      <Text style={styles.button}>This is the main entry point of the application.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232946',
        padding: 53
    },
    button: {
        color: '#fffffe',
    }
})