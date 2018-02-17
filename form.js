

const form = document.querySelector('#form');
const fields = form.querySelectorAll('[name]:not([type="submit"])');

// this.fields = this.form.querySelectorAll('input[name]:not([type="submit"])');
//static

var firstName = form[name="first_name"];
var lastName = form[name="last_name"];
var pesel = form[name="pesel"];
var birthday = form[name="birthday"];


var errors =[];

firstName.addEventListener('keypress',function(e){
    e.preventDefault();
    var regex = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;
    var text = e.key;
      
        if(regex.exec(e.key)){
            return e.returnValue = true;
        }
        return;
   },false);

firstName.addEventListener('change',function(e){
    e.preventDefault();
    var regex = /\w{1,3}/y;
    var text = e.target.value;
    var result = regex.exec(text)[0];
    
        if(result === text){
            console.log('dokladnie taki sam')
        }else{
            console.log(`niejest dokladnie taki sam`)
        }
       
   },false);

lastName.addEventListener('keypress',function(e){
    e.preventDefault();
    var regex = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;
    var text = e.key;
        if(regex.exec(e.key)){
            return e.returnValue = true;
        }
        return;
   },false);

lastName.addEventListener('change',function(e){
    e.preventDefault();
    var regex = /\w{1,3}/y;
    var text = e.target.value;
    var result = regex.exec(text)[0];
    
        if(result === text){
            console.log('dokladnie taki sam')
        }else{
            console.log(`niejest dokladnie taki sam`)
        }
       
   },false);

////////////////////
pesel.addEventListener('keypress',function(e){
    e.preventDefault();
    var regex = /\d/;
    var text = e.key;
    var result = regex.exec(text);
        if(regex.exec(e.key)){
            return e.returnValue = true;
        }
        return;
   },false);

pesel.addEventListener('change',function(e){   
     e.preventDefault();
    var regex = /\d{11}/y;
    var text = e.target.value;
    var result = regex.exec(text);
    // console.log(`*`.repeat(10)) 
        if(result && result[0] === text ){
            console.log('dokladnie taki sam reg jak tekst')
            if( isCorrectPesel(text) ){
                console.log(`sprawdzony pesel: OK`)
                birthday.value = createBirthday(text);
            }else{
                console.log(`sprawdzony pesel: EROR`);        
            }
        }else{
            console.log(`niejest dokladnie taki sam`)
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