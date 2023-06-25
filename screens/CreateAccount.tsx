import "@walletconnect/react-native-compat";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { colors } from "../utils/colors";
import { useState } from "react";

interface Props {
  navigation: any;
  route: any;
  setWallet: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSeedPhrase: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CreateAccount = ({ navigation, setWallet, setSeedPhrase }: Props) => {
  const [newSeedPhrase, setNewSeedPhrase] = useState<string | null>();
  const [newWallet, setNewWallet] = useState<any>();

  return (
    <View style={styles.mainView}>
      <Text style={styles.logo}>light.storm</Text>

      {!newSeedPhrase && (
        <TouchableOpacity
          style={styles.generateButton}
          onPress={async () => {
            setNewSeedPhrase("Loading...");

            try {
              const res = await fetch("http://localhost:8000/create_wallet", {
                method: "POST",
              });

              const wallet = await res.json();

              setNewSeedPhrase(wallet.wallet.mnemonic);
              setNewWallet(wallet.wallet.address);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: "white",
              fontSize: 14,
            }}
          >
            Generate Seed Phrase
          </Text>
        </TouchableOpacity>
      )}

      {newSeedPhrase && <Text style={styles.seedPhrase}>{newSeedPhrase}</Text>}

      {newSeedPhrase && (
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => {
            Clipboard.setStringAsync(newSeedPhrase);
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              color: "white",
            }}
          >
            Copy To Clipboard
          </Text>
        </TouchableOpacity>
      )}

      {newSeedPhrase && (
        <TouchableOpacity
          style={styles.backToHome}
          onPress={() => {
            setSeedPhrase(newSeedPhrase);
            setWallet(newWallet);
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
            }}
          >
            Open Your Wallet
          </Text>
        </TouchableOpacity>
      )}

      {!newSeedPhrase && (
        <TouchableOpacity
          style={styles.backToHome}
          onPress={() => {
            navigation.navigate("Getting Started");
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
            }}
          >
            Back To Home
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { fontFamily: "Poppins_400Regular", fontSize: 25 },
  generateButton: {
    backgroundColor: colors.main,
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 10,
  },
  backToHome: {
    backgroundColor: colors.grey,
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 10,
  },
  seedPhrase: {
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: 16,
  },
});

export default CreateAccount;
