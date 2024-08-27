console.log('lets start the functionality');
let inputField = document.querySelectorAll('.input-field');
let signin = document.querySelector('.disable');
let heading = document.querySelector('h1');
// let input_g = document.querySelector('.input-group')
let signup = document.querySelector('.btn').querySelectorAll('button')[0];
signin.addEventListener('click',(e)=>{
    // inputField[0].style.display = 'none';
    heading.innerText = 'Sign In';
    // input_g.style.height = '200px';
    inputField[0].style.maxHeight = '0px';
    signin.style.backgroundColor = '#3c00a0';
    signin.style.color = '#fff';
    signup.style.backgroundColor = '#eaeaea';
    signup.style.color = '#555';

}) 
signup.addEventListener('click',()=>{
    // inputField[0].style.display = 'flex';
    heading.innerText = 'Sign Up';
    // input_g.style.height = '280px';
    inputField[0].style.maxHeight = '64px';
    signup.style.backgroundColor = '#3c00a0';
    signup.style.color = '#fff';
    signin.style.backgroundColor = '#eaeaea';
    signin.style.color = '#555';

});
//18min    https://www.youtube.com/watch?v=LTPGyaEyTI4