import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { icons, images } from '@/constants';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const Sigin = () => {
  const [data, setData] = useState({
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
        />
        
      </ScrollView>
    </View>
  );
};

export default Sigin;
