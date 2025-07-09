import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type AddLoanScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route?: any;
};

const AddLoanScreen: React.FC<AddLoanScreenProps> = ({ navigation }) => {
  const [loanType, setLoanType] = useState<'given' | 'taken'>('given');
  const [partyName, setPartyName] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [repaymentFrequency, setRepaymentFrequency] = useState<string>('monthly');
  const [notes, setNotes] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  const handleSave = () => {
    // Basic validation
    if (!partyName.trim() || !amount || !interestRate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Create loan object
    const newLoan = {
      id: Date.now().toString(),
      type: loanType,
      partyName: partyName.trim(),
      amount: parseFloat(amount),
      interestRate: parseFloat(interestRate),
      startDate: startDate.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      repaymentFrequency,
      notes: notes.trim(),
      status: 'active',
      amountPaid: 0,
    };

    console.log('New Loan:', newLoan);
    // TODO: Save loan to state/API
    
    // Navigate back to loans screen
    navigation.goBack();
  };

  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onDueDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || dueDate;
    setShowDueDatePicker(false);
    setDueDate(currentDate);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Add New Loan
        </Text>
        
        {/* Loan Type Toggle */}
        <View className="flex-row justify-between items-center bg-white p-1 rounded-xl mb-4">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg items-center ${
              loanType === 'given' ? 'bg-blue-100' : 'bg-white'
            }`}
            onPress={() => setLoanType('given')}
          >
            <Text
              className={`font-medium ${
                loanType === 'given' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              I Gave
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg items-center ${
              loanType === 'taken' ? 'bg-blue-100' : 'bg-white'
            }`}
            onPress={() => setLoanType('taken')}
          >
            <Text
              className={`font-medium ${
                loanType === 'taken' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              I Took
            </Text>
          </TouchableOpacity>
        </View>

        {/* Party Name */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            {loanType === 'given' ? 'Borrower Name' : 'Lender Name'}
          </Text>
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-200"
            placeholder={loanType === 'given' ? 'Who borrowed money?' : 'Who lent you money?'}
            value={partyName}
            onChangeText={setPartyName}
          />
        </View>

        {/* Amount */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Amount</Text>
          <View className="flex-row items-center bg-white p-3 rounded-lg border border-gray-200">
            <Text className="text-gray-500 mr-2">$</Text>
            <TextInput
              className="flex-1"
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Interest Rate */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</Text>
          <View className="flex-row items-center bg-white p-3 rounded-lg border border-gray-200">
            <TextInput
              className="flex-1"
              placeholder="0"
              keyboardType="numeric"
              value={interestRate}
              onChangeText={setInterestRate}
            />
            <Text className="text-gray-500">%</Text>
          </View>
        </View>

        {/* Start Date */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Start Date</Text>
          <TouchableOpacity
            className="bg-white p-3 rounded-lg border border-gray-200"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text>{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
        </View>

        {/* Due Date */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Due Date</Text>
          <TouchableOpacity
            className="bg-white p-3 rounded-lg border border-gray-200"
            onPress={() => setShowDueDatePicker(true)}
          >
            <Text>{dueDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDueDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              minimumDate={startDate}
              onChange={onDueDateChange}
            />
          )}
        </View>

        {/* Repayment Frequency */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Repayment Frequency</Text>
          <View className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Picker
              selectedValue={repaymentFrequency}
              onValueChange={(itemValue: string) => setRepaymentFrequency(itemValue)}
            >
              <Picker.Item label="One-time" value="onetime" />
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Quarterly" value="quarterly" />
              <Picker.Item label="Yearly" value="yearly" />
            </Picker>
          </View>
        </View>

        {/* Notes */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-1">Notes (Optional)</Text>
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-200 h-24 textAlignVertical="
            placeholder="Add any additional notes about this loan"
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg items-center mb-6"
          onPress={handleSave}
        >
          <Text className="text-white font-medium">Save Loan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddLoanScreen;
