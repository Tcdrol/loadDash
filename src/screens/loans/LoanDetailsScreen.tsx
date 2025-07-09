import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type LoanDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'LoanDetails'>;

const LoanDetailsScreen: React.FC<LoanDetailsScreenProps> = ({ route, navigation }) => {
  // Mock data - in a real app, this would come from your state management or API
  const loan = {
    id: '1',
    type: 'given', // 'given' or 'taken'
    partyName: 'John Doe',
    amount: 2500,
    amountPaid: 1500,
    status: 'active',
    interestRate: 5,
    startDate: '2023-06-15',
    dueDate: '2023-12-15',
    repaymentFrequency: 'monthly',
    notes: 'Home renovation loan',
  };

  const progress = (loan.amountPaid / loan.amount) * 100;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
              <Ionicons name="arrow-back" size={24} color="#3b82f6" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">Loan Details</Text>
            <View className="w-8" /> {/* For alignment */}
          </View>

          {/* Loan Card */}
          <View className="bg-white rounded-xl p-4 mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-gray-500 text-sm">
                  {loan.type === 'given' ? 'You lent to' : 'You borrowed from'}
                </Text>
                <Text className="text-xl font-bold text-gray-900">{loan.partyName}</Text>
              </View>
              <View className="px-3 py-1 bg-blue-100 rounded-full">
                <Text className="text-blue-700 text-xs font-medium">
                  {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-500">Amount</Text>
                <Text className="font-semibold">${loan.amount.toLocaleString()}</Text>
              </View>
              <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-blue-500" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-xs text-gray-400">
                  ${loan.amountPaid.toLocaleString()} paid of ${loan.amount.toLocaleString()}
                </Text>
                <Text className="text-xs text-gray-400">
                  {progress.toFixed(1)}%
                </Text>
              </View>
            </View>
          </View>

          {/* Loan Details */}
          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="font-semibold text-gray-800 mb-3">Loan Details</Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Interest Rate</Text>
                <Text className="text-gray-800">{loan.interestRate}%</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Start Date</Text>
                <Text className="text-gray-800">
                  {new Date(loan.startDate).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Due Date</Text>
                <Text className="text-gray-800">
                  {new Date(loan.dueDate).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Repayment</Text>
                <Text className="text-gray-800 capitalize">
                  {loan.repaymentFrequency}
                </Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          {loan.notes && (
            <View className="bg-white rounded-xl p-4 mb-4">
              <Text className="font-semibold text-gray-800 mb-2">Notes</Text>
              <Text className="text-gray-600">{loan.notes}</Text>
            </View>
          )}

          {/* Actions */}
          <View className="flex-row space-x-3 mt-2">
            <TouchableOpacity 
              className="flex-1 bg-blue-500 py-3 rounded-lg items-center"
              onPress={() => {}}
            >
              <Text className="text-white font-medium">Record Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-12 h-12 border border-gray-200 rounded-lg items-center justify-center"
              onPress={() => {}}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoanDetailsScreen;
