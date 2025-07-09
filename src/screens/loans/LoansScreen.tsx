import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, MainTabParamList } from '../../navigation/types';

// Define the type for the LoansScreen props
type LoansScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Loans'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Mock data for loans
const mockLoans = [
  {
    id: '1',
    type: 'given',
    partyName: 'John Doe',
    amount: 2500,
    amountPaid: 1500,
    status: 'active',
    dueDate: '2023-12-15',
  },
  {
    id: '2',
    type: 'taken',
    partyName: 'ABC Bank',
    amount: 5000,
    amountPaid: 2000,
    status: 'active',
    dueDate: '2023-11-30',
  },
  {
    id: '3',
    type: 'given',
    partyName: 'Sarah Williams',
    amount: 1000,
    amountPaid: 1000,
    status: 'repaid',
    dueDate: '2023-10-15',
  },
];

const LoansScreen: React.FC<LoansScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'given' | 'taken'>('given');
  
  const filteredLoans = mockLoans.filter(loan => loan.type === activeTab);

  const renderLoanItem = ({ item }: { item: typeof mockLoans[0] }) => {
    const progress = (item.amountPaid / item.amount) * 100;
    const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'repaid';
    
    return (
      <TouchableOpacity 
        style={styles.loanItem}
        onPress={() => navigation.navigate('LoanDetails', { loanId: item.id })}
      >
        <View style={styles.loanHeader}>
          <Text style={styles.partyName}>{item.partyName}</Text>
          <View style={[
            styles.statusBadge,
            item.status === 'repaid' ? styles.statusRepaid : 
            isOverdue ? styles.statusOverdue : styles.statusActive
          ]}>
            <Text style={[
              styles.statusText,
              item.status === 'repaid' ? styles.statusTextRepaid : 
              isOverdue ? styles.statusTextOverdue : styles.statusTextActive
            ]}>
              {item.status === 'repaid' ? 'Repaid' : isOverdue ? 'Overdue' : 'Active'}
            </Text>
          </View>
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amountValue}>
            ${item.amount.toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${Math.min(progress, 100)}%` }
              ]}
            />
          </View>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>
              ${item.amountPaid.toLocaleString()} of ${item.amount.toLocaleString()}
            </Text>
            <Text style={styles.progressText}>
              {progress.toFixed(0)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View>
            <Text style={styles.dueDateLabel}>Due Date</Text>
            <Text style={styles.dueDateValue}>
              {new Date(item.dueDate).toLocaleDateString()}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Loans</Text>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'given' && styles.activeTab
            ]}
            onPress={() => setActiveTab('given')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'given' && styles.activeTabText
            ]}>
              Loans Given
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'taken' && styles.activeTab
            ]}
            onPress={() => setActiveTab('taken')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'taken' && styles.activeTabText
            ]}>
              Loans Taken
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loan List */}
      <FlatList
        data={filteredLoans}
        keyExtractor={(item) => item.id}
        renderItem={renderLoanItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No {activeTab} loans found</Text>
          </View>
        }
      />

      {/* Add Loan Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditLoan')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#2563eb',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 8,
    color: '#9ca3af',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: '#3b82f6',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loanItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  partyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusRepaid: {
    backgroundColor: '#dcfce7',
  },
  statusActive: {
    backgroundColor: '#dbeafe',
  },
  statusOverdue: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextRepaid: {
    color: '#166534',
  },
  statusTextActive: {
    color: '#1e40af',
  },
  statusTextOverdue: {
    color: '#991b1b',
  },
  amountContainer: {
    marginBottom: 8,
  },
  amountLabel: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dueDateLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  dueDateValue: {
    fontSize: 14,
    color: '#374151',
  },
});

export default LoansScreen;
