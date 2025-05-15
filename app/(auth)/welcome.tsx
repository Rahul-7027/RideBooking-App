import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

const Welcome = () => {
  const swipeRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastPage = activeIndex === onboarding.length - 1;

  return (
    <View className="flex-1 bg-white pt-12 px-6 justify-between">
      {/* Skip button */}
      <View className="flex items-end">
        <TouchableOpacity onPress={() => router.replace('/(auth)/sigup')}>
          <Text className="text-base font-medium text-blue-600 underline">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Swiper Carousel */}
      <View className="flex-1">
        <Swiper
          ref={swipeRef}
          loop={false}
          onIndexChanged={setActiveIndex}
          showsPagination={true}
          scrollEnabled={true}
          dotStyle={{
            backgroundColor: '#D1D5DB',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginBottom: 30,
          }}
          activeDotStyle={{
            backgroundColor: '#3B82F6',
            width: 10,
            height: 10,
            borderRadius: 5,
            marginBottom: 30,
          }}
        >
          {onboarding.map((item) => (
            <View
              key={item.id}
              className="flex-1 items-center justify-center space-y-6 bg-white"
            >
              <Image
                source={item.image}
                className="w-60 h-60 rounded-xl"
                resizeMode="contain"
              />
              <Text className="text-2xl font-extrabold text-center text-gray-900">
                {item.title}
              </Text>
              <Text className="text-base text-center text-gray-600 px-4">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* Bottom Button */}
      <View className="mb-8">
        <CustomButton
          title={isLastPage ? 'Get Started' : 'Next'}
          onPress={() =>
            isLastPage ? router.replace('/(auth)/sigup') : swipeRef.current?.scrollBy(1)
          }
          className="bg-blue-600 py-3 rounded-full text-white font-semibold text-base"
        />
      </View>

    </View>
  );
};

export default Welcome;
