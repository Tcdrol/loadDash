export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  LoanDetails: { loanId: string };
  AddEditLoan: { loanId?: string };
  RepaymentHistory: { loanId: string };
  Settings: undefined;
  Analytics: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Loans: undefined;
  AddLoan: undefined;
  Analytics: undefined;
  Profile: undefined;
};
