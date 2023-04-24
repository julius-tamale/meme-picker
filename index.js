import { catsData } from "/data.js";

const emotionRadios = document.getElementById('emotion-radios');

emotionRadios.addEventListener('change', e => {
    const radioSelection = document.getElementsByClassName('radio')
    for (let radio of radioSelection) {
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
})
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