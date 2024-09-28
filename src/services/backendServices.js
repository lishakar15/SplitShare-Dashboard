import axios from "axios";
export const backendService = {
  async saveExpenseDetails(expenseRequest) {
    let isExpenseCreated = false;
    try {
      const response = await axios.post(
        "http://localhost:8085/expense/add-expense",
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

  async updateExpense(expense) {
    let isUpdated = false;
    try {
      const response = await axios.put("http://localhost:8085/expense/update-expense", expense);
      if (response.status === 200) {
        isUpdated = true;
      }
    }
    catch (err) {
      console.log(`Error occurred while updating Expense ${expense.expenseId}` + err);
      throw err;
    }
    finally {
      return isUpdated;
    }
  },

  async deleteExpense(expenseId, deletedBy) {
    let isDeleted = false;
    try {
      const response = await axios.delete(`http://localhost:8085/expense/delete-expense/${expenseId}/${deletedBy}`)
      if (response.status === 200) {
        isDeleted = true
      }
      else {
        throw Error(response.status);
      }
    }
    catch (err) {
      console.log(`Error occurred while deleting the expense ${expenseId}` + err);
      throw err;
    }
    finally {
      return isDeleted;
    }
  },

  async getGroupsDataByUserId(userId) {
    try {
      const response = await axios.get(`http://localhost:8085/group/get-all-groups/${userId}`);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Service error " + response.status);
      }
    } catch (err) {
      console.log("Error occurred while getting groups data in getGroupsDataByUserId(): " + err);
    }
  },

  async getGroupDataByGroupId(groupId) {
    try {
      const response = await axios.get(`http://localhost:8085/group/get-group/${groupId}`);

      if (response.status === 200) {
        return response.data;
      }
      else {
        throw new Error("Service error " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting group data in  getGroupDataByGroupId():" + err);
    }

  },

  async getExpensesByGroupId(groupId) {
    try {
      const response = await axios.get(`http://localhost:8085/expense/get-expenses/${groupId}`);
      if (response.status === 200) {
        console.log("resonse  = " + response);
        return response.data;
      }
      else {
        throw new Error("Service error " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting expenses for the group " + err);
    }
  }

};
