import React from "react";
import './signup.css';
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
import Mainchecker from "./mainchecker";

var db=firebase.firestore();
function Signup()
{
	let history=useHistory();
	const [inst,setinst]=React.useState([])
	React.useEffect(()=>
		{	
			const fetchdata= async()=>{
				const check=await db.collection('inst').get()
				setinst(check.docs.map(doc=>doc.data()))
			}
			fetchdata()
		},[]) 
	const [facul,setfacul]=React.useState([])
	React.useEffect(()=>
			{	
				const fetchdata= async()=>{
					const check=await db.collection('faculty').get()
					setfacul(check.docs.map(doc=>doc.data()))
				}
				fetchdata()
		},[])
	const [stud,setstud]=React.useState([])
	React.useEffect(()=>
		{	
			const fetchdata= async()=>{
				const check=await db.collection('student').get()
				setstud(check.docs.map(doc=>doc.data()))
			}
			fetchdata()
	},[])  
	function store()
	{
		const usrnm=document.getElementById("username").value;
		const pass=document.getElementById("password").value;
		const email=document.getElementById("email").value;
		const date=document.getElementById("dob").value;
		const nam=document.getElementById("named").value;
		var flag=0;
		var str="basicinfo";
		if(usrnm.includes("@"))
		{
			
				
				const usrnm_array=usrnm.split("@");
				if(usrnm_array[1]==='inst')
				{
					
					inst.forEach((check)=>{
							if(check[str].username===usrnm)
							{
								alert("username already exist");
								document.getElementById("username").value="";
								document.getElementById("password").value="";
								document.getElementById("email").value="";
								document.getElementById("dob").value="";
								document.getElementById("named").value="";
								flag=1;
								history.push('/signup');
							}
					
				    	})
							if(flag===0)
							{
								let named={[str]:{
									
													name: nam,
													username:usrnm,
													password:pass,
													email:email,
													DateofBirth:date,
													flag:0
												}
								}
								db.collection('inst').doc(usrnm).set(named)
											.then(()=>{
												alert("Succesfully Registered")
												Mainchecker.setProfile(named)
												history.push("/profileinst")
												
											})
											.catch((error)=>{
												alert("try again");
											})
							}
				}
				if(usrnm_array[1]==='faculty')
				{
					
					facul.forEach((check)=>{
							if(check[str].username===usrnm)
							{
								alert("username already exist");
								document.getElementById("username").value="";
								document.getElementById("password").value="";
								document.getElementById("email").value="";
								document.getElementById("dob").value="";
								document.getElementById("named").value="";
								flag=1;
								history.push('/signup');
							}
					
				    	})
							if(flag===0)
							{
								let named={[str]:{
									
													name: nam,
													username:usrnm,
													password:pass,
													email:email,
													DateofBirth:date,
													flag:0
												}
								}
								db.collection('faculty').doc(usrnm).set(named)
											.then(()=>{
												alert("Succesfully Registered!")
												Mainchecker.setProfile(named)
												history.push("/profilefac")
												
											})
											.catch((error)=>{
												alert("try again");
											})
							}
				}
				if(usrnm_array[1]==='stud')
				{
					
					stud.forEach((check)=>{
							if(check[str].username===usrnm)
							{
								alert("username already exist");
								document.getElementById("username").value="";
								document.getElementById("password").value="";
								document.getElementById("email").value="";
								document.getElementById("dob").value="";
								document.getElementById("named").value="";
								flag=1;
								history.push('/signup');
							}
					
				    	})
							if(flag===0)
							{
								let named={[str]:{
									
													name: nam,
													username:usrnm,
													password:pass,
													email:email,
													DateofBirth:date,
													flag:0
												}
								}
								db.collection('student').doc(usrnm).set(named)
											.then(()=>{
												alert("Succesfully Registered")
												Mainchecker.setProfile(named)
												history.push("/profilestud")
												
											})
											.catch((error)=>{
												alert("try again");
											})
							}
				}
		}
		else
		{
			alert("it's mandatory to enter a @");
		}
	
	}

	function home(){
    
		history.push('/')
	  }

		return(
			<React.Fragment>
			<div className="signup">

			<div class="head">
			<h1>SIGN UP</h1>
			</div>

			<div class name="main">
			
			    <div class="usernamel"><label for="username" ><div class = "t20"><b>USERNAME</b></div></label></div>
				<input type="text" placeholder="username@stud/faculty/inst" class="username" id="username" required></input>

				<div class="namedl"><label for="named"><div class = "t20"><b>NAME</b></div></label></div>
				<input type="text" class="named" id="named" required></input>

				<div class="passwordl"><label for="password"><div class = "t20"><b>PASSWORD</b></div></label></div>
                <input type="password" class="password" id="password" required></input>

				<div class="emaill"> <label for="email"><div class = "t20"><b>EMAIL</b></div></label></div>
                <input type="email" class="email" id="email" required></input>

				<div class="dobl"> <label for="dob"><div class = "t20"><b>DATE OF BIRTH</b></div></label></div>
                <input type="date" class="dob"id="dob" required></input>

				<div class="b20"><button onClick={store}>SIGNUP</button></div>
				<div class="bhome"> <button onClick={home}><div class = "t10"><b>HOME</b></div></button></div>

				</div>
			
			</div>
			</React.Fragment>


			);
	
}
export default Signup;