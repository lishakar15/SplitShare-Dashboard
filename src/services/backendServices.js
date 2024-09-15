import axios from "axios";
export const backendService = {

  async saveExpenseDetails(expenseRequest) {
    let isExpenseCreated = false;
    try {
      const response = await axios.post(
        "http://localhost:8081/expense/add-expense",
        expenseRequest
      );
      if (response.status === 200) {
        isExpenseCreated = true;
      }
    } catch (err) {
      isExpenseCreated = false;
      console.log("Error occured while saving Expense details " + err);
    }
    return isExpenseCreated;
  },
};
