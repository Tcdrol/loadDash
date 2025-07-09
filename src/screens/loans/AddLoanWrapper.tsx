import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import AddLoanScreen from './AddLoanScreen';

const AddLoanWrapper: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return <AddLoanScreen navigation={navigation} />;
};

export default AddLoanWrapper;
