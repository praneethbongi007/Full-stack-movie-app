const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endPoint, params) => {
  const qs = new URLSearchParams(params); //we have created a query search params;
  //what ever the url is, it is seperated into key:value pairs
  retunr`${baseUrl}${endPoint}?api_key=${key}&${qs}`; //
};

export default { getUrl }; //we are sending this function as a object eg:- const varible_name = {geturl : ()=>{}}
