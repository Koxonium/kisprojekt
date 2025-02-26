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

const emailInput = document.getElementById('email')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')

function register(){
    if(emailInput.value.length >= 10 && usernameInput.value.length > 3 && passwordInput.value.length >= 8){
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
    else if(emailInput.value.length < 10){
        alert('Túl rövid az email cím, legalább 10 karakter legyen!')
    }
    else if(usernameInput.value.length <= 3){
        alert('A felhasználónév túl rövid!')
    }
    else if(passwordInput.value.length < 8){
        alert('A jelszó legalább 8 karakter legyen!')
    }
}