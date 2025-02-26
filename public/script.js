document.body.style.backgroundColor = "#353535"

function login(){
    const loginreq = new XMLHttpRequest()
    loginreq.open('post', '/loginRequest')
    loginreq.setRequestHeader('Content-Type', 'Application/json')
    loginreq.send(JSON.stringify({
        'lemail': email.value,
        'lpassword': password.value
    }))
    loginreq.onreadystatechange = () =>{
        if(loginreq.readyState == 4){
            const result = JSON.parse(loginreq.response)
            console.log(result.message)
            alert(result.message)
            if(loginreq.status == 200){
                sessionStorage.setItem('token', result.token)
                console.log('sikeres')
            }
        }
    }
}

function register(){
    const registerreq = new XMLHttpRequest()
    registerreq.open('post', '/registerRequest')
    registerreq.setRequestHeader('Content-Type', 'Application/json')
    registerreq.send(JSON.stringify({
        'remail': email.value,
        'rusername': username.value,
        'rpassword': password.value
    }))
    registerreq.onreadystatechange = ()=>{
        if(registerreq.readyState == 4){
            const result = JSON.parse(registerreq.response)
            console.log(result.message)
            alert(result.message)
        }
    }
}