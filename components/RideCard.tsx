import { icons } from '@/constants';
import { formatDate, formatTime } from '@/lib/utils';
import { Ride } from '@/types/types';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';


const RideCard = ({
    ride: {
        destination_latitude,
        destination_longitude,
        destination_address,
        created_at,
        ride_time,
        driver,
        payment_status,
        origin_address,
    },
}: {
    ride: Ride;
}) => {
    return (
        <ScrollView>
            <View className="flex-row bg-white rounded-2xl shadow-sm shadow-neutral-300 mb-4 p-3">
                {/* Map */}
                <Image
                    source={{
                        uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
                    }}
                    className="w-[80px] h-[90px] rounded-lg"
                />

                {/* Details */}
                <View className="flex-1 ml-4 justify-between">
                    {/* Addresses */}
                    <View className="gap-y-2">
                        <View className="flex-row items-center gap-x-2">
                            <Image source={icons.to} className="w-4 h-4" />
                            <Text className="text-sm font-medium text-gray-700" numberOfLines={1}>
                                {origin_address}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-x-2">
                            <Image source={icons.point} className="w-4 h-4" />
                            <Text className="text-sm font-medium text-gray-700" numberOfLines={1}>
                                {destination_address}
                            </Text>
                        </View>
                    </View>

                    {/* Date & Time */}
                    <View className="mt-4 bg-gray-100 rounded-lg px-3 py-2">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-gray-500">Date & Time</Text>
                            <Text className="text-xs font-medium text-gray-600">
                                {formatDate(created_at)}, {formatTime(ride_time)} min ride
                            </Text>
                        </View>
                    </View>


                    <View className="mt-4 bg-gray-100 rounded-lg px-3 py-2">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-gray-500">Driver</Text>
                            <Text className="text-xs font-medium text-gray-600">
                                {driver.first_name} {driver.last_name}
                            </Text>
                        </View>
                    </View>

                    <View className="mt-4 bg-gray-100 rounded-lg px-3 py-2">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-gray-500">Car Seats</Text>
                            <Text className="text-xs font-medium text-gray-600">
                                {driver.car_seats}
                            </Text>
                        </View>
                    </View>

                    <View className="mt-4 bg-gray-100 rounded-lg px-3 py-2">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xs font-semibold text-gray-500">Payments Status</Text>
                            <Text className={`text-xs font-medium text-gray-600 ${payment_status==="paid"?"text-green-500":"text-red-500"}`}>
                                {payment_status}
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
};

export default RideCard;
