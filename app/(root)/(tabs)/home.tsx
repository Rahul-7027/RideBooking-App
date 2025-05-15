import { SignOutButton } from '@/components/SignOutButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={styles.text}>
          Hello {user?.emailAddresses?.[0]?.emailAddress || 'User'}
        </Text>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <Link href={"/(auth)/sigin"} asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>Sign in</Text>
          </Pressable>
        </Link>

        <Link href="/(auth)/sigup" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>Sign up</Text>
          </Pressable>
        </Link>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  link: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
  },
});
