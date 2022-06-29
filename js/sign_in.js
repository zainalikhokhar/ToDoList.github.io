



function signin_info(){  // function for signing in an exisitng user

    var input_username = document.getElementById("inputUsername").value
    var input_password = document.getElementById("inputPassword").value
    var user_info_list = JSON.parse(localStorage.getItem(input_username)) //get the information of this user from localStorage

    if (input_username == '' || input_username == ' '){   //check if user has entered a username, if the user has not entered a username, request him/her to enter a username
        alert('please enter your username')
    }
    else if (localStorage.getItem(input_username) == null){  // if this user does not exist in the localstorage, inform user that no such username exists and tell user to enter a valid username
        alert(`user ${input_username} does not exist, please enter a valid username`)
    }
    else if (input_password == ''){  // //check if user has entered a password, if the user has not entered a password, request him/her to enter a password
        alert('please enter your password')
    }
    else if (input_password != user_info_list.password){ // if incorrect password is entered, inform user that incorrect password is entered
        alert('incorrect password')
    }
    else{
        sessionStorage.setItem('current_user',input_username) // if user has logged in successfully, store his/her username in sessionStorage, needed to set up todo list for this user
        window.open("todolist.html","_self")                  // open user's todolist
        
        
    }
    

}