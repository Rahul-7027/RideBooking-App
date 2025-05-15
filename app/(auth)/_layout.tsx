import { Stack } from 'expo-router';


export default function Layout() {


  return (
    <>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sigup" options={{ headerShown: false }} />
        <Stack.Screen name="sigin" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
