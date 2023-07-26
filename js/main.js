let box = document.querySelector(".box");
let test = document.querySelector(".test")
let showbox = document.querySelector(".show table")
let content = document.querySelector(".show table tbody");
let date = document.getElementById("data");
showbox.style.display = "none";

let dataobject ={};
if(window.localStorage.getItem("data")){
    dataobject = (JSON.parse(window.localStorage.getItem("data")));
}
let nwearray = [];
let datavalue;

// Get Students'name => students.json
let students;
let request = new XMLHttpRequest();
request.open("GET","students.json")
request.send();
request.onreadystatechange = ()=> {
    if(request.status == 200 && request.readyState == 4){
        let ob = JSON.parse(request.response);
        students = (ob.students).sort();
        addstudentstopage(students);
    }
}

// Functions...
function addstudentstopage(student){
    student.forEach((ele,index)=>{
        let div = document.createElement("div");
        div.className = "col me-2";
        let label = document.createElement("label");
        let text = document.createTextNode(`${index + 1} - ${ele}`);
        label.appendChild(text);
        let input = document.createElement("input");
        label.htmlFor = `sudent_${index + 1}`;
        input.type = "checkbox";
        input.value = ele;
        input.id = `sudent_${index + 1}`;
        div.appendChild(label);
        div.appendChild(input);
        test.appendChild(div);
    })
}
function show(){
    if(date.value != "" && date.value != null){
        datavalue = date.value;
        let names = document.querySelectorAll(".test input")
        names.forEach((ele,index) => {
            let Attendees;
            if(ele.checked){
                Attendees = true;
            }else {
                Attendees = false;
            }
            addtonewarray(ele.value,Attendees,index);
        });
        addtotabel(nwearray);
        box.remove();
        showbox.style.display = "flex";
    }
}
function addtonewarray(name,Attendees,index){
    let ob = {
        Number: index + 1,
        Name: name,
        Attendees: Attendees
    }
    nwearray.push(ob);
}
function addtotabel(array){
    content.innerHTML = "";
    array.forEach((ele,index)=>{
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let tr= document.createElement("tr");
        td3.className = "text-success"
        td1.appendChild(document.createTextNode(`${ele.Number}`));
        td2.appendChild(document.createTextNode(`${ele.Name}`));
        td3.style.borderRadius = "8px";
        if(ele.Attendees == false){
            let i = `<i class="fa-solid fa-xmark"></i>`;
            td3.innerHTML = i;
            td3.className = "p-2 bg-danger m-2 text-white fw-bold";
        }else if (ele.Attendees == true){
            let i = `<i class="fa-solid fa-check"></i>`;
            td3.innerHTML = i;
            td3.className = "p-2 bg-success m-2 text-white fw-bold";
        }
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        content.appendChild(tr);
        let names = document.querySelectorAll(".test input")
        names.forEach((ele,) => {
            ele.checked = false;
        });
    });
    dataobject[`${datavalue}`] = nwearray;
    addtolocal(dataobject);
    nwearray = [];
}
function addtolocal(dataobject){
    window.localStorage.setItem("data",JSON.stringify(dataobject))
}
function getdata(){
    if(data.value != "" && data.value != null){
        if(dataobject[`${data.value}`]){
            let my_array  = dataobject[`${data.value}`];
            addtotabel(my_array)
            box.remove();
            showbox.style.display = "flex";
        }
    }
}