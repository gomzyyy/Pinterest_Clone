import { Stack } from "expo-router";
import { Provider } from "react-redux";
import Store from "@/Store/store";

export default function RootLayout() {
  return (
    <Provider store={Store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </Provider>
  );
}

{
  /* <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack> */
}
