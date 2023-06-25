import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import GettingStarted from "./GettingStarted";
import { useFonts } from "expo-font";
import {
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateAccount from "./CreateAccount";
import { useState } from "react";
import WalletView from "./wallet/WalletView";
import RecoverWallet from "./RecoverWallet";

const Stack = createNativeStackNavigator();

export default function App() {
  const [wallet, setWallet] = useState<string>();
  const [seedPhrase, setSeedPhrase] = useState<string>();

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={
          wallet && seedPhrase ? "Your Wallet" : "Getting Started"
        }
      >
        {wallet && seedPhrase ? (
          <Stack.Screen name="Your Wallet" options={{ headerShown: false }}>
            {(props) => (
              <WalletView
                {...props}
                seedPhrase={seedPhrase}
                wallet={wallet}
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Getting Started"
              options={{ headerShown: false }}
              component={GettingStarted}
            />
            <Stack.Screen
              name="Create Account"
              options={{ headerShown: false }}
            >
              {(props) => (
                <CreateAccount
                  {...props}
                  setWallet={setWallet}
                  setSeedPhrase={setSeedPhrase}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Recover Account"
              options={{ headerShown: false }}
            >
              {(props) => (
                <RecoverWallet
                  {...props}
                  setWallet={setWallet}
                  setSeedPhrase={setSeedPhrase}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
