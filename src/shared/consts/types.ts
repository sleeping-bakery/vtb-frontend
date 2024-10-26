export interface IConsentSlice {
  readAccountsBasic: boolean;
  readAccountsDetail: boolean;
  readBalances: boolean;
  readTransactionsBasic: boolean;
  readTransactionsCredits: boolean;
  readTransactionsDebits: boolean;
  readTransactionsDetail: boolean;
}

export interface ISettings {
  isOpen: boolean;
  confirm: () => void;
  cancel: () => void;
}

export interface IUser {
  id: string;
  login: string;
  token: string | undefined;
}

export interface IUserResponse {
  id: string;
  accountConsents: number[];
  login: string;
}

export interface Account {
  status: number;
  accountType: number;
  accountSubType: number;
  accountId: string;
  statusUpdateDateTime: string;
  currency: string;
  accountDescription: string;
  accountDetails: AccountDetail[];
  owner: Owner;
  serviceProvider: ServiceProvider;
}

interface AccountDetail {
  schemeName: number;
  identification: string;
  name: string;
}

interface Owner {
  name: string;
  mobileNumber: string;
  countryOfResidence: string;
  countryOfBirth: string;
  provinceOfBirth: string;
  cityOfBirth: string;
  birthDate: string;
  partyIdentification: PartyIdentification[];
  postalAddress: PostalAddress[];
}

interface PartyIdentification {
  schemeName: number;
  identification: string;
}

interface PostalAddress {
  addressType: number;
  department: string;
  subDepartment: string;
  streetName: string;
  buildingNumber: string;
  postCode: string;
  townName: string;
  countrySubDivision: string;
  country: string;
  addressLine: string[];
}

interface ServiceProvider {
  schemeName: number;
  identification: string;
}

export interface Balance {
  creditDebitIndicator: number;
  type: number;
  accountId: string;
  dateTime: string;
  amount: Amount;
  creditLine: CreditLine[];
}

interface Amount {
  amount: string;
  currency: string;
}

interface CreditLine {
  type: number;
  included: boolean;
  amount: Amount;
}

export interface MappedAccounts {
  balance: Balance[];
  account: Account;
}

export interface IAccountSlice {
  accountsData: MappedAccounts[];
}

export interface AccountsCollapseProps {
  collapseData: MappedAccounts[];
  handleModalOpen: () => void;
}
