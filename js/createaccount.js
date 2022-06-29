// const createAccountForm = document.querySelector('submit_form')

// createAccountForm.addEventListener('signup_info',(event) => [
//     document.getElementsByClassName("create_account_body")[0].style.background = "yellow"
// ]

// )



// function signup_info(){
//     // window.open("todolist.html","_self")
    
//     var username = document.getElementById("signup_username").value
    
    
//     if (localStorage.getItem(username) == null){
        
//         var var_email = document.getElementById("signup_email").value
//         var var_person_name = document.getElementById("signup_name").value
//         var var_password = document.getElementById("signup_password").value
//         var var_number = document.getElementById("signup_number").value
    
//         let user_info = {
//             email : var_email,
//             person_name : var_person_name,
//             password : var_password,
//             number : var_number
//         }

//         localStorage.setItem(username,JSON.stringify(user_info))
//         sessionStorage.setItem('current_user',username)
        
//     }
    

    
// }

function signup_info(){ //function for saving new users information
    
    var var_person_name = document.getElementById("signup_name").value
    var username = document.getElementById("signup_username").value
    var var_password = document.getElementById("signup_password").value
   

    if (var_person_name == ''){ //if nothing is entered in name, tell user to enter a name
        alert('please enter your name')
    }
    else if(username == '' || username == ' '){ //check if user has entered a username, if the user has not entered a username, request him/her to enter a username
        alert('please enter a username')
    }
    else if(localStorage.getItem(username) != null){
        alert(`${username} is already in use, please choose another username`) // incase user selects a username which is already in use, request user to enter an other username
    }
    else if(var_password == ''){ //check if user has entered a password, if the user has not entered a password, request him/her to enter a password
        alert('please enter a password')
    }
    else{
        var var_email = document.getElementById("signup_email").value
        var var_number = document.getElementById("signup_number").value
    
        let user_info = {   // setting up a dictionary of users information
            email : var_email,
            person_name : var_person_name,
            password : var_password,
            number : var_number,
            list : []
        }

        localStorage.setItem(username,JSON.stringify(user_info)) //store user info in localstorage, using username as the key
        sessionStorage.setItem('current_user',username)          //store username in sessionStorage, needed to set up todo list for this user
        window.open("todolist.html","_self")                     //if sign up is successfuk, open users todolist
        
    }
}



