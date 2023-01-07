import { registerRootComponent } from "expo";
import { Text } from "react-native";
import { HomeScreen } from "./screens/home";
import { theme, ThemeProvider } from "./theme";
import { TRPCProvider } from "./utils/trpc";

const App = () => {
  return (
    <TRPCProvider>
      <ThemeProvider theme={theme} defaultMode="light">
        <HomeScreen />
      </ThemeProvider>
    </TRPCProvider>
  );
};

registerRootComponent(App);
