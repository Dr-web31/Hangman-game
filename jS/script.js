const letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array From Letters 
let lettersArray = Array.from(letters); /// Array apartir string fo9ani 

// Select Letters Container 

let lettersContainer = document.querySelector(".letters");

// Generate Letters

lettersArray.forEach(letter =>
            {
        
                let span = document.createElement("span");
    // Creat LetterText Node 
                let theLetter = document.createTextNode(letter);

    // appande the letter to span 

                span.appendChild(theLetter);
    //add class on span 
                span.className = 'letter-box';
    // append span to the metters Contaier 
                lettersContainer.appendChild(span);
                    
             });

//Object Of Words + Categories 

const words = {
    
    programming: ["php","javascript","go","scale","fortran","r","mySql","python"],
    movies:["titanic","kissAndCry","matrix","inseption","whiplash","memento","coco","up"],
    pepole:["yacine","abir","maissa","mohamed","rana"],
    countries:["alger","maroc","spain","egypt","bahrin","qatar"]
    
}

// get random property

let allKeys = Object.keys(words); // tjib array fih les cateogory 

// random Number 
let randomPropNumber = Math.floor(Math.random()*allKeys.length); 

//category 
let randomPropName = allKeys[randomPropNumber];

//category words 
let randomPropValue = words[randomPropName];

// random Number depend on words 
let randomValueNumber = Math.floor(Math.random()*randomPropValue.length);
let randomValueValue = randomPropValue[randomPropNumber];

// Set categoru Info 

document.querySelector(".game-info .category span").innerHTML = randomPropName + ' ' + randomValueValue;

// select letters guess Element 

let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen wors to array 

let lettersAndSpace = Array.from(randomValueValue);

// creat spans depends on word

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    
    // if letter is space 
    if(letter === ' '){
        emptySpan.className("with-space");
    }
    
    lettersGuessContainer.appendChild(emptySpan);
});

// select span 

let guessSpan = document.querySelectorAll(".letters-guess span");

// set wrong attemps 

let wrongAttempts = 0;

//select the draw element 

let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters 
document.addEventListener("click",(e) => {
    if(e.target.className === 'letter-box')
    {
        // set the chose status 
        
        let theStatus = false;
        
        e.target.classList.add("clicked");     
        
        //get letter clickibale 
        
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        
        // The chossen word 
        
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        
        
        theChosenWord.forEach((wordLetter, wordIndex) => {
            if(theClickedLetter == wordLetter)
            {
                // set status to correct 
                
                theStatus = true;
                // loop on all guess spans 
                
                guessSpan.forEach((span , spanIndex) => {
                    if(wordIndex === spanIndex)
                        {
                            span.innerHTML = theClickedLetter;
                        }
                });
            }
        });
        
        // finishing of the chosing word 
        
        if(theStatus !== true)
            {
                // increase the wrong attempts 
                
                wrongAttempts++;
                theDraw.classList.add('wrong-' + wrongAttempts);
                
                // play fail sound 
                
                //document.getElementById("fail").display();
                if(wrongAttempts === 8 ){
                    endGame();
                    
                    lettersGuessContainer.classList.add("finished");
                }
            }
        else{
                //document.getElementById("success").display();
        }
        
    }
});

function endGame()
{
    let div = document.createElement("div");
    
    let divText = document.createTextNode('Game Over, The worsds is ' + ' ' + randomValueValue);
    
    div.appendChild(divText);
    
    // add class on div 
    
    div.className = 'popup';
    
    document.body.appendChild(div);
}
    