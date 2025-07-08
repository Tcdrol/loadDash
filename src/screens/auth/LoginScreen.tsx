import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual authentication
      console.log('Login attempt with:', { email });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to main app on success
      // navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center p-6">
        <Text className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</Text>
        
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Email or Phone</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="Enter your email or phone"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity 
            className="mt-2"
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text className="text-right text-blue-500">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg mb-4"
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-blue-500 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
