import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { Button, Provider } from "@ant-design/react-native";
import { LanguageProvider } from "./contexts/useLanguage/useLanguage";
import { ThemeProvider } from "./contexts/useTheme/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./contexts/useUser/useUser";
import { AppProvider } from "./contexts/useApp/useApp";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import HandleRouting from "./HandleRouting";

const queryClient = new QueryClient();

export default function App() {
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProvider>
            <UserProvider>
              <AppProvider>
                <Provider locale={enUS}>
                  <HandleRouting />
                  <Toast />
                  <StatusBar />
                </Provider>
              </AppProvider>
            </UserProvider>
          </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    direction: "ltr",
    marginTop: 50,
  },
});
