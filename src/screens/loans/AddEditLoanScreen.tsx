import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

type AddEditLoanScreenProps = NativeStackScreenProps<RootStackParamList, 'AddEditLoan'>;

type LoanType = 'given' | 'taken';
type Frequency = 'one-time' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

interface LoanFormData {
  name: string;
  amount: string;
  interestRate: string;
  startDate: Date;
  endDate: Date;
  frequency: Frequency;
  notes: string;
}

const AddEditLoanScreen = ({ route, navigation }: AddEditLoanScreenProps) => {
  const isEdit = !!route.params?.loanId;
  
  // Form state
  const [loanType, setLoanType] = useState<LoanType>('given');
  const [formData, setFormData] = useState<LoanFormData>({
    name: '',
    amount: '',
    interestRate: '',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Default to 1 month from now
    frequency: 'monthly',
    notes: ''
  });
  
  // UI state
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoanFormData, string>>>({});

  // Update form data
  const updateFormData = (field: keyof LoanFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoanFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back on success
      navigation.goBack();
      
      // Show success message
      Alert.alert('Success', `Loan ${route.params?.loanId ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save loan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = useCallback(() => {
    if (!formData.amount) return 'K0.00';
    const principal = parseFloat(formData.amount.replace(/[^0-9.]/g, '')) || 0;
    const rate = parseFloat(formData.interestRate) || 0;
    const total = principal + (principal * rate) / 100;
    return `K${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [formData.amount, formData.interestRate]);

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
              {route.params?.loanId ? 'Edit Loan' : 'Add New Loan'}
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
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
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
                value={formData.amount}
                onChangeText={(text) => {
                  // Allow only numbers and one decimal point
                  if (/^\d*\.?\d*$/.test(text) || text === '') {
                    updateFormData('amount', text);
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
              value={formData.interestRate}
              onChangeText={(text) => {
                // Allow only numbers and one decimal point
                if (/^\d*\.?\d*$/.test(text) || text === '') {
                  updateFormData('interestRate', text);
                }
              }}
              keyboardType="decimal-pad"
            />
            {formData.interestRate && (
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
                <Text>{format(formData.startDate, 'MMM d, yyyy')}</Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={formData.startDate}
                  mode="date"
                  display="default"
                  onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                    setShowStartDatePicker(false);
                    if (selectedDate) {
                      updateFormData('startDate', selectedDate);
                      // If the new start date is after end date, update end date
                      if (selectedDate > formData.endDate) {
                        const newEndDate = new Date(selectedDate);
                        newEndDate.setMonth(newEndDate.getMonth() + 1);
                        updateFormData('endDate', newEndDate);
                      }
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
                <Text>{format(formData.endDate, 'MMM d, yyyy')}</Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={formData.endDate}
                  mode="date"
                  display="default"
                  minimumDate={formData.startDate}
                  onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                    setShowEndDatePicker(false);
                    if (selectedDate) {
                      updateFormData('endDate', selectedDate);
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
                  className={`py-2 px-3 mr-2 mb-2 rounded-full ${formData.frequency === freq ? 'bg-blue-100' : 'bg-gray-100'}`}
                  onPress={() => updateFormData('frequency', freq as Frequency)}
                >
                  <Text className={`text-sm ${formData.frequency === freq ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
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
              value={formData.notes}
              onChangeText={(text) => updateFormData('notes', text)}
              multiline
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-lg mb-6"
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                {route.params?.loanId ? 'Update Loan' : 'Save Loan'}
              </Text>
            )}
          </TouchableOpacity>
          
          {/* Error messages */}
          {Object.values(errors).some(error => error) && (
            <View className="mt-4 p-3 bg-red-50 rounded-lg">
              {Object.entries(errors).map(([field, message]) => 
                message ? (
                  <Text key={field} className="text-red-600 text-sm mb-1">
                    • {message}
                  </Text>
                ) : null
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEditLoanScreen;
