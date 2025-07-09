import React from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const settings = [
    {
      title: 'Account',
      icon: 'person-outline',
      onPress: () => {},
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      rightComponent: (
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#9ca3af', true: '#3b82f6' }}
        />
      ),
    },
    {
      title: 'Dark Mode',
      icon: 'moon-outline',
      rightComponent: (
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#9ca3af', true: '#3b82f6' }}
        />
      ),
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {},
    },
    {
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => {},
    },
    {
      title: 'Logout',
      icon: 'log-out-outline',
      textColor: 'text-red-500',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Settings</Text>
        
        <View className="bg-white rounded-xl overflow-hidden">
          {settings.map((setting, index) => (
            <TouchableOpacity
              key={setting.title}
              className={`flex-row items-center justify-between p-4 ${
                index !== settings.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onPress={setting.onPress}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <Ionicons 
                  name={setting.icon as any} 
                  size={22} 
                  color={setting.textColor?.includes('red') ? '#ef4444' : '#6b7280'} 
                  className="mr-3"
                />
                <Text 
                  className={`text-base ${setting.textColor || 'text-gray-800'}`}
                >
                  {setting.title}
                </Text>
              </View>
              
              {setting.rightComponent || (
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
