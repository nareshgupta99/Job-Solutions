import axios from 'axios';


const candidateSignup = async (candidate) => {
    console.log("candidate signup")
    const data = await axios.post("http://localhost:4000/api/auth/candidate/signup", candidate, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
    return data;

}

const candidateLogin = async (candidate) => {
    const data = await axios.post("http://localhost:4000/api/auth/candidate/login", candidate, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
    return data



}



export { candidateSignup, candidateLogin }