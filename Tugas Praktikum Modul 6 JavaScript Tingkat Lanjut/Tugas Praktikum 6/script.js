
const allInput = document.querySelectorAll('form input[type="text"], form input[type="email"], form input[type="password"], form input[type="number"], form input[type="url"], form select[name="jenisKelamin"]')


// Storage data (object)
const data = {}

// Btn Submit
const btnSubmit = document.querySelector('#btnDaftar');
btnSubmit.setAttribute('disabled', 'true')


// validation variable
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const notelRegex = /^08\d{10}$/;
const urlRegex = /^(?:https?|www)\:\/\/[^\s\/$.?#].[^\s]*$/;


// Check input
function checkInputs() {
  let allInputFilled = true;

  allInput.forEach((input) => {
    if(!input.value.trim()){
      allInputFilled = false
    }

    if(input.type === 'url' && !urlRegex.test(input.value)) {
      allInputFilled = false
      return;
    } 
  })

  return allInputFilled;
}


allInput.forEach((input) =>  {
  input.addEventListener('change', () => {

    const isError = showError(input)

    if(!isError) {
      data[input.name] = input.value
    }else {
      delete data[input.name]
    }

    if(!checkInputs() ) {
      btnSubmit.setAttribute('disabled', 'true')
    }else {
      btnSubmit.removeAttribute('disabled')
    }
  })


  input.addEventListener('focus', () => {
    const isError = showError(input);
    if(isError) {
      delete data[input.name]
    }

    if(!checkInputs() ) {
      btnSubmit.setAttribute('disabled', 'true')
    }else {
      btnSubmit.removeAttribute('disabled')
    }

  })

})




btnSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  alert('Data Berhasil')
  console.log(data)

  
})



function showError(input) {
  const errorMessage = input.nextElementSibling


  if(input.value === '') {
    errorMessage.innerHTML = "Wajib di isi"
    return
  } 

  
  if(input.type === 'email' && !emailRegex.test(input.value)) {
    errorMessage.innerHTML = "Format email tidak valid"
    return;
  } 

  if(input.type === 'password' && input.value.length < 6) {
    errorMessage.innerHTML = "Password min 6 karakter"
    return;
  } 

  if(input.type === 'number' && !notelRegex.test(input.value)) {
    if(input.value.length !== 12){
      errorMessage.innerHTML = "Nomor telepon wajib 12 digit"
      return;
    }
    errorMessage.innerHTML = "Nomor telepon tidak valid"
    return;
  } 


  
  if(input.type === 'url' && !urlRegex.test(input.value)) {
    errorMessage.innerHTML = "URL tidak valid"
    return;
  } 


  return errorMessage.innerHTML = ""

}