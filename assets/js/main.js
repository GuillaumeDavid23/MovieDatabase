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
    
    
        //AJOUTS DES CONTENUS
        movieTitle.innerHTML = json.results[i].original_title;
        movieDesc.innerHTML = json.results[i].overview;
        movieImg.src = json.results[i].poster_path;
        movieNote.innerHTML = '<strong> Avis : '+json.results[i].vote_average + ' / 10 </strong>';
    
        //AFFECTATIONS DES BLOCS
        
        myList.appendChild(divContainer);
        divContainer.appendChild(divSubContainerImg);
        divSubContainerImg.appendChild(movieImg);
    
        divContainer.appendChild(divSubContainerText);
        divSubContainerText.appendChild(movieTitle);
        divSubContainerText.appendChild(movieDesc);
        divSubContainerText.appendChild(movieNote);
    
        //STYLE
        divContainer.classList.add("d-flex","w-25", "p-3");
        divContainer.style.height = "30%";
        divContainer.style.border = "1px solid white";
    
        divSubContainerImg.classList.add("h-50");
        movieImg.style.height = "100%";
    
        divSubContainerText.classList.add("h-100");
        movieTitle.classList.add("text-center");
        movieDesc.style.height = "55%";
        movieDesc.classList.add("overflow-auto","pl-3");

        movieNote.classList.add("pt-2");
      }
    myList.classList.add("d-flex","w-100","flex-wrap");
})

.catch(function(error) {
    let p = document.createElement('p');
    p.appendChild(
      document.createTextNode('Error: ' + error.message)
    );
    document.body.insertBefore(p, myList);
});



