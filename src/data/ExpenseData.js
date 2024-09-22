export const EXPENSE_DATA = [
  {
    groupId: 1,
    expenseId: 1,
    paidUsers: [
      {
        userId: 103,
        userName: "Sovon",
        paidAmount: 50.0,
      },
      {
        userId: 102,
        userName: "Jack",
        paidAmount: 50.0,
      },
    ],
    totalAmount: 100.0,
    expenseDescription: "Avatar Movie",
    spentOnDate: "2024-07-21T12:34:56Z",
    createDate: null,
    lastUpdateDate: null,
    category: "Food",
    splitType: "EQUAL",
    createdBy: 1,
    participantShareList: [
      {
        userId: 101,
        userName: "Lisha",
        shareAmount: 33.33,
        isPaidUser: false,
      },
      {
        userId: 102,
        userName: "Jack",
        shareAmount: 33.33,
        isPaidUser: false,
      },
      {
        userId: 103,
        userName: "Sovon",
        shareAmount: 33.34,
        isPaidUser: true,
      },
    ],
  },
  {
    groupId: 1,
    expenseId: 2,
    paidUsers: [
      {
        userId: 101,
        userName: "Lishakar",
        paidAmount: 200.00,
      },
    ],
    totalAmount: 200.0,
    expenseDescription: "Pizza Party",
    spentOnDate: "2024-07-21T12:34:56Z",
    createDate: null,
    lastUpdateDate: null,
    category: "Party",
    splitType: "PERCENTAGE",
    createdBy: 1,
    participantShareList: [
      {
        userId: 101,
        userName: "Lisha",
        shareAmount: 100,
        isPaidUser: false,
      },
      {
        userId: 103,
        userName: "Sovon",
        shareAmount: 100,
        isPaidUser: true,
      },
    ],
  },
];
