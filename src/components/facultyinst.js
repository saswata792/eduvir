import React from "react"
import './facultyinst.css';
import Mainchecker from "./mainchecker.js"
import firebase from "./fire.js"
import {useHistory} from "react-router-dom"

function Facultyinst(){
    
    var str="basicinfo"
    let history=useHistory()
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
                const [test, getTests] = React.useState([]);
                React.useEffect(()=>{
                    const db = firebase.firestore();
                    return db.collection("test").onSnapshot((snapshot) => {
                        const content = []
                        snapshot.forEach(doc => {
                            content.push({ ...doc.data()})
                        })
                            getTests(content)
                        })
                }, [])
                
    function student(value){
        console.log(value.students)
        let stud_final=0
        let stud_final_f=[]
        stud_final=value.students
                stud.forEach((data)=>{
           
                    if(stud_final.includes(data[str].username))
                    {
                        stud_final_f.push(data[str])
                    }
                })             
        let content=`
        <table id=table3>
      <tr> 
             <th><label htmlFor="username">USERNAME</label></th>
             <th><label htmlFor="name">NAME</label></th>
             <th><label htmlFor="email">EMAIL</label></th>
             <th><label htmlFor="dob">DATE OF BIRTH</label></th>
             </tr>
             
             </table>`
         
         document.getElementById("students").style.display="block"

         var performance=[]
        
        
        stud_final_f.map((val)=>(
         
         `
         <div class="tablethree">
 
             <table>
             <tr>
         
         <td><div>${val.username}</div></td>
         
         <td> <div>${val.name}</div> </td>
         
         <td> <div>${val.email}</div> </td>
         
         <td><div>${val.DateofBirth}</div></td>
         </tr>
         <table>
         </div>
         <div class="performbut">
         <button id="${val.username}">PERFORMANCE</button>
         
         <div style="display:none" id="div_${val.username}"></div>
         <button  style="display:none" id="but_${val.username}">CLOSE</button>
         </div>
         `
         )).forEach((element)=>{
         content+=element
         })
         document.getElementById("students").innerHTML=content
         let context
         let code=0
         Object.keys(test).forEach((check)=>{
             if(test[check]["subjectcode"]===value["subjectcode"])
             {
                 code=test[check]
             }    
         })   
         stud_final.forEach((data)=>
                     {
                         document.getElementById(data).addEventListener("click",function()
                         {
                             context=''
                             performance=[]
                             document.getElementById("but_"+data).style.display="block"
                             Object.values(code).forEach((val)=>{
                                 if(val!==value["subjectcode"] && val!==0)
                                         performance.push(val[data])
                             })
                             
                             document.getElementById("div_"+data).style.display="block"
                             document.getElementById(data).style.display="none"
                     
                             performance.map((dat)=>(
                                 
                                 `<input type="range" min=0 max=100 value=${dat.split("%")[0]}>${dat}</input>`
                             )).forEach((element)=>{
                                 context+=element
                             })
                             
                             document.getElementById("div_"+data).innerHTML=context
                         })
                        
                         document.getElementById("but_"+data).addEventListener("click",function()
                         {
                             performance=[]
                             context=''
                             document.getElementById(data).style.display="block"
                             document.getElementById("div_"+data).style.display="none"
                             document.getElementById("but_"+data).style.display="none"
                         })
                            
                     })
                        
    } 
    function faculty(){
        document.getElementById("faculcontac").style.display="block"
        document.getElementById("subjectmore").style.display="none"
        document.getElementById("students").style.display="none"
        
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

            <div class="perform">
            <button id="${data.subjectcode}">CHECK</button>
            </div>
            
            </div>`:``
            )).forEach((element)=>{
                    content+=element
            })
            document.getElementById("faculcontac").innerHTML=content;
            Object.values(sub).forEach((val)=>{
                
                document.getElementById(val["subjectcode"]).addEventListener("click",function()
                         {
                            console.log(val)
                            document.getElementById("faculcontac").style.display="none"
                             student(val)
                         })
            })
    }

    
    
    function logout(){

        history.push("/")
    }
    function moresubject()
    {
        const sub=document.getElementById("subjectmore");
        sub.style.display="block";
        document.getElementById("faculcontac").style.display="none";
        document.getElementById("students").style.display="none"
    }
    function profile(){
        history.push("/profileinst")
    }
    function savefacul()
    {
        var  db=firebase.firestore()
        document.getElementById("students").style.display="none"
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
        <div id="students" style={{display:"none"}}></div>
        </React.Fragment>
    )
         
}
export default Facultyinst;