//node, arr names, arr

// inputs

var errorsDiv = document.querySelector("#errors");
const form = document.forms[0];
// const fields = form.querySelectorAll('input[data-error]:not([type="submit"])');

var firstName = form[name="first_name"];
var lastName = form[name="last_name"];
var pesel = form[name="pesel"];
var birthday = form[name="birthday"];
var submit = form[name="submit"];

console.log(submit);


var regKey1 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;
var regKey2 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;
var regKey3 = /\d/;
var regChange1 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,40}/y;
var regChange2 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,40}/y;
var regChange3 = /\d{11}/y;
// functions
var errors = new Map();

function fnKeyPress(regex){
    this.addEventListener('keypress',function(e){
        e.preventDefault();
        var text = e.key;
            if(regex.exec(e.key)){
                return e.returnValue = true;
            }
            return;
       },false);
}

fnKeyPress.call(firstName,regKey1);
fnKeyPress.call(lastName,regKey2);
fnKeyPress.call(pesel,regKey3);
isCorrectChange.call(firstName,regChange1);
isCorrectChange.call(lastName,regChange2);
isCorrectChange.call(pesel,regChange3);

function isCorrectChange(regex){  
    this.addEventListener('change',function(e){
        console.log(`test event`);
        console.log(`name: ${this.name}`);
        e.preventDefault();
        var text = e.target.value;
        var result = regex.exec(text);
            if(result && result[0] === text){
                console.log('dokladnie taki sam')
                errors.delete(this.name)
                if(this.name === 'pesel'){
                    if( isCorrectPesel(text)){
                    console.log(`sprawdzony pesel: OK`)
                    birthday.value = createBirthday(text);
                    errors.delete(this.name)
                }else{
                    console.log(`sprawdzony pesel: ERROR`);   
                    errors.set(this.name,this.dataset.error)
                    console.log(this.dataset.error)
                } 
            }
            }else{
                console.log(`nie jest dokladnie taki sam`)
                errors.set(this.name,this.dataset.error)
                console.log(this.dataset.error)
                ;
            }      
       },false);    
}

function isCorrectPesel(pesel){
    var controllValue = Number(pesel[10]);
    
     var multiplierArr =[9,7,3,1,9,7,3,1,9,7];    
     var sum = 0;
     var num;
    for(let i = 0 ; i < pesel.length-1;i++){
         num = Number(pesel[i]);
        sum += num * multiplierArr[i];
        
    }
    var reszta = sum % 10;
    return  reszta === controllValue;
}

function createBirthday(pesel){
    const dateBirth = pesel.slice(0,6);
    let day = dateBirth.slice(4);
    let year2 = dateBirth.slice(0,2);
    let option = dateBirth.slice(2,3);
    let codeMonth = dateBirth.slice(2,4);
    let month;
    let year1;
    let year;
    let norm;
    const calcMonth = (codeMonth,norm)=>String(Number(codeMonth) - norm);
    switch(option){
        case `8`:
        case `9`:
        year1 = '18';
        norm = 80;
        month = calcMonth(codeMonth,norm);
        break;

        case `0`:
        case `1`:
        year1 = '19';
        norm = 0;
        month = calcMonth(codeMonth,norm);
        break;

        case `2`:
        case `3`:
        year1 = '20';
        norm = 20;
        month = calcMonth(codeMonth,norm);
        break;

        case `4`:
        case `5`:
        year1 = '21';
        norm = 40;
        month = calcMonth(codeMonth,norm);
        break;

        case `6`:
        case `7`:
        year1 = '22';
        norm = 60;
        month = calcMonth(codeMonth,norm);
        break;
    }

    year = year1.concat(year2);

    console.log(`${day}-${month}-${year}`);
    
    return `${day}-${month}-${year}`;
    
}

    //in input names and values
form.addEventListener('submit',function(e){
    
    e.preventDefault();
    console.log(`form on submit`)

    if(!errors.size){
        console.log(`send!`);
        // anty-spam submit
        submit.disabled = true;
        setTimeout(()=>{
            submit.disabled = false;
        },1000);
       
        //pakowanie do form data
        let dataToSend = new FormData();
        dataToSend.append('first_name',firstName.value);
        dataToSend.append('last_name',lastName.value);
        dataToSend.append('pesel',pesel.value);
        dataToSend.append('birthday',birthday.value);

        console.log(`podglad zawartosci dataForm`)
        for(var [key,value] of dataToSend.entries()) {
            console.log(key + ', '+ value); 
         }

}else{
    console.log(`sa bledy`);
    errors.forEach((err)=>{     
        console.log(err)     
    }); 
}

},false);