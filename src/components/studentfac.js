import React from "react"
import './studentfac.css';
import Student from "./studentsec.js"
import {useHistory} from "react-router-dom"
import firebase from "./fire.js"

function Studentsec(){
    const str="basicinfo"
   
    let stud_final=[]
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
    }, []);
    
    
    function logout(){
        history.push("/")
    }
    
       stud.forEach((data)=>{
           
           if(Student.getProfile().studentsection.includes(data[str].username))
           {
               stud_final.push(data[str])
           }
       })
    function student(){
       let content=`
       <table id=table3>
     <tr> 
            <th><label htmlFor="username">Username</label></th>
            <th><label htmlFor="name">Name</label></th>
            <th><label htmlFor="email">Email</label></th>
            <th><label htmlFor="dob">DateofBirth</label></th>
            </tr>
            
            </table>`
        
        document.getElementById("test").style.display="none"
        document.getElementById("studentsection").style.display="block"
        document.getElementById("marksstud").style.display="none"
        var performance=[]
       
       
       stud_final.map((val)=>(
        
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
        document.getElementById("studentsection").innerHTML=content
        let context
        let code=0
        Object.keys(test).forEach((check)=>{
            if(test[check]["subjectcode"]===Student.getProfile().subject)
            {
                code=test[check]
            }    
        })   
        Student.getProfile().studentsection.forEach((data)=>
                    {
                        document.getElementById(data).addEventListener("click",function()
                        {
                            context=''
                            performance=[]
                            document.getElementById("but_"+data).style.display="block"
                            Object.values(code).forEach((val)=>{
                                if(val!==Student.getProfile().subject && val!==0)
                                        performance.push(val[data])
                            })
                            
                            document.getElementById("div_"+data).style.display="block"
                            document.getElementById(data).style.display="none"
                    
                            performance.map((dat)=>(
                                
                                `<input type="range">${dat}</input>`
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
    function subject(){
        history.push("/facultyfac")
    }
    function testgen(){
        document.getElementById("test").style.display="block"
        document.getElementById("studentsection").style.display="none"
        document.getElementById("marksstud").style.display="none"
        
    }
    function testgeneration()
    {
        var db=firebase.firestore()
        
        var id=document.getElementById("testcode").value
        Object.values(test).forEach((val)=>{
            if(val["subjectcode"]===Student.getProfile().subject)
            {
                if(val["flag"]===0)
                {
                    
                    db.collection("test").doc(Student.getProfile().subject).update({
                        [id]:{
                            
                            testcode:id,
                            
                        },
                    
                    }).then(()=>{
                        alert("saved successfully")
                    })
                }
                else{
                    db.collection("test").doc(Student.getProfile().subject).set({
                        [id]:{
                            
                            testcode:id,
                            
                        },
                        flag:0,
                        subjectcode:Student.getProfile().subject
                        }).then(()=>
                            {
                            alert("saved successfully")
                        })
                }
            }
            
            
            
        })
        if(Object.keys(test).length===0){
            db.collection("test").doc(Student.getProfile().subject).set({
                [id]:{
                    
                    testcode:id,
                    
                },
                flag:0,
                subjectcode:Student.getProfile().subject
            }).then(()=>
            {
            alert("saved successfully")
            return
            })
        }
       
        
        
        
        document.getElementById("fullmarks").value=''
        document.getElementById("testcode").value=''

    }
    function markdis(){
        let contents=''
        let final_obj=0
        var db=firebase.firestore()
        document.getElementById("marksstud").style.display="block"
        document.getElementById("test").style.display="none"
        document.getElementById("studentsection").style.display="none"
        
        stud_final.map((val)=>(
        
            `
            <div class="newtest">
            <label htmlFor="username">USERNAME</label>
            <div  id="username" className="username-two" >${val.username}</div>
            
            <input id="marks_${val.username}">MARKS</input>
            <div id="marks_percen_${val.username}"></div>
            <button id="${val.username}">SAVE</button>
            </div>
            `
            )).forEach((element)=>{
            contents+=element
            })
            document.getElementById("markdist").innerHTML=contents
            Object.keys(stud).forEach((check)=>{
                
                    if(Student.getProfile().studentsection.includes(stud[check][str]["username"]))
                    {
                       
                        document.getElementById(stud[check][str]["username"]).addEventListener("click",function()
                        {
                            console.log(stud[check][str]["username"])
                           var username=stud[check][str]["username"]
                           
                           var marks=document.getElementById("marks_"+stud[check][str]["username"]).value
                           
                           var fm=document.getElementById("full_marks").value
                           var fmperce=(marks/fm)*100
                           fmperce+="%"
                           var testcode=document.getElementById("testcode_marks").value
                           
                           document.getElementById("marks_percen_"+stud[check][str]["username"]).innerHTML=fmperce
                           
                            Object.values(test).forEach((data)=>{
                                
                                if(data["subjectcode"]===Student.getProfile().subject)
                                {
                                  
                                  
                                  final_obj=data  
                                    
                                }
                                Object.values(final_obj).forEach((val)=>{
                                    if(val.testcode===testcode)
                                    {
                                       
                                        final_obj[testcode][username]=fmperce
                                        
                                        db.collection("test").doc(Student.getProfile().subject).update(final_obj).then(()=>{})
                                    }
                                
                                })
                            })
                            

                            
                            
                               
                               
                           
                        })
                          
                    }
                
            })
                
    }
    

    
    return(
            <React.Fragment>

              <div class="header4">
            <h1>SUBJECT SECTION</h1>
            </div> 

            <button id="logout5" onClick={logout}><b>LOGOUT</b></button>
            <button id="student5" onClick={student}><b>STUDENTS ENROLLED</b></button>
            <button id="faculty5" onClick={subject}><b>FACULTY SECTION</b></button>
            <button id="test5" onClick={testgen}><b>NEW TEST</b></button>
            <button id="marks5" onClick={markdis}><b>ALLOTT MARKS</b></button>
            <div id="studentsection"></div>
            <div id="marksstud" style={{display:"none"}}>    
                <div id="test_info" >
                <div class="testcode_x"><label htmlFor="testcode_marks"><b>TEST CODE</b></label></div>
				<input type="text"id="testcode_marks" required></input>
				<br></br>
                <div class="fullmarks_x"><label htmlFor="full_marks"><b>FULL MARKS</b></label></div>
				<input type="text" className="full_marks" id="full_marks" required></input>
				<br></br>
                </div>
                <div id="markdist"></div>
            </div>
            <div id="test" style={{display:"none"}}>
            <div class="fullmarks_y"><label htmlFor="fullmarks" ><b>FULLMARKS</b></label></div>
				<input type="number" className="fullmarks" id="fullmarks" required></input>
				<br></br>
				<div class="testcode_y"><label htmlFor="testcode"><b>TEST CODE</b></label></div>
				<input type="text" className="testcode" id="testcode" required></input>
				<br></br>
				<div class="subcode_y"><label htmlFor="subjectcode"><b>SUBJECT CODE</b></label></div>
                <div type="text" className="subjectcode" id="subjectcode" required>{Student.getProfile().subject}</div>
				<br></br>
                
                <div class="savetest"><button onClick={testgeneration}><b>SAVE</b></button></div>
            </div>
            
                
            
            
            
          </React.Fragment>
    );
}
export default Studentsec;