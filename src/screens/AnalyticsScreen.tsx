import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type AnalyticsScreenProps = NativeStackScreenProps<RootStackParamList, 'Analytics'>;

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Analytics</Text>
        
        {/* Placeholder for charts and analytics */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-2">Loan Overview</Text>
          <View className="h-40 bg-gray-100 rounded-lg items-center justify-center">
            <Text className="text-gray-500">Charts will be displayed here</Text>
          </View>
        </View>
        
        <View className="bg-white rounded-xl p-4">
          <Text className="text-lg font-semibold text-gray-800 mb-2">Monthly Summary</Text>
          <View className="h-40 bg-gray-100 rounded-lg items-center justify-center">
            <Text className="text-gray-500">Monthly summary charts will be displayed here</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;
