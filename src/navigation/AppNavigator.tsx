import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons as Icon } from '@expo/vector-icons';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from './types';

// Import screens (we'll create these next)
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import LoansScreen from '../screens/loans/LoansScreen';
import AddLoanScreen from '../screens/loans/AddLoanScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoanDetailsScreen from '../screens/loans/LoanDetailsScreen';
import RepaymentHistoryScreen from '../screens/loans/RepaymentHistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#3b82f6', // blue-500
      tabBarInactiveTintColor: '#9ca3af', // gray-400
    }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Loans" 
        component={LoansScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="AddLoan" 
        component={AddLoanScreen}
        options={{
          tabBarLabel: 'Add Loan',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Auth Stack Navigator
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      {/* Add SignUp and ForgotPassword screens here */}
    </AuthStack.Navigator>
  );
}

// Main App Navigator
function AppNavigator() {
  const isAuthenticated = false; // TODO: Replace with actual auth state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
        <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
        <Stack.Screen name="AddEditLoan" component={AddLoanScreen} />
        <Stack.Screen name="RepaymentHistory" component={RepaymentHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
