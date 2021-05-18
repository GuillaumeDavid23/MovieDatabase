//NOTATION
var select = 0;
var maxRate = 5;


     
function initRate (notation, intMax) {
    console.log("BONJOUR")
    this.select++;
    var str = '<span id="note-' + this.select + '"class="rating" data-maxgrade="' + intMax + '">';
    for (var i=1; i<=intMax; i++) {
        if(notation > 0){
            str += '<i class="fa fa-star" data-clicked="false" data-id="grade-' + this.select + '" data-grade="' + i + '"></i>';
            notation--;
        }
        else{
            str += '<i class="fa fa-star-o" data-clicked="false" data-id="grade-' + this.select + '" data-grade="' + i + '"></i>';
        }
            
    }
    str += '</span>';
    return str;
}

//Recupération JSON
var requestURL = 'assets/js/movies.json';
//FIN DE RECUPERATION

//Container
var myList = document.querySelector('section');

fetch(requestURL)
//TEST DES ERREURS
.then(function(response) {
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  return response.json();
})

//MAIN Fonction
.then(function(json) {
    for(let i = 0; i < json.results.length; i++) {
    
        //CREATION DES CONTENEUR
        let divContainer = document.createElement('div');
        let divSubContainerImg = document.createElement('div');
        let divSubContainerText = document.createElement('div');
    
        //CREATION DES ELEMENTS
        let movieTitle = document.createElement('h6');
        let movieDesc = document.createElement('div');
        let movieImg = document.createElement('img');
        let movieNote = document.createElement('div')
        let separator = document.createElement('div');
    
    
        //AJOUTS DES CONTENUS
        movieTitle.innerHTML = json.results[i].original_title;
        movieDesc.innerHTML = json.results[i].overview;
        movieImg.src = json.results[i].poster_path;
        movieNote.dataset.value = Math.round(json.results[i].vote_average/2);
        movieNote.innerHTML = 'Note : ' + initRate(movieNote.dataset.value, maxRate);


        //AFFECTATIONS DES BLOCS
        myList.appendChild(divContainer);
        divContainer.appendChild(divSubContainerImg);
        divSubContainerImg.appendChild(movieImg);
    
        divContainer.appendChild(divSubContainerText);
        divSubContainerText.appendChild(movieTitle);
        divSubContainerText.appendChild(separator);
        divSubContainerText.appendChild(movieDesc);
        divSubContainerText.appendChild(movieNote);
    
        //STYLE
        divContainer.classList.add("col-12","col-md-4" ,"col-lg-3" , "p-3");
        divContainer.style.border = "1px solid white";
    
        divSubContainerImg.classList.add("text-center");
        movieImg.style.height = "15rem";
    
        divSubContainerText.classList.add("d-flex", "flex-column");
        movieTitle.classList.add("text-center", "mt-3");

        separator.classList.add("bg-white", "mt-2", "mb-2", "ml-auto", "mr-auto");
        separator.style.width= "50%";
        separator.style.height= "1px";

        movieDesc.style.height = "200px";
        movieDesc.classList.add("overflow-auto","pl-3","pr-3", "text-break", "text-justify");

        movieNote.classList.add("rate","pt-2");
      }
    myList.classList.add("d-flex","flex-wrap");

    
  
})

.catch(function(error) {
    let p = document.createElement('p');
    p.appendChild(
      document.createTextNode('Error: ' + error.message)
    );
    document.body.insertBefore(p, myList);
});




