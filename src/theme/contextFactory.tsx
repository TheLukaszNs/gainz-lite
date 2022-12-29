import { Context, createContext, useContext, useState } from "react";
import { Theme, ThemeContextType, ThemeMode } from "./types";

export const createUseTheme = <T extends Theme>(
  context: Context<ThemeContextType<T> | null>,
) => {
  return () => {
    const themeContext = useContext(context);

    if (!themeContext) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }

    return themeContext;
  };
};

export const createThemeProvider = <T extends Theme>(
  context: Context<ThemeContextType<T> | null>,
) => {
  return ({
    children,
    defaultMode,
    theme,
  }: {
    children: React.ReactNode;
    theme: T;
    defaultMode: ThemeMode;
  }) => {
    const [mode, setMode] = useState<ThemeMode>(defaultMode);

    const setTheme = (theme: ThemeMode) => {
      setMode(theme);
    };

    return (
      <context.Provider
        value={{
          setTheme,
          theme,
        }}
      >
        {children}
      </context.Provider>
    );
  };
};

export const createThemeContext = <T extends Theme>() => {
  const ThemeContext = createContext<ThemeContextType<T> | null>(null);
  const ThemeProvider = createThemeProvider(ThemeContext);
  const useTheme = createUseTheme(ThemeContext);

  return {
    ThemeContext,
    ThemeProvider,
    useTheme,
  };
};
