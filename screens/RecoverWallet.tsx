import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../utils/colors";
import { useState } from "react";

interface Props {
  setSeedPhrase: React.Dispatch<React.SetStateAction<string | undefined>>;
  setWallet: React.Dispatch<React.SetStateAction<string | undefined>>;
  navigation: any;
}

const RecoverWallet = ({ setSeedPhrase, setWallet, navigation }: Props) => {
  const [value, setValue] = useState<string>();
  const [nonValid, setNonValid] = useState<boolean>(false);

  return (
    <View style={styles.mainView}>
      <Text style={styles.logo}>light.storm</Text>

      <View style={styles.seedPhraseInput}>
        <TextInput
          editable
          multiline
          numberOfLines={3}
          value={value}
          onChangeText={(val) => {
            setNonValid(false);
            setValue(val);
          }}
          style={{ paddingHorizontal: 10 }}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={async () => {
          try {
            const formData = new FormData();
            formData.append("mnemonic", value!);

            const res = await fetch("http://localhost:8000/recover_wallet", {
              method: "POST",
              body: JSON.stringify({
                mnemonic: value!,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });

            if (res.status === 500) {
              setNonValid(true);

              return;
            }

            setNonValid(false);

            const wallet = await res.json();

            setWallet(wallet.address);
            setSeedPhrase(wallet.mnemonic);
          } catch (err) {
            console.log(err);
          }
        }}
        disabled={value?.split(" ").length !== 12 || value.slice(-1) === " "}
      >
        {value?.split(" ").length !== 12 || value.slice(-1) === " " ? (
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: "white",
              fontSize: 14,
            }}
          >
            Wrong Seed Phrase
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: "white",
              fontSize: 14,
            }}
          >
            Recover Wallet
          </Text>
        )}
      </TouchableOpacity>

      {nonValid && <Text style={styles.error}>Invalid seed phrase</Text>}

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
  seedPhraseInput: {
    backgroundColor: "#e9ecf0",
    borderBottomColor: colors.main,
    marginTop: 20,
    width: "75%",
    borderBottomWidth: 1,
  },
  buttonStyle: {
    backgroundColor: colors.main,
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 20,
  },
  backToHome: {
    backgroundColor: colors.grey,
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 11,
    marginTop: 10,
  },
  error: {
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 10,
    color: colors.main,
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: 16,
  },
});

export default RecoverWallet;
