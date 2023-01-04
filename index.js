const postfunction=async()=>{
    const taskname=document.getElementById("inp").value
    const data={
        task:taskname,
        status:false
    }
    const res=await fetch("http://localhost:3000/todo",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }

    })

}
const editfunct=async()=>{
    const taskname=document.getElementById("inp2").value
    const data={
        task:taskname,
        status:false
    }
    let id=localStorage.getItem("id")
    const res=await fetch(`http://localhost:3000/todo/${id}`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }

    })

}
const togglefunction=async(el)=>{

      el.status=!el.status
   
    const res=await fetch(`http://localhost:3000/todo/${el.id}`,{
        method:"PATCH",
        body:JSON.stringify(el),
        headers:{
            'Content-Type': 'application/json'
        }

    })

}
const deletefunct=async(id)=>{
  
    
    const res=await fetch(`http://localhost:3000/todo/${id}`,{
        method:"DELETE",
    

    })

}
const getAllTodo=async()=>{
    const res=await fetch("http://localhost:3000/todo")
    const data=await res.json()
    console.log(data)
    appenddata(data)
}
getAllTodo()
const appenddata=(data)=>{
    const box=document.getElementById("containerTodo")
    box.innerHTML=" "
    data.forEach((el) => {
        let box1=document.createElement("div")
      let task=document.createElement("h2")
        task.innerText=el.task
      let status=document.createElement("h3")
       status.innerText=el.status
       let edit=document.createElement("button")
       edit.innerText="Edit"
       edit.onclick=()=>{
        localStorage.setItem("id",el.id)
        window.location.href="edit.html"
       }
       let toggle=document.createElement("button")
       toggle.innerText="Toggle"
       toggle.onclick=()=>{
        togglefunction(el)
       }
       let delet=document.createElement("button")
       delet.innerText="Delete"
       delet.onclick=()=>{
        deletefunct(el.id)
       }
       box1.append(task,status,toggle,edit,delet)
       box.append(box1)

    });
}