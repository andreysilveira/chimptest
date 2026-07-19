import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#232946" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#232946" },
          animation: "slide_from_right",
        }}
      ></Stack>
    </>
  );
}
