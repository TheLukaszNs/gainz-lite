import { registerRootComponent } from "expo";
import { Text } from "react-native";
import { theme, ThemeProvider } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <Text>Test</Text>
    </ThemeProvider>
  );
};

registerRootComponent(App);
