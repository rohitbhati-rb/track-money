function updateBalance(account, amount, operation) {
  if (operation === "debit") {
    if (account.isCreditCard)
      account.creditBalance = Number(account.creditBalance) - Number(amount);
    else
      account.balance = Number(account.balance) - Number(amount);
  }
  else if (operation === "credit") {
    if (account.isCreditCard)
      account.creditBalance = Number(account.creditBalance) + Number(amount);
    else
      account.balance = Number(account.balance) + Number(amount);
  }
  return account;
}

// Updates account balance whenever any transaction is completed or deleted
export function UpdateAccountBalance(accounts, setAccounts, txn, isDelete = false) {
  const allAccounts = accounts;
  switch (txn.type) {
    case 1: {
      let idx = allAccounts.findIndex(val => val.id === txn.account.id);
      if (idx === -1) return false;
      allAccounts[idx] = updateBalance(allAccounts[idx], txn.amount, isDelete ? "credit" : "debit")
    } break;
    case 2: {
      let idx1 = allAccounts.findIndex(val => val.id === txn.fromAcc.id);
      let idx2 = allAccounts.findIndex(val => val.id === txn.toAcc.id);
      if (idx1 === -1 || idx2 === -1 || idx1 === idx2) return false;
      allAccounts[idx1] = updateBalance(allAccounts[idx1], txn.amount, isDelete ? "credit" : "debit")
      allAccounts[idx2] = updateBalance(allAccounts[idx2], txn.amount, isDelete ? "debit" : "credit")
    } break;
    case 3: {
      let idx = allAccounts.findIndex(val => val.id === txn.account.id);
      if (idx === -1) return false;
      allAccounts[idx] = updateBalance(allAccounts[idx], txn.amount, isDelete ? "debit" : "credit")
    } break;
    default: break;
  }
  setAccounts(allAccounts)
  return true
}

// Deletes the account associated with the provided id
// Deletes all the transactions(1 & 3) associated with the provided account id
export function DeleteAcc_and_UpdateTxns(accounts, setAccounts, transactions, setTransactions, accId) {
  const newAccounts = accounts.filter(acc => acc.id !== accId)
  setAccounts(newAccounts)
  const newTxns = transactions.filter(txn => txn.type === 2 ? txn.fromAcc.id !== accId : txn.account.id !== accId)
  setTransactions(newTxns)
  return true;
}

// Updates current balance when opening balance is updated
export function Get_Updated_Current_Balance(transactions, account) {
  let balance = Number(account.openingBalance);
  transactions.forEach(val => {
    if (val.type !== 3)
      balance -= Number(val.amount)
    else
      balance += Number(val.amount)
  })
  return balance;
}