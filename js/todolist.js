function add_heading(){
    document.getElementById("heading").innerHTML = `<div> Hello ${JSON.parse(localStorage.getItem(sessionStorage.current_user)).person_name}. Good Luck for your tasks </div>`
}

// write current users name in table heading and fill the table with users todolist when the user logs in/signs up
function populate_table(){ 
    document.getElementById("todoListTableHeading").innerHTML = `${JSON.parse(localStorage.getItem(sessionStorage.current_user)).person_name}'s ToDo List `
    
}

//calling this function will delete all task rows in the todolist table
function clear_table(){

    var table_heading = document.getElementById("tableHeader")
    while(table_heading.hasChildNodes()){
        table_heading.removeChild(table_heading.firstChild)
    }
    var table_body = document.getElementById("todolist_items") //access the table body
    while(table_body.hasChildNodes()){  //remove all rows in table body
        table_body.removeChild(table_body.firstChild)
    }

}

//this fucntion updates the user's todo liat
function update_list(){ 
    clear_table() //clear all task rows to prevent rpetition of data
        header_todo_list = document.getElementById('tableHeader')
        created_header_row = document.createElement('tr')

    if (JSON.parse(localStorage.getItem(sessionStorage.current_user)).list.length != 0){
        
        created_header_row.innerHTML = `<th></th><th >Title</th><th>Description</th><th class="dateColumn">Date</th><th class="deleteColumn"></th>`
        header_todo_list.appendChild(created_header_row)


        user_todo_list = JSON.parse(localStorage.getItem(sessionStorage.current_user)).list // get current_user 's list from localstorage
        table_todo_list = document.getElementById('todolist_items') //access the the tbody tag of todo list table
        user_todo_list.forEach( (element,index) =>{ //iterate over each element in the user's list on local storage, and add it as a row in the table

        created_row = document.createElement('tr') //create a new row
        created_row.classList.add(`row_${index}`) 
        created_row.innerHTML = `<td style="padding-left:10px;">${index+1})</td> 
        <td >${element.title}</td>
        <td >${element.description}</td>
        <td style="width:111px">${element.task_date}</td>
        <td><div   onclick="delete_this(${index})" class="delete_button" ><i class=" text-danger fa-solid fa-trash-can"></i></div></td>`

        table_todo_list.appendChild(created_row) //insert the new row as new child of tbody 
    })
    }
    else{
        created_header_row.innerHTML = `<th class="text-center" ><h3>Your ToDo List is empty</h3></th>`
        header_todo_list.appendChild(created_header_row)
    }
    

}


//call populate_table function once the page has loaded
document.addEventListener("DOMContentLoaded", function(){ 
    add_heading()
    // populate_table()
    update_list()
})

//calling this function will clear the entry form
function clearForm(){ 
    let form = document.getElementById('new_entry_form')
    form.reset()
}


//on clicking 'add to list' button, this will be called
task_submit.addEventListener("click",function(){  
    var var_task_title = document.getElementById("task_title").value
    var var_task_description = document.getElementById("task_description").value
    var var_task_date = document.getElementById("task_date").value

    if (var_task_title == ''){ //check if user has entered the title, if the user has not entered a title, request him/her to enter the title
        alert('PLease Enter Task Title')
    }
    else{
        user_info = JSON.parse(localStorage.getItem(sessionStorage.current_user))
        user_todo_list = user_info.list //get users older todo list
        
        new_task_info = { //new entered task
            title: var_task_title,
            description: var_task_description,
            task_date: var_task_date
        }
        
        user_todo_list.push(new_task_info) //add new task in user's todo list

       
        user_info.list = user_todo_list //updating list
        localStorage.setItem(sessionStorage.current_user,JSON.stringify(user_info)) //storing the user_info with updated list on localStorage

        clearForm() //clear the form
        update_list()
        

    }
})


//on clicking reset button, this will be called
form_reset.addEventListener("click",function(){
    clearForm() //clear the form
})


//when delete button of a row is clicked, this function is called, it will delete that row
function delete_this(index_num){
    user_info = JSON.parse(localStorage.getItem(sessionStorage.current_user))
   
    user_info.list.splice(index_num,1)//delete the objdct at this index number from the users todo list array
    localStorage.setItem(sessionStorage.current_user,JSON.stringify(user_info)) //storing the user_info with updated list on localStorage
    update_list() //update the todo list table
    



}

function delete_all_button(){
    
    //clear users todo list in local storage
    user_info = JSON.parse(localStorage.getItem(sessionStorage.current_user))
   
    user_info.list = [] //list cleared
    localStorage.setItem(sessionStorage.current_user,JSON.stringify(user_info)) //storing the user_info with updated list on localStorage
    update_list() //update the todo list table
}





