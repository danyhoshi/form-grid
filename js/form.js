const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const camps = {
    user: false,
    name: false,
    password: false,
    email: false,
    phone: false
}

const validatePassword2 = () => {
    const input1 = document.querySelector("input[name='password']");
    const input2 = document.querySelector("input[name='password2']");

    if(input1.value !== input2.value) {
        document.querySelector("label[for='password2'] + div").classList.add("group__form-incorrect");
        document.querySelector("label[for='password2']").classList.remove("group__form-correct"); 
        document.querySelector("label[for='password2']").classList.add("group__form-incorrect");
        document.querySelector("label[for='password2'] + div").classList.remove("group__form-correct"); 
        document.querySelector("input[name='password2'] + span").textContent = "cancel";
        document.querySelector("label[for='password2'] + div + p").classList.add("input-error__form-active");
        document.querySelector("label[for='password2'] + div + p").classList.remove("input-error__form");
        camps['password'] = false;
    } else {
        document.querySelector("label[for='password2'] + div").classList.remove("group__form-incorrect");
        document.querySelector("label[for='password2'] + div").classList.add("group__form-correct"); 
        document.querySelector("label[for='password2']").classList.remove("group__form-incorrect");
        document.querySelector("label[for='password2']").classList.add("group__form-correct"); 
        document.querySelector("input[name='password2'] + span").textContent = "check_circle";
        document.querySelector("label[for='password2'] + div + p").classList.remove("input-error__form-active");
        document.querySelector("label[for='password2'] + div + p").classList.add("input-error__form");
        camps['password'] = true;
    }
}

const validateCamp = (expression, input, camp) => {
    if(expression.test(input.value)){
        document.querySelector(`label[for='${camp}'] + div`).classList.remove("group__form-incorrect");
        document.querySelector(`label[for='${camp}'] + div`).classList.add("group__form-correct"); 
        document.querySelector(`label[for='${camp}']`).classList.remove("group__form-incorrect");
        document.querySelector(`label[for='${camp}']`).classList.add("group__form-correct");
        document.querySelector(`input[name='${camp}'] + span`).textContent = "check_circle";
        document.querySelector(`label[for='${camp}'] + div + p`).classList.remove("input-error__form-active");
        document.querySelector(`label[for='${camp}'] + div + p`).classList.add("input-error__form");
        camps[camp] = true;
    }
    else {
        document.querySelector(`label[for='${camp}'] + div`).classList.add("group__form-incorrect");
        document.querySelector(`label[for='${camp}'] + div`).classList.remove("group__form-correct");
        document.querySelector(`label[for='${camp}']`).classList.add("group__form-incorrect");
        document.querySelector(`label[for='${camp}']`).classList.remove("group__form-correct"); 
        document.querySelector(`input[name='${camp}'] + span`).textContent = "cancel";
        document.querySelector(`label[for='${camp}'] + div + p`).classList.add("input-error__form-active");
        document.querySelector(`label[for='${camp}'] + div + p`).classList.remove("input-error__form");
        camps[camp] = false;
     } 
}
const validate = (e) => {
       switch (e.target.name) {
        case "user":
            validateCamp(expresiones.usuario, e.target, 'user');
            // if(expresiones.usuario.test(e.target.value)){
            //     document.querySelector("label[for='user'] + div").classList.remove("group__form-incorrect");
            //     document.querySelector("label[for='user'] + div").classList.add("group__form-correct"); 
            //     document.querySelector("input[name='user'] + span").textContent = "check_circle";
            //     document.querySelector("label[for='user'] + div + p").classList.remove("input-error__form-active");
            //     document.querySelector("label[for='user'] + div + p").classList.add("input-error__form");
            // }
            // else {
            //     document.querySelector("label[for='user'] + div").classList.add("group__form-incorrect");
            //     document.querySelector("label[for='user'] + div").classList.remove("group__form-correct"); 
            //     document.querySelector("input[name='user'] + span").textContent = "cancel";
            //     document.querySelector("label[for='user'] + div + p").classList.add("input-error__form-active");
            //     document.querySelector("label[for='user'] + div + p").classList.remove("input-error__form");
            //  }   
        break;
        case "name":
            validateCamp(expresiones.nombre, e.target, 'name');
        break;
        case "password":
            validateCamp(expresiones.password, e.target, 'password');
            validatePassword2();
        break;
        case "password2":
            validatePassword2();
        break;
        case "phone":
            validateCamp(expresiones.telefono, e.target, 'phone');
        break;
        case "email":
            validateCamp(expresiones.correo, e.target, 'email');
        break;
        case "phone":
            validateCamp(expresiones.correo, e.target, 'phone');
        break;

    }
}


inputs.forEach(input => {
    input.addEventListener("keyup", validate);
    
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // const term = document.querySelector("checkbox__form");
    const term = document.querySelector("input[name='term']");
    const message = document.querySelector(".btn-submit-group__form p")
    console.log(typeof term);
    if(camps.user && camps.name && camps.password && camps.email && camps.phone && term.checked){
        form.reset()
        message.classList.add("input-error__form-activo");
        setTimeout(() =>{
            message.classList.remove("input-error__form-activo");
        }, 5000);
        document.querySelectorAll('.group__form-correct').forEach((icon) => {
            icon.classList.remove('group__form-correct');
        })
        document.querySelector('.message__form').classList.remove('message__form-active');
    } else {
        document.querySelector('.message__form').classList.add('message__form-active');
    }
})