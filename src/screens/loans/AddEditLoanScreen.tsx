import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type AddEditLoanScreenProps = NativeStackScreenProps<RootStackParamList, 'AddEditLoan'>;

type LoanType = 'given' | 'taken';
type Frequency = 'one-time' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

const AddEditLoanScreen = ({ route, navigation }: AddEditLoanScreenProps) => {
  const isEdit = !!route.params?.loanId;
  
  // Form state
  const [loanType, setLoanType] = useState<LoanType>('given');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [notes, setNotes] = useState('');
  
  // UI state
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (startDate > endDate) {
      Alert.alert('Error', 'End date must be after start date');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back on success
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save loan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    if (!amount) return 'K0.00';
    const principal = parseFloat(amount.replace(/[^0-9.]/g, ''));
    const rate = parseFloat(interestRate) || 0;
    const total = principal + (principal * rate) / 100;
    return `K${total.toFixed(2)}`;
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Loan' : 'Add New Loan'}
            </Text>
            <Text className="text-gray-500 mt-1">
              {isEdit 
                ? 'Update the loan details below' 
                : 'Fill in the details to add a new loan'}
            </Text>
          </View>

          {/* Loan Type Toggle */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Loan Type</Text>
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                className={`flex-1 py-2 rounded-md ${loanType === 'given' ? 'bg-white shadow-sm' : ''}`}
                onPress={() => setLoanType('given')}
              >
                <Text 
                  className={`text-center font-medium ${loanType === 'given' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                  I'm Giving
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-2 rounded-md ${loanType === 'taken' ? 'bg-white shadow-sm' : ''}`}
                onPress={() => setLoanType('taken')}
              >
                <Text 
                  className={`text-center font-medium ${loanType === 'taken' ? 'text-blue-600' : 'text-gray-500'}`}
                >
                  I'm Taking
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Name */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              {loanType === 'given' ? 'Borrower\'s Name' : 'Lender\'s Name'}
              <Text className="text-red-500"> *</Text>
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 text-base"
              placeholder={`Enter ${loanType === 'given' ? 'borrower\'s' : 'lender\'s'} name`}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Amount */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Amount (K)
              <Text className="text-red-500"> *</Text>
            </Text>
            <View className="relative">
              <TextInput
                className="bg-white border border-gray-300 rounded-lg p-3 text-base pl-10"
                placeholder="0.00"
                value={amount}
                onChangeText={(text) => {
                  // Allow only numbers and one decimal point
                  if (/^\d*\.?\d*$/.test(text) || text === '') {
                    setAmount(text);
                  }
                }}
                keyboardType="decimal-pad"
              />
              <Text className="absolute left-3 top-3.5 text-gray-500">K</Text>
            </View>
          </View>

          {/* Interest Rate (Optional) */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
              <Text className="text-gray-400"> (optional)</Text>
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 text-base"
              placeholder="0"
              value={interestRate}
              onChangeText={(text) => {
                // Allow only numbers and one decimal point
                if (/^\d*\.?\d*$/.test(text) || text === '') {
                  setInterestRate(text);
                }
              }}
              keyboardType="decimal-pad"
            />
            {interestRate && (
              <Text className="text-xs text-gray-500 mt-1">
                Total to be repaid: {calculateTotalAmount()}
              </Text>
            )}
          </View>

          {/* Dates */}
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium text-gray-700 mb-1">Start Date</Text>
              <TouchableOpacity 
                className="bg-white border border-gray-300 rounded-lg p-3"
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text>{startDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                    setShowStartDatePicker(false);
                    if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-sm font-medium text-gray-700 mb-1">End Date</Text>
              <TouchableOpacity 
                className="bg-white border border-gray-300 rounded-lg p-3"
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text>{endDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  minimumDate={startDate}
                  onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                    setShowEndDatePicker(false);
                    if (selectedDate) {
                      setEndDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          </View>

          {/* Frequency */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Repayment Frequency</Text>
            <View className="flex-row flex-wrap">
              {['one-time', 'weekly', 'monthly', 'quarterly', 'yearly'].map((freq) => (
                <TouchableOpacity
                  key={freq}
                  className={`py-2 px-3 mr-2 mb-2 rounded-full ${frequency === freq ? 'bg-blue-100' : 'bg-gray-100'}`}
                  onPress={() => setFrequency(freq as Frequency)}
                >
                  <Text className={`text-sm ${frequency === freq ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                    {freq.charAt(0).toUpperCase() + freq.slice(1).replace('-', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Notes
              <Text className="text-gray-400"> (optional)</Text>
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 text-base h-24 textAlignVertical="
              placeholder="Add any additional notes"
              value={notes}
              onChangeText={setNotes}
              multiline
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-lg mb-6"
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? (isEdit ? 'Updating...' : 'Saving...') : (isEdit ? 'Update Loan' : 'Save Loan')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEditLoanScreen;
