import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// Icons (we'll use expo-vector-icons)
import { Ionicons } from '@expo/vector-icons';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Mock data - replace with actual data from your state management
const stats = [
  { id: '1', title: 'Total Given', amount: 'K5,400', trend: 'up', change: '12%' },
  { id: '2', title: 'Total Owed', amount: 'K2,300', trend: 'down', change: '5%' },
  { id: '3', title: 'Loans Active', amount: '7', trend: 'up', change: '2' },
];

const upcomingPayments = [
  { id: '1', name: 'John Doe', amount: 'K500', dueDate: '2023-06-15' },
  { id: '2', name: 'Jane Smith', amount: 'K1,200', dueDate: '2023-06-18' },
  { id: '3', name: 'Business Loan', amount: 'K3,000', dueDate: '2023-06-20' },
];

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View className="bg-white px-6 py-4">
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-gray-500 text-sm">Welcome back,</Text>
            <Text className="text-2xl font-bold text-gray-800">Tc Drol</Text>
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="notifications-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="px-4 mt-4">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Overview</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {stats.map((stat) => (
            <View 
              key={stat.id} 
              className="bg-white rounded-xl p-4 mr-4 w-40 shadow-sm"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Text className="text-gray-500 text-sm">{stat.title}</Text>
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-xl font-bold text-gray-800">{stat.amount}</Text>
                <View className={`flex-row items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  <Ionicons 
                    name={stat.trend === 'up' ? 'trending-up' : 'trending-down'} 
                    size={16} 
                    color={stat.trend === 'up' ? '#10B981' : '#EF4444'} 
                  />
                  <Text className={`ml-1 text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Upcoming Payments */}
      <View className="px-4 mt-2">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-800">Upcoming Payments</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 text-sm">View All</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {upcomingPayments.map((payment, index) => (
            <TouchableOpacity 
              key={payment.id}
              className={`py-3 ${index !== upcomingPayments.length - 1 ? 'border-b border-gray-100' : ''}`}
              onPress={() => navigation.navigate('LoanDetails', { loanId: payment.id })}
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-medium text-gray-800">{payment.name}</Text>
                  <Text className="text-sm text-gray-500">Due {payment.dueDate}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-semibold text-gray-800 mr-2">{payment.amount}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-4 mt-2">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity 
            className="bg-white p-4 rounded-xl flex-1 mr-3 items-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
            onPress={() => navigation.navigate('AddEditLoan')}
          >
            <View className="bg-blue-100 p-3 rounded-full mb-2">
              <Ionicons name="add-circle" size={24} color="#3B82F6" />
            </View>
            <Text className="text-sm font-medium text-gray-700">New Loan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-white p-4 rounded-xl flex-1 items-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
            onPress={() => navigation.navigate('Analytics')}
          >
            <View className="bg-green-100 p-3 rounded-full mb-2">
              <Ionicons name="analytics" size={24} color="#10B981" />
            </View>
            <Text className="text-sm font-medium text-gray-700">Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
