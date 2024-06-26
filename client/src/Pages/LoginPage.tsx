import React  from "react";
import { useState } from "react";
import Navbar from "../component/Navbar";
import '../Css/LoginPage.css'

// import { Lock } from 'lucide-react';
import { FaLock } from "react-icons/fa";
// import { Mail } from 'lucide-react';
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const LoginPage=()=>{
    const [credentials,setcredentials]=useState({email:"" ,password:""});
    const [showPopup, setShowPopup] = useState(false);
    const [signInButton,setsignInButton]=useState(true);
    const Navigate=useNavigate();
    const handleSubmit=async(event:React.MouseEvent<HTMLButtonElement>)=>{
        setsignInButton(false)
        setShowPopup(true)
    

        event.preventDefault();
        const response=await fetch("http://localhost:8000/LogIn",{        
            method:"POST",
            headers:{
                'Content-Type':'application/json'     
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})

        })
        
        const json=await response.json();
        console.log(json);

        if(!json.success){
            setShowPopup(false)
            setsignInButton(true)
            alert("wrong information you are providing")
        }
        if(json.success){
            setShowPopup(false)
            setsignInButton(true)
            localStorage.setItem("authToken",json.authToken)
            localStorage.setItem("userEmail",credentials.email)
            localStorage.setItem("userId",json.userId)
            // console.log(userId)
            alert("login successfully")
            Navigate("/")
        }
    }
    const HandleNamechange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

    return<>
    <div className="Home">
        <div>
            <Navbar/>
        </div>
        <div className="">
            <div className="rightside">

            <div className="FormMainContainer">

                <div>
                    <h2>LOG-IN</h2>
                </div>

                <div className="LoginPageInputRow LoginPageFirstInputRow">
                    <div className="formIcon"><FaLock/></div>
                    <input type="email" name="email" value={credentials.email} onChange={HandleNamechange}  id="emailInput" placeholder="Your Email"/>
                </div>

                <div className="LoginPageInputRow"> 
                <div className="formIcon"><CiMail/></div>    
                        <input type="password" name="password" value={credentials.password} onChange={HandleNamechange} placeholder="Password"/>     
                    {/* <input type="password" name="password" value={credentials.password} onChange={HandleNamechange} id="passwordInput" placeholder="Password"/> */}
                </div> 
                {showPopup &&
                    <div className="SingingUpLoading">
                    <h2>Please Wait !</h2>
                    <div className="SignUpLoader"></div>
                </div>
                }
                {signInButton &&
                    <div className="FormButton">
                    <button onClick={handleSubmit}>Submit</button>
                    </div>
                }
                
                


                

            </div>

            </div>

        </div>
    </div>
    </>
}

export default LoginPage;