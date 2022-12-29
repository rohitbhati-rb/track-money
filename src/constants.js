export const APP_NAME = "t₹ack money";
export const ADD_TRANSACTION = "Add Transaction";
export const MY_TRANSACTIONS = "My Transactions";
export const MY_ACCOUNTS = "My Accounts";
export const ADD_ACCOUNT = "Add Account";
export const ROUTES = ["/transactions", "/accounts", "/reports"];

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