const fromText = document.querySelector('.form-text'), 
toText = document.querySelector('.to-text'),
exchangeIcon = document.querySelector('.exchange'),
selecTag = document.querySelectorAll('select'),
icons = document.querySelectorAll('.row i'),
translateBtn = document.querySelector('button');

selecTag.forEach((tag, id) =>{
    for(let country_code in countries){
        let selected;
        if(id==0 && country_code=='es-ES'){
            selected = 'selected'

        }else if(id==1 && country_code=='en-GB'){
            selected = 'selected'
        }
        let option  = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener('click',()=>{
    let tempText = fromText.value;
    tempLang = selecTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;

    selecTag[0].value = selecTag[1].value;
    selecTag[1].value = tempLang;
});

fromText.addEventListener('keyup', ()=>{
    if(!fromText.value){
        toText.value = "";
    }
})

translateBtn.addEventListener("click",()=>{
    let text = fromText.value.trim();
    let translateForm = selecTag[0].value;
    let translateTo = selecTag[1].value;

    if (!text){
        return;
    }
    toText.setAttribute('placeholder', 'Translating...');
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateForm}|${translateTo}`
    fetch(apiUrl).then(res=>res.json()).then(data=>{
        toText.value = data.responseData.translatedText;
         data.matches.forEach(data=>{
             if(data.id==0){
                 toText.value = data.translation;
             }
         });
        toText.setAttribute("placeholder", "Translation")
    }); 

});

icons.forEach(icon=>{
    icon.addEventListener("click", ({target})=>{
        if(!fromText.value || !toText.value) return ;
        if(target.classList.contains("fa-copy")){
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            let utterence;
            if(target.id=='from'){
                utterence= new SpeechSynthesisUtterance(fromText.value);
                utterence.lang = selecTag[0].value;
            }else{
                utterence= new SpeechSynthesisUtterance(toText.value);
                utterence.lang = selecTag[1].value;
            }
            speechSynthesis.speak(utterence);
        }

    })
})


