export const tokens = {
    grey: {
      //100: "#f0f0f3",
      //200: "#e1e2e7",
      //300: "#d1d3da",
      //400: "#c2c5ce",
      //500: "#b3b6c2",
      //600: "#8f929b",
      //700: "#6b6d74",
      //800: "#48494e",
      //900: "#242427",

      100: "#f0f0f3",
      200: "#e1e2e7",
      300: "#d1d3da",
      400: "#8f9296",
      500: "#76797e",
      600: "#5d6066",
      700: "#45494f",
      800: "#2e3339",
      900: "#191e25",
    },
    primary: {
      // light green
      //100: "#d0fcf4",
      //200: "#a0f9e9",
      //300: "#71f5de",
      //400: "#41f2d3",
      //500: "#12efc8",
      //600: "#0ebfa0",
      //700: "#0b8f78",
      //800: "#076050",
      //900: "#043028",

      /** CSS DARK THEME PRIMARY COLORS */
      100: "#2196f3",
      200: "#50a1f5",
      300: "#6eacf6",
      400: "#87b8f8",
      500: "#9dc3f9",
      600: "#b2cffb",
    },
    secondary: {
      // yellow
      500: "#fe755f",
    },
    tertiary: {
      // purple - 500: "#8884d8"
      500: "#fff49b",
    },
    background: {
      light: "#2e3339",
      main: "#1f2026",
    },
  };
  
  // mui theme settings
  export const themeSettings = {
    palette: {
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
        light: tokens.primary[400],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
      },
      tertiary: {
        ...tokens.tertiary,
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        default: tokens.background.main,
        light: tokens.background.light,
      },
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 800,
        color: tokens.grey[200],
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600,
        color: tokens.grey[300],
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
        color: tokens.grey[300],
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 10,
        color: tokens.grey[400],
      },
    },
  };