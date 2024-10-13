import axiosInstance from "../axiosInstance";
export const backendService = {
  async saveExpenseDetails(expenseRequest) {
    let isExpenseCreated = false;
    try {
      const response = await axiosInstance.post(
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
    finally {
      return isExpenseCreated;
    }
  },

  async updateExpense(expense) {
    let isUpdated = false;
    try {
      const response = await axiosInstance.put("http://localhost:8085/expense/update-expense", expense);
      if (response.status === 200) {
        isUpdated = true;
      }
    }
    catch (err) {
      console.log(`Error occurred while updating Expense ${expense.expenseId}` + err);
    }
    finally {
      return isUpdated;
    }
  },

  async deleteExpense(expenseId, deletedBy) {
    let isDeleted = false;
    try {
      const response = await axiosInstance.delete(`http://localhost:8085/expense/delete-expense/${expenseId}/${deletedBy}`)
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
      const response = await axiosInstance.get(`http://localhost:8085/group/get-all-groups/${userId}`);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Service error " + response.status);
      }
    } catch (err) {
      console.log("Error occurred while getting groups data in getGroupsDataByUserId(): " + err);
      throw err;
    }
  },

  async getGroupDataByGroupId(groupId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/group/get-group/${groupId}`);

      if (response.status === 200) {
        return response.data;
      }
      else {
        throw new Error("Service error " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting group data in  getGroupDataByGroupId():" + err);
      throw err;
    }

  },

  async getExpensesByGroupId(groupId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/expense/get-expenses/${groupId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw new Error("Service error " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting expenses for the group " + err);
      throw err;
    }
  },

  async getAllExpensesByUserId(userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/expense/get-user-expenses/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Service Error " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while fetching all expenses getAllExpensesByUserId() " + err);
      throw err;
    }
  },

  async saveSettlement(settlement) {
    let isSaved = false;
    try {
      const response = await axiosInstance.post("http://localhost:8085/settlement/settleAmount", settlement);
      if (response.status === 200) {
        isSaved = true;
      }
    }
    catch (err) {
      console.log("Error occurred while saving Settlement data " + err);
      isSaved = false;
    }
    finally {
      return isSaved;
    }
  },

  async getSettlements(groupId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/settlement//getAllSettlements/${groupId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching settlements " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while fetching settlements " + err);
      throw err;
    }
  },

  async getSettlementsByUserId(userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/settlement/getAllUserSettlements/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fecthing user settlements " + response.status)
      }
    }
    catch (err) {
      console.log("Error occurred while fetching all settlements for a user " + err);
      throw err;
    }
  },

  async updateSettlement(settlement) {
    let isSaved = false;
    try {
      const response = await axiosInstance.put("http://localhost:8085/settlement/updateSettlement", settlement);
      if (response.status === 200) {
        isSaved = true;
      }
    }
    catch (err) {
      console.log("Error occurred while updating Settlement data " + err);
      isSaved = false;
    }
    finally {
      return isSaved;
    }
  },

  async deleteSettlement(settlementId, loggedInUser) {
    let isDeleted = false;
    try {
      const response = await axiosInstance.delete(`http://localhost:8085/settlement/deleteSettlement/${settlementId}/${loggedInUser}`)
      if (response.status === 200) {
        isDeleted = true
      }
    }
    catch (err) {
      console.log(`Error occurred while deleting the settlement ${settlementId}` + err);
    }
    finally {
      return isDeleted;
    }
  },

  async getExpenseComments(expenseId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/comments/get-comments/expense/${expenseId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fecthing comments " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while fecthing comments for expense " + expenseId);
      throw err;
    }
  },
  async getSettlementComments(settlementId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/comments/get-comments/settlement/${settlementId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fecthing comments " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while fecthing comments for settlement " + settlementId);
      throw err;
    }
  },

  async postComments(comment) {
    let isSaved = false;
    try {
      const response = await axiosInstance.post("http://localhost:8085/comments/post-comment", comment);
      if (response.status === 200) {
        isSaved = true;
      }
      else {
        throw Error("Error saving comments" + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while saving comments data " + err);
    }
    finally {
      return isSaved;
    }
  },

  async deleteComment(commentId, userId) {
    let isDeleted = false;
    try {
      const response = await axiosInstance.delete(`http://localhost:8085/comments/delete-comment/${commentId}/${userId}`)
      if (response.status === 200) {
        isDeleted = true;
      }
    }
    catch {
      console.log("Error occurred while deleting comment " + commentId);
    }
    finally {
      return isDeleted;
    }
  },

  async getBalancesOfUser(userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/balance/getUserAllBalances/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching Balance data " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting Balance data " + err);
      throw err;
    }
  },

  async getBalanceSummary(userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/balance/getBalanceSummary/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching Balance Summary " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting Balance Summary for guest " + err);
      throw err;
    }
  },

  async getBalancesOfUserInGroup(groupId, userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/balance/getGroupBalances/${groupId}/${userId}`)
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching User Balance " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting user balances in group " + err);
      throw err;
    }
  },


  async getGroupBalanceSummary(groupId, userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/balance/getGroupBalanceSummary/${groupId}/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching User Balance " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting Group Balance Summary for guest " + err);
      throw err;
    }
  },

  async getAllGroupBalanceSummary(userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/balance/getGroupBalanceSummary/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching User Balance " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while getting Group Balance Summary for guest " + err);
      throw err;
    }
  },

  async loginUser(credentials) {
    try {
      const response = await axiosInstance.post("http://localhost:8085/user/login-user", credentials);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error validating login credentials " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while logging in user");
      throw err;
    }
  },

  async registerUser(user) {
    let isRegistered = false;
    try {
      const response = await axiosInstance.post("http://localhost:8085/user/register-user", user);
      if(response.status === 200)
      {
        isRegistered = true;
      }
      else{
        throw Error("Error registering user "+response.status);
      }
    }
    catch (err) {
      console.log("Error occured while registering user "+err);
      throw err;
    }
    return isRegistered;
  },

  async getGroupActivitiesByGroupId(groupId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/activity/getGroupActivities/${groupId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fecthing Activities" + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while retrieving Group Activities " + err);
      throw err;
    }
  },
  async getAllActivitiesByUserId(userId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/activity/getUserActivities/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fecthing Activities" + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while retrieving User Activities " + err);
      throw err;
    }
  },
  async getAllActivitiesByExpenseId(expenseId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/activity/getExpenseActivity/${expenseId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fecthing Activities" + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while retrieving Expense Activities " + err);
      throw err;
    }
  },
  async getAllActivitiesBySettlementId(settlementId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/activity/getSettlementActivity/${settlementId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fecthing Activities " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while retrieving Settlement Activities " + err);
      throw err;
    }
  },
  async getExpenseByExpenseId(expenseId, loggedInUserId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/expense/get-expense/${expenseId}/${loggedInUserId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching Expense " + response.status);
      }
    }
    catch (err) {
      console.log("Error occurred while retrieving expense data " + err);
      throw err;
    }
  },
  async getSettlementBySettlementId(settlementId, loggedInUserId) {
    try {
      const response = await axiosInstance.get(`http://localhost:8085/settlement/getSettlementDetails/${settlementId}/${loggedInUserId}`);
      if (response.status === 200) {
        return response.data;
      }
      else {
        throw Error("Error fetching Settlement " + response.status);
      }
    }
    catch (err) {
      console.log("Error occureed while retrieving Settlement data " + err);
      throw err;
    }
  }
};
