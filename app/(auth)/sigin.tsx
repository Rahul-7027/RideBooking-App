import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

const Sigin = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [data, setData] = useState({
    email: '',
    password: '',
  });


  const onSignUpPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, data]);


  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header Image */}
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-full" resizeMode="cover" />
          <Text className="absolute bottom-5 left-5 text-3xl text-black font-semibold">
            Create Your Account
          </Text>
        </View>

        {/* Form Fields */}
        <View className="p-6 space-y-6">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={data.email}
            onChangeText={(text) => setData({ ...data, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry
            value={data.password}
            onChangeText={(text) => setData({ ...data, password: text })}
          />
        </View>

        <CustomButton
          title='Sigin'
          className=''
          onPress={onSignUpPress }
        />
        
        <OAuth />

          <Link
            href={"/(auth)/sigup"}
            className="text-lg text-center text-general-200 mt-10"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
      </ScrollView>
    </View>
  );
};

export default Sigin;
