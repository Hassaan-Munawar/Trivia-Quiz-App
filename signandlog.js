var arr = []
function signup() {
    var getemail = document.getElementById("semail")
    var getpass = document.getElementById("spass")
    var getname = document.getElementById('sname')
    var obj = {
        email: getemail.value,
        pass: getpass.value,
        username:getname.value
    }
    
    var emil = getemail.value
    var char1 = emil.charAt(emil.length - 10)
    var char2 =emil.charAt(emil.length - 9)
    var char3 =emil.charAt(emil.length - 8)
    var char4 =emil.charAt(emil.length - 7)
    var char5 =emil.charAt(emil.length - 6)
    var char6 =emil.charAt(emil.length - 5)
    var char7 =emil.charAt(emil.length - 4)
    var char8 =emil.charAt(emil.length - 3)
    var char9 =emil.charAt(emil.length - 2)
    var char10 =emil.charAt(emil.length - 1)
    var concat = char1+char2+char3+char4+char5+char6+char7+char8+char9+char10
    
    
    if(concat == '@gmail.com' && getname.value.length >= 4 && getpass.value.length >= 6){
        arr.push(obj)
        localStorage.setItem("Data", JSON.stringify(arr)) 
        alert("Sign Up successful...")
        location.href ='login.html' 
            getpass.value = ""
            getemail.value = ""
            getname.value = ""
    }
    else if(getname.value =='' || getemail.value == '' || getpass.value == ''){
        alert("Please fill the required fields..")
    }
    else if(getname.value.length < 4){
        alert("Enter Username of atleast 4 characters..")
    }
    else if(getpass.value.length < 6){
        alert('Enter Password of atleast 6 chracters or numbers..')
    }
    else if(concat != '@gmail.com'){
        alert('Enter @gmail.com in email field..')
    }
    
}

function login() {
    var getemail = document.getElementById("lemail")
    var getname = document.getElementById('lname')
    var getpass = document.getElementById("lpass")
    var filters = arr.filter(function (data) {
        return data.email == getemail.value && data.pass == getpass.value && data.username == getname.value
    })
     if(getemail.value  == '' || getname.value == '' || getpass.value == ''){
        alert("Please fill the required fields")
     }
     else if (filters.length) {
        alert("User login succcessful ..\n Now lets move on to the quiz.. ")
        sessionStorage.setItem('names', getname.value)
        location.href = 'quiz.html'
        getname.value = ""
        getemail.value = ""
        getpass.value = ""
    }
    else {
        alert("Email/Password/Username incorrect")
    }

}

var getuser = localStorage.getItem("Data")
if (getuser !== null) {
    arr = JSON.parse(getuser)
}
