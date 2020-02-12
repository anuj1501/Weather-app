console.log("client side javascript file is loaded!")

// first 'then' runs when we get reponse from website
// and second one runs when we get json data


const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherform.addEventListener('submit',(e) => {

    e.preventDefault()

    message1.textContent = 'loading......'
    message2.textContent = ''
    const location = searchelement.value
    
    fetch("http://localhost:3000/weather?address="+location).then((response) => {

        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
            }    
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})

