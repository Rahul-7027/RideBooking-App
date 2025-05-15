import { icons } from '@/constants'
import React from 'react'
import { Image, Text, View } from 'react-native'
import CustomButton from './CustomButton'

const OAuth = () => {
    const handleGoogleSigin = () => {
        console.log("handleGoogleSigin")
    }
    return (
        <View>
            <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
                <View className='flex-1 h-[1px] bg-general-100'>
                    <Text className='text-lg'>Or</Text>
                    <View className='flex-1 h-[1px] bg-general-100'></View>
                </View>
            </View>
            <CustomButton
                title="Log in with Google"
                className="mt-5 w-full shadow-none primary"
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode="contain"
                        className="w-5 h-5 mx-2"
                    />
                )}
                bgVariant="outline"
                onPress={handleGoogleSigin}
            />

        </View>
    )
}

export default OAuth