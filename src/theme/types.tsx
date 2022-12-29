export type Theme = {
  colors: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: number;
  };
  fontSizes: {
    [key: string]: number;
  };
};

export type ThemeMode = "light" | "dark";

export type ThemeContextType<T extends Theme> = {
  theme: T;
  setTheme: (theme: ThemeMode) => void;
};
