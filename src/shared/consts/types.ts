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

export interface AccountsCollapseProps {
  collapseData: MappedAccounts[];
  cards: any[];
}

interface CurrencyExchange {
  exchangeRate: number;
  sourceCurrency: string;
  targetCurrency: string;
  unitCurrency: string;
  contractIdentification: string;
  quotationDate: string;
  instructedAmount: Amount;
}

interface BankTransactionCode {
  code: string;
  subCode: string;
}

interface ProprietaryBankTransactionCode {
  code: string;
  issuer: string;
}

interface TBalance {
  creditDebitIndicator: number;
  type: number;
  amount: Amount;
}

interface MerchantDetails {
  merchantName: string;
  merchantCategoryCode: string;
}

interface Address {
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

interface CreditorAgent {
  schemeName: number;
  identification: string;
  name: string;
  address: Address;
}

interface CreditorAccount {
  schemeName: number;
  identification: string;
  name: string;
}

interface DebtorAgent {
  schemeName: number;
  identification: string;
  name: string;
  address: Address;
}

interface DebtorAccount {
  schemeName: number;
  identification: string;
  name: string;
}

interface CardInstrument {
  cardSchemeName: number;
  authorisationType: number;
  name: string;
  identification: string;
}

export interface Transaction {
  creditDebitIndicator: number;
  status: number;
  accountId: string;
  transactionId: string;
  transactionReference: string;
  bookingDateTime: string;
  valueDateTime: string;
  transactionInformation: string;
  addressLine: string;
  amount: Amount;
  chargeAmount: Amount;
  currencyExchange: CurrencyExchange;
  bankTransactionCode: BankTransactionCode;
  proprietaryBankTransactionCode: ProprietaryBankTransactionCode;
  balance: TBalance;
  merchantDetails: MerchantDetails;
  creditorAgent: CreditorAgent;
  creditorAccount: CreditorAccount;
  debtorAgent: DebtorAgent;
  debtorAccount: DebtorAccount;
  cardInstrument: CardInstrument;
}

interface Address {
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

interface DebtorParty {
  inn: string;
  name: string;
  kpp: string;
}

interface DebtorAccount {
  schemeName: number;
  identification: string;
}

interface DebtorAgent {
  schemeName: number;
  identification: string;
  name: string;
  address: Address;
}

interface CreditorParty {
  inn: string;
  name: string;
  kpp: string;
}

interface CreditorAccount {
  schemeName: number;
  identification: string;
}

interface CreditorAgent {
  schemeName: number;
  identification: string;
  name: string;
  address: Address;
}

interface TransactionStatement {
  creditDebitIndicator: number;
  status: number;
  transactionId: string;
  documentNumber: string;
  bookingDateTime: string;
  valueDateTime: string;
  description: string;
  amount: Amount;
  debtorParty: DebtorParty;
  debtorAccount: DebtorAccount;
  debtorAgent: DebtorAgent;
  creditorParty: CreditorParty;
  creditorAccount: CreditorAccount;
  creditorAgent: CreditorAgent;
}

export interface Statement {
  accountId: string;
  statementId: string;
  fromBookingDateTime: string;
  toBookingDateTime: string;
  creationDateTime: string;
  transaction: TransactionStatement[];
}

export interface IAccountSlice {
  accountsData: MappedAccounts[];
  transaction: Transaction[];
  statement: Statement[];
}

interface Period {
  type: number;
  year: string;
  fromDate: string;
  toDate: string;
}

interface TaxAmount {
  rate: string;
  totalAmount: string;
}

interface TaxRecord {
  type: string;
  category: string;
  categoryDetails: string;
  debtorStatus: string;
  period: Period[];
  taxAmount: TaxAmount;
}

interface CreditorTax {
  taxType: string;
  registrationIdentification: string;
}

interface DebtorTax {
  taxType: string;
  registrationIdentification: string;
}

interface TaxRemittance {
  administrationZone: string;
  referenceNumber: string;
  date: string;
  creditor: CreditorTax;
  debtor: DebtorTax;
  record: TaxRecord;
}

interface CreditorReferenceInformation {
  type: string;
  reference: string;
}

interface RemittanceInformation {
  unstructured: string;
  creditorReferenceInformation: CreditorReferenceInformation;
  taxRemittance: TaxRemittance;
}

interface Identification {
  schemeName: number;
  identification: string;
}

interface PostalAddress {
  addressType: number;
  addressLine: string[];
  streetName: string;
  buildingNumber: string;
  postCode: string;
  townName: string;
  countrySubDivision: string;
  country: string;
}

interface Creditor {
  name: string;
  mobileNumber: string;
  countryOfResidence: string;
  countryOfBirth: string;
  provinceOfBirth: string;
  cityOfBirth: string;
  birthDate: string;
  identification: Identification[];
  postalAddress: PostalAddress;
}

interface DebtorAccount {
  schemeName: number;
  name: string;
  identification: string;
}

interface CreditorAgent {
  schemeName: number;
  identification: string;
}

interface CreditorAccount {
  schemeName: number;
  name: string;
  identification: string;
}

interface ControlParameters {
  validFromDateTime: string;
  validToDateTime: string;
  maximumIndividualAmount: Amount;
  periodicLimits: string[];
  vrpType: string[];
  psuAuthenticationMethods: string[];
  supplementaryData: string;
}

interface Initiation {
  debtorAccount: DebtorAccount;
  creditorAgent: CreditorAgent;
  creditorAccount: CreditorAccount;
  creditorAgentAccount: CreditorAccount;
  creditor: Creditor;
  remittanceInformation: RemittanceInformation;
}

interface Data {
  readRefundAccount: number;
  status: number;
  consentId: string;
  creationDateTime: string;
  statusUpdateDateTime: string;
  controlParameters: ControlParameters;
  initiation: Initiation;
  debtorAccount: DebtorAccount;
}

interface DeliveryAddress {
  addressType: number;
  addressLine: string[];
  streetName: string;
  buildingNumber: string;
  postCode: string;
  townName: string;
  countrySubDivision: string;
  country: string;
}

interface Risk {
  paymentContextCode: number;
  merchantCategoryCode: string;
  merchantCustomerIdentification: string;
  deliveryAddress: DeliveryAddress[];
}

interface ConsentBanking {
  data: Data;
  risk: Risk;
}

export interface CardConsent {
  cardId: string;
  consentBanking: ConsentBanking;
}
