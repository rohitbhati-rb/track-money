export const APP_NAME = "t₹ack money";
export const ADD_TRANSACTION = "Add Transaction";
export const MY_TRANSACTIONS = "My Transactions";
export const MY_ACCOUNTS = "My Accounts";
export const ADD_ACCOUNT = "Add Account";
export const ROUTES = ["/transactions", "/accounts", "/reports"];
export const ACCOUNTS_KEY = "acc"
export const TRANSACTIONS_KEY = "txns"

export const emptyAccount = { id: '', name: '', balance: '', createdAt: '' };
export const emptyTxn = {
  id: '',
  type: 1,
  description: '',
  amount: '',
  payee: '',//1
  payer: '',//3
  account: '', // { id: '', name: '' }, 1 & 3
  fromAcc: '', // { id: '', name: '' }, 2
  toAcc: '', // { id: '', name: '' }, 2
  tags: [], //[{ id: '', name: '' }],
  dateTime: Date(),
  createdAt: '',
  updatedAt: ''
};
export const txnErrorState = {
  amount: "",
  account: "",
  fromAcc: "",
  toAcc: "",
  payee: "",
  payer: "",
  tags: ""
};
// Navbar constants
export const NAV_BUTTONS = ["All Transactions", "Manage Accounts", "Reports"];
export const SETTINGS = ['Profile', 'Account', 'Dashboard', 'Logout'];
export const COMMON_NAVBAR_SETTINGS = {
  mr: 2,
  fontFamily: 'monospace',
  fontWeight: 700,
  color: 'inherit',
  textDecoration: 'none',
}

// Transaction Dialog constants
export const TxnTabs = ["Expense", "Transfer", "Income"];

// TxnForm constants
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const TxnTagsMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Cards constants
export const COMMON_CARD_CSS = {
  margin: "15px 0",
  display: "flex",
  justifyContent: "space-between",
  borderLeft: "3px solid",
  borderWidth: { sm: "5px" },
  borderColor: "#40c4ff",
};
export const COMMON_CARD_CHIP_CSS = {
  background: "#40c4ff",
  color: "black",
  marginRight: 1,
  fontWeight: "bold",
  fontSize: 10
}