import React from "react"
import './faculfac.css';
import Mainchecker from "./mainchecker.js"
import firebase from "./fire.js"
import {useHistory} from "react-router-dom"
import Student from "./studentsec.js"

function Facultyfac(){
   
    var str="basicinfo"
    let history=useHistory()
    
   
    
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
                const [stud,setstud]=React.useState([])
                React.useEffect(()=>
                    {
                        var  db=firebase.firestore()	
                        const fetchdata= async()=>{
                            const check=await db.collection('student').get()
                            setstud(check.docs.map(doc=>doc.data()))
                        }
                        fetchdata()
                    },[]) 
    function Enrolled(enroll){
        
        let student_f=[]
        stud.forEach((data)=>{
            
            if(enroll["students"].includes(data[str].username))
            {
                student_f.push(data[str].username)
            }
        })
        let student_section={
            studentsection:student_f,
            subject:enroll["subjectcode"]
        }
        Student.setProfile(student_section)
        history.push("/studentsec")
    }
    function faculty(){
        let final=0
        let content=`
        <table id=table2>
      <tr> 
             <th><label for="assfaculname">FACULTY NAME</label></th>
             <th><label for="assfaculusername">FACULTY USERNAME</label></th>
             <th><label for="day">DAY</label></th>
             <th><label for="timeslot">TIMESLOT</label></th>
             <th><label for="subjectcode">SUBJECT CODE</label></th>
             <th><label for="subjectname">SUBJECT NAME</label></th>
             </tr>
             
             </table>`
        let subject=[]
        Object.values(sub).forEach((data)=>{
                    subject[data.subjectcode]=data
         
        })
        facul.forEach((check)=>{
            if(check[str].username===Mainchecker.getProfile()[str].username)
            {
                final=check
            }

        })
        let last=[]
        final=Object.keys(final)
        final.forEach((val)=>{
            if(val!==str)
            {
                
                last.push(val)
            }
           

        })
        
        last.map((data)=>(
           
                                `
                                <div class="tableone">

                                <table>
                                <tr>
                                <td><div>${subject[data].facultyname}</div></td>
                                
                                <td> <div>${subject[data].facultyusrname}</div></td>
                                
                                <td> <div>${subject[data].day}</div></td>
                                
                                <td> <div>${subject[data].time}</div></td>
                                
                                <td> <div>${subject[data].subjectcode}</div></td>
                                
                                <td> <div>${subject[data].subjectname}</div></td>

                                </tr>
                                </table>
                                </div>

                                <div class="student">

                                <button id="${subject[data].subjectcode}">DETAILS</button>
                                </div>
                                `
                                
                
                )).forEach((element)=>{
                    content+=element
                })
                document.getElementById("faculinvolve").innerHTML=content;
                Object.keys(sub).forEach((check)=>{
                    if(last.includes(sub[check]["subjectcode"]))
                    {
                    document.getElementById(sub[check]["subjectcode"]).addEventListener("click",function(){
                                Enrolled(sub[check])
                      })
                    }
                })
                    
            
        
    }
    function logout(){

        history.push("/")
    }
   
    function profile(){
        history.push("/profilefac")
    }
   

    return(
        <React.Fragment>


<div class="header1">
            <h1>WELCOME TO THE FACULTY SECTION</h1>
            </div> 
            <div class="b3"> <button onClick={logout}><b>LOGOUT</b></button></div>
            <div class="b4"> <button onClick={profile}><b>PROFILE</b></button></div>

        
            <div class="b5"> <button onClick={faculty}><b>CLICK TO CHECK SUBJECTS</b></button></div>
        <div id="faculinvolve"></div>
        </React.Fragment>
    )
         
}
export default Facultyfac;
