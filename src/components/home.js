import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
import Mainchecker from "./mainchecker.js";


function Header()
{
	let  history= useHistory();
	
	let str="basicinfo";
	function signupclick()
	{
		alert("Institute:username@inst,Student:username@stud,Faculty:username@faculty");
		history.push("/signup");
	}

	const [inst,setinst]=React.useState([])
	React.useEffect(()=>
		{	
			var db=firebase.firestore();
			const fetchdata= async()=>{
				const check=await db.collection('inst').get()
				setinst(check.docs.map(doc=>doc.data()))
			}
			fetchdata()
		},[])
		const [facul,setfacul]=React.useState([])

		React.useEffect(()=>
		{	
			var db=firebase.firestore();
			const fetchdata= async()=>{
				const check=await db.collection('faculty').get()
				setfacul(check.docs.map(doc=>doc.data()))
			}
			fetchdata()
		},[])
		const [stud,setstud]=React.useState([])
		React.useEffect(()=>
		{	
			var db=firebase.firestore();
			const fetchdata= async()=>{
				const check=await db.collection('student').get()
				setstud(check.docs.map(doc=>doc.data()))
			}
			fetchdata()
		},[])    
	
	function Checkdata()
	{
		const usrnm=document.getElementById("username").value;
	    const pass=document.getElementById("password").value;
		
		const usrnm_arr=usrnm.split('@')
			if(usrnm_arr[1]==='inst')
			{
				inst.forEach((check)=>{
					try{
						if(check[str].username===usrnm)
						{
							if(check[str].password===pass)
							{
								Mainchecker.setProfile(check);
								history.push('/facultyinst');
							}
							else
							{
								alert("password doesn't match")
							}
						}
					}
					catch
					{
						alert("your account doesn't exist"); 
					}
			
				})
			}
			if(usrnm_arr[1]==='faculty')
			{
				facul.forEach((check)=>{
					try{
						if(check[str].username===usrnm)
						{
							if(check[str].password===pass)
							{
								Mainchecker.setProfile(check);
								history.push('/facultyfac');
							}
							else
							{
								alert("password doesn't match")
							}
						}
					}
					catch
					{
						alert("your account doesn't exist"); 
					}
			
				})
			}	
			if(usrnm_arr[1]==='stud')
			{
				stud.forEach((check)=>{
					try{
						if(check[str].username===usrnm)
						{
							if(check[str].password===pass)
							{
								Mainchecker.setProfile(check);
								history.push('/subjectstud');
							}
							else
							{
								alert("password doesn't match")
							}
						}
					}
					catch
					{
						alert("your account doesn't exist"); 
					}
			
				})
			}	
			
	}
		return(
			<React.Fragment>
			<div class="header">
            <h1>STUDENT/FACULTY/INSTITUTE SIGN IN</h1>
            </div> 
			<div class="signin">
				<label htmlFor="username" ><div class="tnew"><b>USERNAME</b></div></label>
				<input type="text" className="username-but" id="username" required></input>
				<label htmlFor="password"><div class="tnew"><b>PASSWORD</b></div></label>
				<input type="password" className="password-but" id="password" required></input>

			<div class="b1"><button id="signin" onClick={Checkdata}>SIGN IN</button></div>	
			<div class="b2"> <button  id="signup" onClick={signupclick}>SIGN UP</button></div>
			</div>
			</React.Fragment>


			);
	
}
export default Header;