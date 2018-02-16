console.log(`form.js`);

const form = document.querySelector('#form');
const fields = form.querySelectorAll('[name]');
console.log(form)
console.log(fields)


//static

fields.forEach((el)=>{
   el.addEventListener('keypress',function(e){
       e.preventDefault();
        console.dir(e);
        if(e.key === 'a'){
            return e.returnValue = true;
        }
        return;
   },false)
})