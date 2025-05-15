import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={data.name}
            onChangeText={(text) => setData({ ...data, name: text })}
          />
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
          title='Sigup'
          className=''
        />

        <OAuth />

        <View className="flex flex-row justify-center mt-4">
          <Text className="text-base text-gray-500">Already have an account? </Text>
          <Link href="/(auth)/sigin">
            <Text className="text-base text-blue-600 font-semibold">Log In</Text>
          </Link>
        </View>

      </ScrollView>
    </View>
  );
};

export default Signup;
