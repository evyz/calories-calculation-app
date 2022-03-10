import { View, Text, StyleSheet, Button } from "react-native";

export default TitleComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>TitleComponent</Text>
      <Button
        title="АВТОРИЗАЦИЯ"
        onPress={() => navigation.navigate("login")}
      />
      <Button
        title="Регистрация"
        onPress={() => navigation.navigate("registerStep1")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
