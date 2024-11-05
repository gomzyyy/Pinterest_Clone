/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const colors = {
  col:{
    white:'#ffffff',
    Black:'#000000',
    PressedIn:'#a8a8a8',
    PressedIn2:'#cccccc',
    PressedIn3:'#aaaaaa',
    PressedIn4:'#686868',
    PressedIn5:'#eaeaea',
    PressedOut:'#ffffff',
    link:"#4280ef",
    tabActiveGreen:"#7b9654",
    tabActivePink:'#fc6464',
    tabActiveBlue:'#498cff',
    tabActiveYellow:"#ffcd3a",
    filterCol:"rgb(236, 236, 236)",
    dangerRed:"#f21d1d"
  },
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
