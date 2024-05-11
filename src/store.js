import { defineStore } from 'pinia';

export const socialMediaStore = defineStore('socialMediaStore', {
  state: () => ({
    userLoginInfo:{},
    error:{
      show:false,
      timeout:6000,
      color:"danger",
      message:"Unauthorize"
    },
  }),
  actions: {
    constructError(error) {
      var errorMessage = {
        show:true,
        timeout:6000,
        color:"error",
        status : 0,
        title:"",
        details : []
      }
      errorMessage.status = error.response?.status
      if (error.response) {
        if (Array.isArray(error.response.data)) {
          errorMessage.details = error.response.data
        } else {
          errorMessage.title = error.response.data.title
        }
      } else {
        errorMessage.title = error.message
      }
      return errorMessage;
    },
  },
});
