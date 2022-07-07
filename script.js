//ESTE VALIDADOR PODE SER DESABILITADO, ele é apenas no front-end!!! (este projeto serve para estudo da linguagem!)

//objeto principal de validação
let objValidator = { 
    handleSubmit:(event)=> {
        event.preventDefault();
        
        let send = true;
        let inputs = form.querySelectorAll('input');

        objValidator.clearErrors(); 

        for(let i = 0;i < inputs.length;i++) {
            let input = inputs[i];
            let check = objValidator.checkInput(input);
            if(check !== true) {
                send = false;
                objValidator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    //erros visuais dos campos usuario,email e senha
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if (input.value == '') {
                            return 'Este campo não pode ser vazio';
                        }
                    break
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Este campo deve ter no mínimo '+rDetails[1]+' Caracteres.';
                        }
                    break
                    case 'email':
                        if(input.value != '') { //expressão regular = "verifica se x é 'igual' ao padrão y"
                            let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                            if(!regex.test(input.value.toLowerCase())){
                                return 'Este E-mail não é valido';
                            }
                        }
                    break
                }
            }
        }

        return true;
    },
    //cria uma div de erro
    showError:(input, error) => { 
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSebling);
    },
    
    //valida se ja tem o campo de aviso
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0;i<inputs.length;i++) {
            inputs[i].style = '';
        }

        let errorElement = document.querySelectorAll('.error');
        for(let i = 0;i<errorElement.length; i++) {
            errorElement[i].remove();
        }
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', objValidator.handleSubmit);
