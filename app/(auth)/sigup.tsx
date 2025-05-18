import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';


const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setshowSuccessModal] = useState(false)
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.longMessage)
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: 'success' });
        setshowSuccessModal(true); // ✅ show success modal
      }
      else {
        setVerification({ ...verification, state: 'failed', error: 'Verification failed' });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 bg-white mb-10">
      {verification.state === 'pending' ? (
        <View className="flex-1 justify-center items-center px-6 bg-white">
          <Text className="text-2xl font-semibold mb-4 text-center">Verify Your Email</Text>
          <TextInput
            className="border border-gray-300 w-full px-4 py-2 mb-3 rounded-lg text-base"
            placeholder="Enter verification code"
            value={verification.code}
            onChangeText={(text) => setVerification({ ...verification, code: text })}
            keyboardType="number-pad"
          />
          {verification.error ? (
            <Text className="text-red-500 text-sm mb-2">{verification.error}</Text>
          ) : null}
          <TouchableOpacity
            onPress={onVerifyPress}
            className="bg-blue-600 px-6 py-3 rounded-lg w-full"
          >
            <Text className="text-white text-center font-semibold text-base">Verify</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1">
          <View className="relative w-full h-[250px]">
            <Image
              source={images.signUpCar}
              className="w-full h-full"
              resizeMode="cover"
            />
            <Text className="absolute bottom-5 left-5 text-3xl font-semibold text-white drop-shadow-md">
              Create Your Account
            </Text>
          </View>

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
            <CustomButton title="Sign Up" onPress={onSignUpPress} />
            <OAuth />
            <View className="flex flex-row justify-center mt-4">
              <Text className="text-base text-gray-500">Already have an account? </Text>
              <Link href="/(auth)/sigin">
                <Text className="text-base text-blue-600 font-semibold">Log In</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      )}

      <Modal isVisible={showSuccessModal}>
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md items-center shadow-lg">
            <Image
              source={images.check}
              className="w-28 h-28 mb-4"
              resizeMode="contain"
            />
            <Text className="text-2xl font-semibold text-center mb-2">Success!</Text>
            <Text className="text-gray-500 text-center text-base">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title='Home'
              onPress={() => router.push("/(root)/(tabs)/home")}
              className='mt-5'
            />
          </View>
        </View>
      </Modal>


      <Modal isVisible={verification.state === 'pending'}
        onModalHide={() => { if (verification.state === "success") { setshowSuccessModal(true) } }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className='text-2xl font-JakartaBold mb-2'>
            Verification
          </Text>
          <Text className='font-Jakarta mb-5'>
            We've sent a Verification code to {data.email}
          </Text>
          <InputField
            label='Code'
            icon={icons.lock}
            placeholder='12345'
            value={verification.code}
            keyboardType='numeric'
            onChangeText={(text) => setVerification({ ...verification, code: text })}
          />
          {verification.error && (
            <Text className='text-red-500 text-sm mt-1'>
              {verification.error}
            </Text>
          )}

          <CustomButton
            title='Verify Email'
            onPress={onVerifyPress}
            className='mt-5 bg-success-500'
          />
        </View>
      </Modal>
    </View>
  );
};

export default Signup;
