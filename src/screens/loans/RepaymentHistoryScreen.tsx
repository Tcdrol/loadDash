import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type RepaymentHistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'RepaymentHistory'>;

// Mock data for repayment history
const repaymentHistory = [
  {
    id: '1',
    date: '2023-07-01',
    amount: 500,
    status: 'completed',
    type: 'payment',
  },
  {
    id: '2',
    date: '2023-06-01',
    amount: 500,
    status: 'completed',
    type: 'payment',
  },
  {
    id: '3',
    date: '2023-05-01',
    amount: 500,
    status: 'completed',
    type: 'payment',
  },
  {
    id: '4',
    date: '2023-04-15',
    amount: 2500,
    status: 'completed',
    type: 'disbursement',
  },
];

const RepaymentHistoryScreen: React.FC<RepaymentHistoryScreenProps> = ({ navigation }) => {
  const renderItem = ({ item }: { item: typeof repaymentHistory[0] }) => (
    <View className="bg-white p-4 border-b border-gray-100">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-gray-900 font-medium">
            {item.type === 'payment' ? 'Payment Received' : 'Loan Disbursed'}
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <View className="items-end">
          <Text 
            className={`font-semibold ${
              item.type === 'payment' ? 'text-green-600' : 'text-blue-600'
            }`}
          >
            {item.type === 'payment' ? '+' : '-'}${item.amount.toLocaleString()}
          </Text>
          <View className="flex-row items-center mt-1">
            <View 
              className={`w-2 h-2 rounded-full mr-1 ${
                item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
              }`}
            />
            <Text className="text-xs text-gray-500 capitalize">
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 -ml-2 mr-2"
        >
          <Ionicons name="arrow-back" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Repayment History</Text>
      </View>

      {/* Summary Card */}
      <View className="bg-blue-500 mx-4 my-4 rounded-xl p-4">
        <Text className="text-white text-sm mb-1">Total Repaid</Text>
        <Text className="text-white text-2xl font-bold mb-2">$1,500</Text>
        <View className="flex-row items-center">
          <View className="bg-white/20 rounded-full px-2 py-1">
            <Text className="text-white text-xs">60% of $2,500</Text>
          </View>
          <Text className="text-white/80 text-xs ml-2">$1,000 remaining</Text>
        </View>
      </View>

      {/* Repayment List */}
      <FlatList
        data={repaymentHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <Text className="px-4 py-2 text-gray-500 text-sm">
            {repaymentHistory.length} transactions
          </Text>
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <Ionicons name="receipt-outline" size={48} color="#d1d5db" />
            <Text className="mt-2 text-gray-400">No repayment history yet</Text>
          </View>
        }
      />

      {/* Record Payment Button */}
      <View className="p-4 border-t border-gray-100 bg-white">
        <TouchableOpacity 
          className="bg-blue-500 py-3 rounded-lg items-center"
          onPress={() => {}}
        >
          <Text className="text-white font-medium">Record New Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RepaymentHistoryScreen;
