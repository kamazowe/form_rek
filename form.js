
// inputs

var errorsDiv = document.querySelector("#errors");
const form = document.forms[0];
const fields = form.querySelectorAll('input[data-error]:not([type="submit"])');

var firstName = form[name="first_name"];
var lastName = form[name="last_name"];
var pesel = form[name="pesel"];
var birthday = form[name="birthday"];
var submit = form[name="submit"];

console.log(submit);


var regex1 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;
var regex2 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;
var regex3 = /\d/;
var regexx1 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,40}/y;
var regexx2 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,40}/y;

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

function fnChange(regex){
    this.addEventListener('change',function(e){
        e.preventDefault();
        var text = e.target.value;
        var result = regex.exec(text);
            if(result && result[0] === text){
                console.log('dokladnie taki sam')
                errors.delete(this.name)
            }else{
                console.log(`nie jest dokladnie taki sam`)
                errors.set(this.name,this.dataset.error)
                console.log(this.dataset.error)
            }      
       },false);
}

fnKeyPress.call(firstName,regex1);
fnKeyPress.call(lastName,regex2);
fnKeyPress.call(pesel,regex3);
fnChange.call(firstName,regexx1);
fnChange.call(lastName,regexx2);

////////////////////
//pesel change zmienic tak aby bylo fnchange
// duza fn peselvalidate > fnchange + isCorrectPesel 
pesel.addEventListener('change',function(e){   
     e.preventDefault();
    var regex = /\d{11}/y;
    var text = e.target.value;
    var result = regex.exec(text);

        if(result && result[0] === text ){
            console.log('dokladnie taki sam reg jak tekst')
            if( isCorrectPesel(text) ){
                console.log(`sprawdzony pesel: OK`)
                birthday.value = createBirthday(text);
                errors.delete(this.name)
            }else{
                console.log(`sprawdzony pesel: ERROR`);   
                errors.set(this.name,this.dataset.error)
                console.log(this.dataset.error)
            }
        }else{
            console.log(`nie jest dokladnie taki sam`)
            errors.set(this.name,this.dataset.error)
            console.log(this.dataset.error)
        }
       
   },false);

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
    var dateBirth = pesel.slice(0,6);
    var day = dateBirth.slice(4);
    var year2 = dateBirth.slice(0,2);
    var option = dateBirth.slice(2,3);
    var codeMonth = dateBirth.slice(2,4);
    var month;
    var year1;
    var year;
    var norm;
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

        // console.log(`podglad zawartosci dataForm`)
        // for(var [key,value] of dataToSend.entries()) {
        //     console.log(key + ', '+ value); 
        //  }

}else{
    console.log(`sa bledy`);
    errors.forEach((err)=>{     
        console.log(err)     
    }); 
}

},false);