import React from "react"
import './subjectstud.css';
import Mainchecker from "./mainchecker.js"
import firebase from "./fire.js"
import {useHistory} from "react-router-dom"


function Subjectstud(){
    
    var str="basicinfo"
    let history=useHistory()
    let enrolled_subject=[]
    let enrolled_user=0
        const [stud,setstud]=React.useState([])
        React.useEffect(()=>
            {	
               
                const fetchdata= async()=>{
                    var  db=firebase.firestore()
                    const check=await db.collection('student').get()
                    setstud(check.docs.map(doc=>doc.data()))
                }
                fetchdata()
            },[])  
            const [subj,setsubj]=React.useState([])
            React.useEffect(()=>
                {	
                    
                    const fetchdata= async()=>{
                        var  db=firebase.firestore()
                        const check=await db.collection('subjects').get()
                        setsubj(check.docs.map(doc=>doc.data()))
                    }
                    fetchdata()
                },[]) 
                const [test,settest]=React.useState([])
                React.useEffect(()=>
                    {	
                        
                        const fetchdata= async()=>{
                            var  db=firebase.firestore()
                            const check=await db.collection('test').get()
                            settest(check.docs.map(doc=>doc.data()))
                        }
                        fetchdata()
                    },[]) 
    function logout(){

        history.push("/")
    }
    function Book(subject)
    {
       var  db=firebase.firestore()
        let stud=[]
        let basic
        if(subject.flag===0)
        {
            stud.push(Mainchecker.getProfile()[str].username)
            subj.forEach((data)=>{
                
                if(data.subjectcode===subject.subjectcode)
                {
                    basic=data
                }
            })
            basic.flag=1
            basic.students=stud
            db.collection('subjects').doc(subject.subjectcode).update(basic
            ).then(()=>
    
            {   
                alert("booked successfully")
                db.collection('student').doc(Mainchecker.getProfile()[str].username).update({[subject.subjectcode]:subject.subjectcode})
                return
            })

        }
        if(subject.flag!==0)
        {
            subj.forEach((data)=>{
                
                if(data.subjectcode===subject.subjectcode)
                {
                    basic=data
                }
            })
            stud=basic.students
            stud.push(Mainchecker.getProfile()[str].username)
            db.collection('subjects').doc(subject.subjectcode).update(
                {
                    
                    students:stud
                        
                   
                }
            ).then(()=>
    
            {   
                alert("booked successfully")
                db.collection('student').doc(Mainchecker.getProfile()[str].username).update({[subject.subjectcode]:subject.subjectcode})
                return
            })
        }
        
        
    }
   
    stud.forEach((val)=>{
       
             if(val[str].username===Mainchecker.getProfile()[str].username)
             {
             enrolled_user=val
             }
         })
         Object.keys(enrolled_user).forEach((data)=>{
             if(data!==str)
             {
             enrolled_subject.push(enrolled_user[data])
             }
         })
    function subjectenrolled(){
           
        let content=
        `<table id=table1>
             <tr> 
             <th><label for="assfaculname">FACULTY NAME</label></th>
             <th> <label for="instname">INSTITUTE NAME</label></th>
             <th> <label for="assfaculusername">FACULTY USERNAME</label></th>
             <th><label for="day">DAY</label></th>
             <th><label for="timeslot">TIMESLOT</label></th>
             <th><label for="subjectcode">SUBJECT CODE</label></th>
             <th><label for="subjectname">SUBJECT NAME</label></th>
             </tr>
             
             </table>`
           document.getElementById("subjectmore").style.display="none";
           let enrolled_subject_f=[]
           document.getElementById("subjectenrolled").style.display="block";
           
            
            
            subj.forEach((valueo)=>{
                if(enrolled_subject.includes(valueo["subjectcode"]))
                {
                    enrolled_subject_f.push(valueo)
                }
            })
            
            enrolled_subject_f.map((data)=>(
               
                `
                <div class="tableone">

            <table>
            <tr>
               <td> <div>${data["facultyname"]}</div></td>
               
               <td> <div>${data["instname"]}</div></td>
               
               <td> <div>${data["facultyusrname"]}</div></td>
                
               <td><div>${data["day"]}</div></td>
                
               <td> <div>${data["time"]}</div></td>
                
               <td> <div>${data["subjectcode"]}</div></td>
                
               <td> <div>${data["subjectname"]}</div></td>
               </tr>
               <table>

               </div>

                <div class="perform">
                <button id="${data["subjectcode"]}">PERFORMANCE</button>
                <div id="div_${data["subjectcode"]}" style="display:none"></div>
                <button id="but_${data["subjectcode"]}" style="display:none">CLOSE</button>
                </div>

                `
                
                
                )).forEach((element)=>{
                        content+=element
                })
                document.getElementById("subjectenrolled").innerHTML=content
                let marks
                let context
                Object.values(test).forEach((dat)=>{
                    console.log(dat["subjectcode"])
                    console.log(enrolled_subject)
                    if (enrolled_subject.includes(dat["subjectcode"]))
                    {
                       
                        
                        document.getElementById(dat["subjectcode"]).addEventListener("click",function(){
                            context=''
                            marks=[]
                            document.getElementById("div_"+dat["subjectcode"]).style.display="block"
                            document.getElementById("but_"+dat["subjectcode"]).style.display="block"
                            document.getElementById(dat["subjectcode"]).style.display="none"
                            Object.values(dat).forEach((val)=>{
                                if(dat["subjectcode"]!==val && val!==0)
                                {
                                marks.push(val[Mainchecker.getProfile()[str].username])
                                }
                            })
                            marks.map((value)=>(
                                   `<input type="range">${value}</input>`
                                    )).forEach((element)=>{
                                    context+=element
                                  })
                           document.getElementById("div_"+dat["subjectcode"]).innerHTML=context    
                        
                        })
                        document.getElementById("but_"+dat["subjectcode"]).addEventListener("click",function(){
                            marks=[]
                            context=''
                            document.getElementById("div_"+dat["subjectcode"]).style.display="none"
                            document.getElementById("but_"+dat["subjectcode"]).style.display="none"
                            document.getElementById(dat["subjectcode"]).style.display="block"
                        }) 
                    } 
                })
                
                    
               
                    
                   
    }
    function moresubjectstud()
    {
        
        let content=`
        <table id=table1>
      <tr> 
             <th><label for="assfaculname">FACULTY NAME</label></th>
             <th> <label for="instname">INSTITUTE NAME</label></th>
             <th> <label for="assfaculusername">FACULTY USERNAME</label></th>
             <th><label for="day">DAY</label></th>
             <th><label for="timeslot">TIMESLOT</label></th>
             <th><label for="subjectcode">SUNJECT CODE</label></th>
             <th><label for="subjectname">SUBJECT NAME</label></th>
             </tr>
             
             </table>`
        let message=content
        document.getElementById("subjectmore").style.display="block";
        
        document.getElementById("subjectenrolled").style.display="none";
        Object.values(subj).map((data)=>(
            (enrolled_subject.includes(data["subjectcode"]))?``:
            `
            <div class="tableone">

            <table>
            <tr>
        
           <td><div>${data["facultyname"]}</div></td>
            
           <td><div>${data["instname"]}</div></td>
            
           <td><div>${data["facultyusrname"]}</div></td>
            
           <td><div>${data["day"]}</div></td>
            
           <td><div>${data["time"]}</div></td>
            
           <td><div>${data["subjectcode"]}</div></td>
            
           <td><div>${data["subjectname"]}</div></td>
           </tr>
           <table>

               </div>

               <div class="perform">
            <button id="${data["subjectcode"]}">ADD</button>
            </div>
            `
            )).forEach((element)=>{
                    content+=element
            })
            if(message===content)
            {
                content='<div class="nosub">NO MORE NEW SUBJECTS AVAILABLE</div>'
                document.getElementById("subjectmore").innerHTML=content
            }
            else
                document.getElementById("subjectmore").innerHTML=content
        
        Object.values(subj).forEach((check)=>{
            if(!enrolled_subject.includes(check["subjectcode"]))
            {
           
                document.getElementById(check["subjectcode"]).addEventListener("click",function(){
                        Book(check)
                })
            }
            
        })

    }
    function profile(){
        history.push("/profilestud")
    }
   
    return(
        <React.Fragment>

<div class="header3">
            <h1>WELCOME TO THE STUDENT SECTION</h1>
            </div> 
        <button id="logout3" onClick={logout}><b>LOGOUT</b></button>
        <button id="profile3"onClick={profile}><b>PROFILE</b></button>
        
        <button id="but3"onClick={subjectenrolled}><b>ENROLLED SUBJECTS</b></button> 
        <button id="but4"onClick={moresubjectstud}><b>ADD MORE SUBJECTS</b></button>
            <div id="subjectmore" style={{display:"none"}}>
              
            </div>
        <div id="subjectenrolled" style={{display:"block"}}>
        </div>
        </React.Fragment>
    )
         
}
export default Subjectstud;

