$(
    function()
    {
        clicked = false;
        /* Les constant */
        
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
            medcine:["anatomie","chirurgie","scanner","neurologie","cardiologie","irm","vaccin"],
            programming: ["php","javascript","go","scale","fortran","mySql","python"],
            movies:["titanic","kissAndCry","matrix","inception","whiplash","memento","coco","up"],
                pepole:["json","aline","noah","smith","john"],
            countries:["alger","maroc","spain","egypt","bahrin","qatar"]

        }
        var informations = {
            medcine : [],
            programming: ["use it with back-end","have a name of programming language but it use with websites ", "like a verb ", ""]
        }

        // get random property

        let allKeys = Object.keys(words); // tjib array fih les cateogory 
        
        /*
                    information 
            afficer menu commant jouer 
        */
        
        
	$('.show-popup').click(
                                function()
                                {
                                   $($(this).data('popup')).show(1000); 
                               
                                });
        
        $('.popup').click(
                          function()
                          {
                              $(this).hide(1000);
                          }
                         );
        $('.popup .inner').click(
                          function(e)
                          {
                              e.stopPropagation(); /* k t3abaz 3la pop up m yatna7ach ms t3abaz bara yatna7a nrml */
                          }
                         );
        $('.popup .close').click(
                          function(e)
                          {
                              e.preventDefault();
                              
                              $(this).parentsUntil('.popup').parent().hide(1000); 
                          }
                         );
        $(document).keydown(
                            function(e)
                            {
                               if(e.keyCode == 27)
                                   {
                                       $('.popup').hide(1000);
                                   }
                                
                            });
        $(document).keydown(
                            function(e)
                            {
                               if(e.keyCode == 27)
                                   {
                                       $('.popupe').hide(1000);
                                   }
                                
                            });
        
        /* choix de category */
        
        
        var $categories = $(".choix-body ul").children("li"),
            totalCategories = $categories.length;
        $(".button").click(function(event)
                            {
                                event.preventDefault();
                                
                                if(clicked === false){
                                    clicked = true;
                                
                                var newIndex = $(this).index(),
                                    numbreOfWords = 0,
                                // set wrong attemps 

                                 wrongAttempts = 0,
                                 table = [-1];
                                 
                                setup(newIndex,words,wrongAttempts,table,numbreOfWords);}
                                clicked === false;
                                
                            }
                          );
        $(".replay").click(function(event)
                           {
                                event.preventDefault();
                                reloadGame();
                           }
                          );
        function setup(indexToCheck,myObject,cpt,myTab,numWords)
                {
                    console.log(clicked);
                    
                    var allKeys = Object.keys(myObject); // array of categories
                
                    var categorieSelected = allKeys[indexToCheck]; // name of category
                    
                    $(".game-info .category").append(" <p> word from: " + "<span>" + categorieSelected + "</span> </p>");
                    
                    
            
                    var wordsOfCategorySelected = myObject[categorieSelected], // array of category selected 
                        lengthOfCategoryArray = wordsOfCategorySelected.length;
                    
                        // Selected word from category randomly 

                        do
                        {
                            var wordIndexFromCategory = Math.floor(Math.random()*lengthOfCategoryArray);
                        }while(valideIndex(myTab,wordIndexFromCategory) === false);
                        myTab.push(wordIndexFromCategory);
                        var wordFromCategory = wordsOfCategorySelected[wordIndexFromCategory];


                        // conert the word to array of letters 

                        var lettersAndSpace = Array.from(wordFromCategory);

                        // choiseé et stocke bloque des wors 

                        var lettersGuessContainer = $(".letters-guess");

                        // creat spans depends on word
            
                        createSpans(lettersAndSpace,lettersGuessContainer);

                        // select spans

                        var guessSpan = document.querySelectorAll(".letters-guess span");
                        
                        //select the draw element 

                        var theDraw = document.querySelector(".hangman-draw");

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

                                let theChosenWord = Array.from(wordFromCategory.toLowerCase());
                                
                                console.log(theChosenWord);
                                console.log(guessSpan);


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

                                        cpt++;
                                        theDraw.classList.add('wrong-' + cpt);
                                        
                                        // play fail sound 

                                        //document.getElementById("fail").display();
                                        if(cpt === 8 ){
                                            
                                            endGame(wordsOfCategorySelected[wordIndexFromCategory],$(".replay"));

                                            lettersGuessContainer.addClass("finished");
                                        }
                                    }
                                else{
                                     
                                        if(emptyS(guessSpan) === false )
                                            {
                                               
                                               var spansLetters = document.querySelectorAll(".letters span");
                                                   
                                               reloadKeyWord(spansLetters,$(".letters-guess"));
                                                
                                               numWords++;
                                                
                                               
                                                
                                               if(numWords<lengthOfCategoryArray)
                                                   {
                                                           wordsOfCategorySelected = myObject[categorieSelected]; // array of category selected 
                                                           lengthOfCategoryArray = wordsOfCategorySelected.length;

                                                            // Selected word from category randomly 

                                                            do
                                                            {
                                                                 wordIndexFromCategory = Math.floor(Math.random()*lengthOfCategoryArray);
                                                            }while(valideIndex(myTab,wordIndexFromCategory) === false);
                                                            myTab.push(wordIndexFromCategory);
                                                             wordFromCategory = wordsOfCategorySelected[wordIndexFromCategory];


                                                            // conert the word to array of letters 

                                                             lettersAndSpace = Array.from(wordFromCategory);

                                                            // choiseé et stocke bloque des wors 

                                                             lettersGuessContainer = $(".letters-guess");

                                                            // creat spans depends on word

                                                            createSpans(lettersAndSpace,lettersGuessContainer);

                                                            // select spans

                                                             guessSpan = document.querySelectorAll(".letters-guess span");

                                                            //select the draw element 

                                                             theDraw = document.querySelector(".hangman-draw");
                                                   }
                                                else
                                                    {
                                                            won($(".replay"));
                                                            
                                                    }
                                            }
                                }

                            }
                        }
                                                  );
                    }
        
        
                    
        
        
        
        /* Partie function */
        
        endGame = function(word,refreche)
        {
            let div = document.createElement("div");

            let divText = document.createTextNode('Game Over, The worsds is ' + ' ' + word);

            div.append(divText);

            // add class on div 

            div.className = 'popupe over-game';

            document.body.append(div);
            refreche.show();
        },
        won = function(refreche)
        {
            let div = document.createElement("div");

            let divText = document.createTextNode('congratulation you have finished the game :) , thank you for playing');

            div.append(divText);

            // add class on div 

            div.className = 'popupe wen';

            document.body.append(div);
            
            refreche.show();
        },
        valideIndex = function(tab,index)
        {
            for(var i=0 ; i< tab.length ; i++)
                {
                    if(tab[i] === index)
                        return false;
                }
            return true;
        },
        emptyS = function(spanChoisee)
        {
            /*emptySpan = true;
            spanChoisee.forEach((span) => {
                                             if($("span").is(':empty'))
                                                 emptySpan = false;
                                        });
            return emptySpan;*/
            
            emptySpan = false;
            for(var i = 0 ; i < spanChoisee.length ; i++)
                {
                    if((spanChoisee[i].textContent) === '')
                        emptySpan = true;
                }
            return emptySpan;
            
        },
        createSpans = function(letterChoisee,blockSelected)
        {
            letterChoisee.forEach(letter =>
                                                {
                                                    let emptySpan = document.createElement("span");

                                                    // if letter is space 
                                                    if(letter === '')
                                                    {
                                                        emptySpan.className("with-space");
                                                    }

                                                    blockSelected.append(emptySpan);
                                                });
        },
        reloadKeyWord = function(theSpan,wordBare)
        {
            theSpan.forEach((span) => { $("span").removeClass('clicked');   });
            wordBare.empty();
        },
        reloadGame = function()
        {
            /*$(".letters-guess").empty();
            clicked = false;
            (document.querySelectorAll(".letters span")).forEach((span) => { $("span").removeClass('clicked');   });
            $(".game-info .category p").detach();
                for(var i = 0 ; i< 8 ; i++)
                    $(".hangman-draw").removeClass( "wrong-" + i );
            $(".replay").hide();*/
            location.reload(true);
        };      
	}
);
