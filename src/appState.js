import { v4 as uuidv4 } from 'uuid';

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
export const allAccounts = [
    {
        id: uuidv4(),
        name: "SBI",
        balance: 111523,
        createdAt: Date()
    },
    {
        id: uuidv4(),
        name: "HDFC",
        balance: 99923,
        createdAt: Date()
    },
    {
        id: uuidv4(),
        name: "ICICI",
        balance: 14523,
        createdAt: Date()
    },
    {
        id: uuidv4(),
        name: "Paytm Wallet",
        balance: 523,
        createdAt: Date()
    }
];
export const allTransactions = [
    {
        id: uuidv4(),
        type: 1,
        payee: "Dominos Pizza",
        description: "Bought 5 pizzas for saturday night and my birthday",
        amount: 785,
        account: { id: uuidv4(), name: "Paytm Wallet" },
        tags: [{ id: uuidv4(), name: "food" }, { id: uuidv4(), name: "party" }],
        dateTime: Date(),
        createdAt: Date(),
        updatedAt: Date()
    },
    {
        id: uuidv4(),
        type: 1,
        payee: "boat Headphones",
        description: "Bought airdopes for dad",
        amount: 1499,
        account: { id: uuidv4(), name: "SBI" },
        tags: [{ id: uuidv4(), name: "electronics" }, { id: uuidv4(), name: "gift" }],
        dateTime: Date(),
        createdAt: Date(),
        updatedAt: Date()
    },
    {
        id: uuidv4(),
        type: 3,
        payer: "Deloitte",
        amount: 50000,
        account: { id: uuidv4(), name: "HDFC" },
        description: "monthly salary",
        tags: [{ id: uuidv4(), name: "income" }],
        dateTime: Date(),
        createdAt: Date(),
        updatedAt: Date()
    },
    {
        id: uuidv4(),
        type: 2,
        description: "transfer to hdfc",
        amount: 4500,
        fromAcc: { id: uuidv4(), name: "SBI" },
        toAcc: { id: uuidv4(), name: "HDFC" },
        tags: [{ id: uuidv4(), name: "transfer" }],
        dateTime: Date(),
        createdAt: Date(),
        updatedAt: Date()
    }
];
export const allTags = [
    {
        id: uuidv4(),
        name: "food"
    },
    {
        id: uuidv4(),
        name: "travel"
    },
    {
        id: uuidv4(),
        name: "rent"
    },
    {
        id: uuidv4(),
        name: "shopping"
    },
];