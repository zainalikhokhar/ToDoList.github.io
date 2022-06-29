

// write current users name in table heading and fill the table with users todolist when the user logs in/signs up
function populate_table(){ 
    document.getElementById("todoListTableHeading").innerHTML = `${JSON.parse(localStorage.getItem(sessionStorage.current_user)).person_name}'s ToDo List `
    
}

//calling this function will delete all task rows in the todolist table
function clear_table(){
    var table_body = document.getElementById("todolist_items") //access the table body
    while(table_body.hasChildNodes()){  //remove all rows in table body
        table_body.removeChild(table_body.firstChild)
    }
}

//this fucntion updates the user's todo liat
function update_list(){ 
    clear_table() //clear all task rows to prevent rpetition of data

    user_todo_list = JSON.parse(localStorage.getItem(sessionStorage.current_user)).list // get current_user 's list from localstorage
    table_todo_list = document.getElementById('todolist_items') //access the the tbody tag of todo list table
   
    user_todo_list.forEach( (element,index) =>{ //iterate over each element in the user's list on local storage, and add it as a row in the table

        created_row = document.createElement('tr') //create a new row
        created_row.classList.add(`row_${index}`) 
        created_row.innerHTML = `<th scope="row" >${index+1}}</th> 
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td style="width:100px">${element.task_date}</td>
        <td><div   onclick="delete_this(${index})" class="btn delete_button" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></div></td>`

        table_todo_list.appendChild(created_row) //insert the new row as new child of tbody 
    })

}


//call populate_table function once the page has loaded
document.addEventListener("DOMContentLoaded", function(){ 
    populate_table()
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
   
    user_info.list.splice(index_num,1)//delte the objdct at this index number from the users todo list array
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





