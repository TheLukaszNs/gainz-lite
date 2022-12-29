import { createThemeContext } from "./theme/contextFactory";
import { Theme } from "./theme/types";

const theme = {
  colors: {
    $background: "#292828",
  },
  fontSizes: {},
  spacing: {},
} satisfies Theme;

const { ThemeContext, ThemeProvider } = createThemeContext<typeof theme>();

export { ThemeContext, ThemeProvider, theme };
