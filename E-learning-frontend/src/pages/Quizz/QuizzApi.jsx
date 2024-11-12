import axios from 'axios';
import Base_Url from '../../Base_Url';
export  const getQuizzes = async()=>{
    try {
      
       const response =  await axios.get(`${Base_Url}/api/quizz/quizzes`)
     
       return response.data;
    } catch (error) {
        console.log('error in getQuizzes',error);
        throw new Error(error);
    }
}