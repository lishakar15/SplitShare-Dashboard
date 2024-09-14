import axios from 'axios';
export const backendService = {
    
     async getDogsData () {
        try {
          const response = await axios.get("https://dog.ceo/api/breeds/list/all");
          console.log("my response "+response)
          if (response.status === 200) {
            return response.data;
          }
        } catch (error) {
          console.error("Error fetching dog breeds:", error);
          throw error;
        }
      },
    };