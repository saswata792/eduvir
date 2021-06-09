import React from "react";
import {useHistory} from 'react-router-dom'; 
import './profilestud.css';
import Mainchecker from "./mainchecker.js";
import firebase from "./fire.js";
function Profilestud()
{   
    let history=useHistory();
    let str="basicinfo";

    const [stud,setstud]=React.useState([])
	React.useEffect(()=>
		{	
            var db=firebase.firestore()

			const fetchdata= async()=>{
				const check=await db.collection('student').get()
				setstud(check.docs.map(doc=>doc.data()))
			}
			fetchdata()
		},[]) 
    
    function passchang()
    {
        
        
        document.getElementById("passchange").style.display="block";
       
    }
    function passchange()
    {
        document.getElementById("save").style.display="block";
    }
    function passchanged()
    {
        const prpass=document.getElementById('password-two').value;
        const nwpass=document.getElementById('nwpassword-two').value;
        var db=firebase.firestore()
        
        if(Mainchecker.getProfile()[str].password===prpass)
        {
            stud.forEach((check)=>{
                if(check[str].username===Mainchecker.getProfile()[str].username)
                {
                    let finaldict=check[str]
                    finaldict.password=nwpass
                    finaldict={[str]:finaldict}
                    db.collection('inst').doc(Mainchecker.getProfile()[str].username).update(finaldict).then(()=>{
                        alert("password updated")
                        document.getElementById("passchange").style.display="none"
                    })
                }
            })
        }
        else
            alert("you have pressed wrong password");
        
    }
    function logout(){
        history.push("/")
    }
   
    
    function subjects(){
        history.push("/subjectstud")
    }
    return(
    <React.Fragment>

<div class="head100">
            <h1>STUDENT PROFILE</h1>
            </div> 


            <button id = "logout"onClick={logout}><b>LOGOUT</b></button>
            <button id = "subject"onClick={subjects}><b>SUBJECTS OFFERED</b></button>

            <div id="profilestudent">
            <div class="username-one"><label htmlFor="username"><b>USERNAME</b></label></div>
            <div class="username-two" >{Mainchecker.getProfile()[str].username}</div>
            <div class="name-one"> <label htmlFor="name"><b>NAME</b></label></div>
            <div class="name-two" >{Mainchecker.getProfile()[str].name}</div> 
            <div class="email-one"> <label htmlFor="email"><b>EMAIL</b></label></div>
            <div class="email-two" >{Mainchecker.getProfile()[str].email}</div> 
            <div class="dob-one">  <label htmlFor="dob"><b>DOB</b></label></div>
            <div class="dob-two" >{Mainchecker.getProfile()[str].DateofBirth}</div>
            </div>

            <button id="change" onClick={passchang}><b>CHANGE PASSWORD</b></button>

            <div id="passchange" style={{display:"none"}}>
            <div class="c1">
                    <label htmlFor="password-two"><div class="t100"><b>PREVIOUS PASSWORD</b></div></label>
                    <input id="password-two" class="password-two" onChange={passchange}></input>
                    </div>
                    <div class="c2">
                    <label htmlFor="nwpassword-two"><div class="t100"><b>NEW PASSWORD</b></div></label>
                    <input id="nwpassword-two" class="nwpassword-two" onChange={passchange}></input>
                    </div>
                    <div class="c3">
                    <button id="save" style={{display:"none"}} onClick={passchanged}><b>SAVE</b></button>
                    </div>
          
         </div>
    </React.Fragment>
   
    );
}
export default Profilestud;