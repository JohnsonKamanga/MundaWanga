import  Constants  from "expo-constants";

export const baseurl = `http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':3000')}`