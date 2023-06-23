import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";

const GettingStarted = ({ navigation }: { navigation: any }) => (
  <View style={styles.mainView}>
    <Text style={styles.logo}>light.storm</Text>

    <TouchableOpacity
      style={styles.createWalletButton}
      onPress={() => {
        navigation.navigate("Create Account");
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_400Regular",
          color: "white",
          fontSize: 14,
        }}
      >
        Create Wallet
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.recoverWalletButton}>
      <Text
        style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 14,
        }}
      >
        Recover Wallet
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { fontFamily: "Poppins_400Regular", fontSize: 25 },
  createWalletButton: {
    backgroundColor: colors.main,
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 10,
  },
  recoverWalletButton: {
    backgroundColor: colors.grey,
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 10,
  },
});

export default GettingStarted;
