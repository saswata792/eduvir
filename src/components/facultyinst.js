import React from "react"
import './facultyinst.css';
import Mainchecker from "./mainchecker.js"
import firebase from "./fire.js"
import {useHistory} from "react-router-dom"

function Facultyinst(){
    
    var str="basicinfo"
    let history=useHistory()
    
   
    const [inst,setinst]=React.useState([])
    React.useEffect(()=>
		{	
            var  db=firebase.firestore()
			const fetchdata= async()=>{
				const check=await db.collection('inst').get()
				setinst(check.docs.map(doc=>doc.data()))
			}
			fetchdata()
		},[])
        const [facul,setfacul]=React.useState([])
        React.useEffect(()=>
            {	
                var  db=firebase.firestore()
                const fetchdata= async()=>{
                    const check=await db.collection('faculty').get()
                    setfacul(check.docs.map(doc=>doc.data()))
                }
                fetchdata()
            },[])
            const [sub,setsub]=React.useState([])
            React.useEffect(()=>
                {	
                    var  db=firebase.firestore()
                    const fetchdata= async()=>{
                        const check=await db.collection('subjects').get()
                        setsub(check.docs.map(doc=>doc.data()))
                    }
                    fetchdata()
                },[])  
    function faculty(){
        document.getElementById("faculcontac").style.display="block"
        document.getElementById("subjectmore").style.display="none"


        let content=`
        <table id=table1>
      <tr> 
             <th><label for="assfaculname">FACULTY NAME</label></th>
             <th><label for="assfaculusername">FACULTY USERNAME</label></th>
             <th><label for="day">DAY</label></th>
             <th><label for="timeslot">TIMESLOT</label></th>
             <th><label for="subjectcode">SUBJECT CODE</label></th>
             <th><label for="subjectname">SUBJECT NAME</label></th>
             </tr>
             
             </table>`
        
        
        Object.values(sub).map((data)=>(
            
            (data.instname===Mainchecker.getProfile()[str].username)?
            `
            <div class="tableone">

            <table>
            <tr>
           <td><div>${data.facultyname}</div></td>
            
            <td><div>${data.facultyusrname}</div></td>
            
            <td> <div>${data.day}</div></td>
            
            <td>  <div>${data.time}</div></td>
            
            <td>  <div>${data.subjectcode}</div></td>
            
            <td>  <div>${data.subjectname}</div></td>

            </tr>
            <table>
            
            </div>`:``
            )).forEach((element)=>{
                    content+=element
            })
            
        
    
        document.getElementById("faculcontac").innerHTML=content;
        
    }
    function logout(){

        history.push("/")
    }
    function moresubject()
    {
        const sub=document.getElementById("subjectmore");
        sub.style.display="block";
        document.getElementById("faculcontac").style.display="none";
    }
    function profile(){
        history.push("/profileinst")
    }
    function savefacul()
    {
        var  db=firebase.firestore()
        let faculty=[];
        let subjects=[];
        let str="basicinfo"
        let final=0
        const subnm=document.getElementById("subjectnm-two").value;
        const afacul=document.getElementById("assfacul-two").value;
        const afaculnm=document.getElementById("assfaculnm-two").value;
        const subcd=document.getElementById("subjectcd-two").value;
        const day=document.getElementById("day-two").value;
        const time=document.getElementById("time-two").value;
        const  nam=Mainchecker.getProfile()[str].username.split('@')
        const concat=nam[0]+'@'+subcd;
        
        inst.forEach((check)=>{

            
            if(check[str].username===Mainchecker.getProfile()[str].username && check[str]["flag"]===0)
            {
                faculty.push(afacul)
                subjects.push(subcd)
                final=check[str]
                final["flag"]=1
                db.collection('inst').doc(Mainchecker.getProfile()[str].username).update({[str]:final})
            }
            if(check[str].username===Mainchecker.getProfile()[str].username && check[str]["flag"]!==0)
            {
                faculty=check.faculty
                subjects=check.subjects
                if(faculty.includes(afacul))
                {
                    
                    subjects.push(concat)
                }
                else{
                    faculty.push(afacul)
                    subjects.push(concat)

                }
            }
            
        })
        db.collection('inst').doc(Mainchecker.getProfile()[str].username).update({
            faculty:faculty,
            subjects:subjects
        })
        let alltogether={[concat] : {
            
            subjectname:subnm

         }}
        facul.forEach((check)=>{
            if(check[str].username===afacul)
            {
                db.collection('faculty').doc(afacul).update(alltogether)
            }
        })
        let alltog={
                     Faculty:faculty,
                     Subjects:subjects
                 } 
        
        db.collection('inst').doc(Mainchecker.getProfile().username).update(alltog);
        
        let all={
            instname:Mainchecker.getProfile()[str].username,
            subjectname:subnm,
            facultyname:afaculnm,
            facultyusrname:afacul,
            day:day,
            time:time,
            subjectcode:concat,
            flag: 0
        }
        db.collection('subjects').doc(concat).set(all).then(()=>
        {
            alert("saved successfully")
            document.getElementById("subjectmore").style.display="none"
            document.getElementById("faculcontac").style.display="block"
        }).catch((error)=>{console.log("error",error)})
    }
    function savefaculty(){
        document.getElementById("savebut").style.display="block";
    }
    return(
        <React.Fragment>

<div class="header2">
            <h1>WELCOME TO THE INSTITUTE SECTION</h1>
            </div> 
        <button id="logout2"onClick={logout}><b>LOGOUT</b></button>
        <button id="profile2" onClick={profile}><b>PROFILE</b></button>
        
        <button id="but1" onClick={faculty}><b>CHECK FACULTY DETAILS</b></button>
        <button id="but2"onClick={moresubject}><b>ADD MORE SUBJECTS</b></button>


            <div id="subjectmore" style={{display:"none"}}>

                <div class="subjectnm-one"><label htmlFor="subjectnm" ><b>SUBJECT NAME</b></label></div>
                <input id="subjectnm-two" onChange={savefaculty}></input>
                <div class="assfacul-one"> <label htmlFor="assfacul"><b>USERNAME</b></label></div>
                <select id="assfacul-two">
                    {
                      facul.map((data)=>(
                        <option value={data[str].username} >{data[str].username}</option>
                    ))
                    
                    }
                </select>
                <div class="assfaculnm-one"> <label htmlFor="assfaculnm"><b>FACULTY NAME</b></label></div>
                <input id="assfaculnm-two" onChange={savefaculty}></input> 
                <div class="subjectcd-one">  <label htmlFor="subjectcd"><b>SUBJECT CODE</b></label></div>
                <input id="subjectcd-two" onChange={savefaculty}></input>
                <div class="day-one">  <label htmlFor="day"><b>DAY</b></label></div>
                <select id="day-two">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                </select>
                <div class="time-one"> <label htmlFor="time"><b>TIME SLOT</b></label></div>
                <input id="time-two" onChange={savefaculty}></input>
                <button id="savebut" style={{display:"none"}} onClick={savefacul}><b>SAVE</b></button>
            </div>
        <div id="faculcontac" style={{display:"block"}}>
        </div>
        </React.Fragment>
    )
         
}
export default Facultyinst;