let currentPage= 1
const charactersPerPage=6
let characters=[]

fetch('https://akabab.github.io/starwars-api/api/all.json')
    .then(res=> res.json())
    .then(data => {
        characters= data;
        renderCharacters();
    });

    function renderCharacters(){
        const gallery= document.getElementById("characterGallery")
        gallery.innerHTML= ""
        const start= (currentPage-1)* charactersPerPage
        const end= start + charactersPerPage
        const pageCharacters= characters.slice(start, end)

        pageCharacters.forEach(char=>{
            const card= document.createElement('div')
            card.className= "card"
            card.innerHTML= `
                <img src= "${char.image}" alt="${char.name}" />
                <h3> ${char.name}</h3>
                <p> ${char.species || "Unknown"} | ${char.gender} </p>
            `
            card.addEventListener("click", ()=>{
                window.open(`character.html?id=${char.id}`, '_blank')
                console.log(char.id)
            });
            gallery.appendChild(card);
        });
    }

    document.getElementById("nextBtn").addEventListener("click", ()=>{
        if((currentPage * charactersPerPage)< characters.length){
            currentPage++;
            renderCharacters()
        }
    });

    document.getElementById("prevBtn").addEventListener("click",()=>{
        if(currentPage>1){
            currentPage--
            renderCharacters()
        }
    })