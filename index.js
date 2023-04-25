import { catsData } from "/data.js";

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', e => {
    const radioSelection = document.getElementsByClassName('radio')
    for (let radio of radioSelection) {
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
})

getImageBtn.addEventListener('click', () => {
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="CAT ALT TEXT"
    >`
    memeModal.style.display = 'flex'
})

memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal(){
    memeModal.style.display = 'none'
}

//create a function to iterate through catsData and return array of emotions
function getEmotionsArray(cats) {
    const emotionsArray = []
    
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }

    return emotionsArray
}

//create a function to sort emotions with GIFs
function getMatchingCatsArray() {
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }

        })
        return matchingCatsArray
    }  
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}


//create a function to render out the emotions
function renderEmotionsRadios(cats) {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                >
            </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)