function updateBalance(account, amount, operation) {
  if (operation === "debit")
    account.balance = Number(account.balance) - Number(amount);
  else if (operation === "credit")
    account.balance = Number(account.balance) + Number(amount);
  return account;
}
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