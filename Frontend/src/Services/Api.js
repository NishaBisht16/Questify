
const API_URL = 'http://localhost:8080/api/'; 

export const Get=async(endpoint,token)=>{
    try{
      console.log("Token sent :",token)
        const response=await fetch(`${API_URL}${endpoint}`,{
          method:"GET",
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }); 
        const data= await response.json();
        return data;

    }catch(error)
    {
        console.log("Data fetching error")
    }
}



export const Post = async (endpoint, data, token) => {
  try {
    debugger;
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
      body: JSON.stringify(data)
    });
    return await response.json();

  } catch (error) {
    console.error('Failed to send data:', error);
  }
};


export const Delete=async(endpoint,token)=>{
  try{
   
    const response=await fetch(`${API_URL}${endpoint}`,{
      method:"DELETE",
      headers:{
        'Authorization': `Bearer ${token}`
      }
       
    })
  }
  catch(error)
  {
    console.log("error",error)
  }
}

export const Put=async(endpoint,data,token)=>{
  try{
    const response=await fetch(`${API_URL}${endpoint}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        'Authorization': `Bearer ${token}` 
      },
      body:JSON.stringify(data)
    })
     return await response.json()
    
  }
  catch(error)
  {
    console.log(  "error",error)
  }
}