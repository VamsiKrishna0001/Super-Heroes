

let heading = document.getElementsByClassName('header');
let searchPage = document.getElementsByClassName('search-page')[0];
let input = document.getElementById('input');
let search = document.getElementById('search');
let fav = document.getElementsByClassName('fa-heart')[0];
let home = document.getElementsByClassName('fa-mask')[0];
let fav_container = document.getElementsByClassName('fav-container')[0];
let result = document.getElementsByClassName('results')[0];


const heading1 = document.querySelector('.header');
const resultsSuggestions = document.querySelector('.results');

input.onkeyup= (e) => {
  let results = [];
  let data = e.target.value;
  if(data){
  
  //To show the suggestion of what we are typing  
    results = namesInApi.filter((item) => {
      return item.toLowerCase().startsWith(data.toLocaleLowerCase());
    });

    renderResults(results);

    let allList = resultsSuggestions.querySelectorAll("li");

    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
        allList[i].setAttribute("onclick", "select(this)");
    }
  }
  else{
    heading1.classList.remove('suggestions');
  } 
};

//To select the words that are suggested
function select(element){
  let selectData = element.textContent;
  input.value = selectData;
  heading1.classList.remove("suggestions");
}

//To show the suggestion class is created and removed whenever it is needed.
function renderResults(results) {
  if (!results.length) {
    return heading1.classList.remove('suggestions');
  }
  //To create a lists to show the words
  const showSuggestions = results.map((item) => {
      return `<li>`+item+`</li>`;
    })
    .join('');
  heading1.classList.add('suggestions');
  resultsSuggestions.innerHTML = `<ul>`+showSuggestions+`</ul>`;
}

//Storing favorites  in an array with character id
let favArr =[];

// Storing Modified favorites that are removed in favorites.
let MfavArr=[];

//To go to the home page
function refreshPage(){
    window.location.reload();
} 

//To View the Favorites that are stored
fav.addEventListener('click',favorites);


function favorites(){
    
    //To go to the Home Page
    home.addEventListener('click',refreshPage);

    //To inherit the Moving the header to top 
    searchImg();

    searchPage.style.display = 'none';
    fav_container.style.display='flex';

    //f_line Border under the header section 
    var f_line = document.getElementsByClassName('F-line')[0];
    f_line.setAttribute("style"," margin: 20px 0; width: 100vw; border-bottom: 4px solid black;");

    // To check whether the fav are added or not.
    if(favArr.length == 0){
    // To remove the repeated elements   
        if(fav_container.childNodes.length>3){
            fav_container.removeChild(fav_container.childNodes[3]);
        }
    
        var p = document.createElement('p');
        p.innerHTML = "You Have No Favorites";
        fav_container.appendChild(p);

    // When searching from the favorites as to add the favorites.    
        search.addEventListener('click',()=>{
        p.remove();
        fav_container.style.display = 'none';
        searchPage.style.display = 'flex';
        });

    }
    else{

    // To remove the repeated elements ..   
        if(fav_container.childNodes.length>3){
            if(fav_container.childNodes.length == 4){
                fav_container.removeChild(fav_container.childNodes[3]);
            }else{
                fav_container.removeChild(fav_container.childNodes[3]);
                fav_container.removeChild(fav_container.childNodes[3]);
            }
        }
    
        var p = document.createElement('p');
        p.setAttribute("class","p_fav");
        p.innerHTML = "Your Favorites";
        fav_container.appendChild(p);

    // Creating the Heroes container where all the heroes can be shown
        let heroes = document.createElement('div');
        heroes.setAttribute('class','heroes');
        fav_container.appendChild(heroes);
    
    // To remove the duplicates from the favorites..    
        let uniquefav = [...new Set(favArr)];
        favArr = uniquefav;
        MfavArr=favArr;
        
    // To Get the Images,details from api through using character id that is stored in array.  
        for(var f =0;f<uniquefav.length;f++){
            ajax(f);
        }

    //To Request the server and Load the page in Favorites    
        function ajax(i){

            var xhreq = new XMLHttpRequest();

            xhreq.onload = ()=>{

                var resJson = JSON.parse(xhreq.response);
            //To store image Url from the id in array..            
                var imageURL = resJson.image.url;
                const hero = document.createElement('div');
                hero.setAttribute("class",'heros');
                heroes.appendChild(hero);

            //For showing images
                var container =document.createElement('div');
                container.setAttribute("class",'images');
                hero.appendChild(container);
                var img = document.createElement('img');
                img.setAttribute("src",imageURL);
                img.setAttribute("alt","...");
                container.appendChild(img);

            //for showing names
                const name = resJson.name;
                const p = document.createElement('p');
                p.innerHTML = name;
                container.appendChild(p);

            // for showing information..
                const info = document.createElement('p');
                info.setAttribute("class",'info');
                info.setAttribute("id",i);
                container.appendChild(info);

                const link = document.createElement('a');
                link.innerHTML="About";
                info.appendChild(link);
            // To create unfav icon    
                var span_icon = document.createElement('span');
                container.appendChild(span_icon);
                var fav_icon = document.createElement('i');
                fav_icon.setAttribute("class",'fas fa-heart favrt2');
                span_icon.appendChild(fav_icon);

            // for removing from favorites
                fav_icon.addEventListener('click',()=>{
                    info.parentNode.parentNode.remove();
                    uniquefav.splice(i,1);
                    favArr= uniquefav;
                    MfavArr = favArr;
                // if we delete all the favs in array we show they are no favs
                    if(uniquefav.length == 0){
                        document.getElementsByClassName('p_fav')[0].innerHTML="You have no Favorites";
                    }
                });

            //To search from favorites
                search.addEventListener('click',()=>{
                    heroes.remove();
                    p.remove();
                    fav_container.style.display = 'none';
                    searchPage.style.display = 'flex';
                });

            //To redirect to the information page    
                info.addEventListener('click',()=>{

                //To Hide the favorites..
                    fav_container.style.display ="none";
                    var otherCont = document.getElementsByClassName('individual-content')[0];
                    var back = document.createElement('h1');
                    var b_icon=document.createElement('i');
                    b_icon.setAttribute("class","fas fa-backward");
                    back.setAttribute('class','back');
                    back.appendChild(b_icon);

                    var cont = document.createElement("div");
                    cont.appendChild(back);
                    cont.setAttribute("class",'cont');

                    var contImg = document.createElement('img');
                    contImg.setAttribute('class','contImg');
                    var getid = info.getAttribute('id');
                //To show the images     
                    contImg.setAttribute('src',resJson.image.url);
                    cont.appendChild(contImg);
                    otherCont.appendChild(cont);

                //To show the name of the image    
                    var currName = resJson.name;
                    var S_name = document.createElement('h1');
                    S_name.innerHTML = currName;
                    S_name.setAttribute("class","M-name");
                    cont.appendChild(S_name);
                    var S_info = document.createElement('div');
                    S_info.setAttribute("class","information");
                    cont.appendChild(S_info);

                //      POWERSTATS         
                    var currPower = resJson.powerstats;
                    var details = document.createElement('details');
                    S_info.appendChild(details);
                    let currSmry = document.createElement('summary');
                    currSmry.innerHTML = "POWERSTATS";
                    details.appendChild(currSmry);

                    var pDiv = document.createElement('div');
                    pDiv.setAttribute("class","d-content");
                    details.appendChild(pDiv);
                    var currPwr = ["Intelligence : ","Strength : ","Speed : ","Durability : ","Power: ","Combat : "];
                    var pLi1 = document.createElement('li');
                    pLi1.innerHTML="Intelligence : "+currPower.intelligence;
                    pDiv.appendChild(pLi1);
                    var pLi2 = document.createElement('li');
                    pLi2.innerHTML=currPwr[1]+currPower.strength;
                    pDiv.appendChild(pLi2);
                    var pLi3 = document.createElement('li');
                    pLi3.innerHTML=currPwr[2]+currPower.speed;
                    pDiv.appendChild(pLi3);
                    var pLi4 = document.createElement('li');
                    pLi4.innerHTML=currPwr[3]+currPower.durability;
                    pDiv.appendChild(pLi4);
                    var pLi5 = document.createElement('li');
                    pLi5.innerHTML=currPwr[4]+currPower.power;
                    pDiv.appendChild(pLi5);
                    var pLi6 = document.createElement('li');
                    pLi6.innerHTML=currPwr[5]+currPower.combat;
                    pDiv.appendChild(pLi6);

                //          BIOGRAPHY 
                    var currBio = resJson.biography;
                    var details1 = document.createElement('details');
                    S_info.appendChild(details1);
                    let currSmry1 = document.createElement('summary');
                    currSmry1.innerHTML = "BIOGRAPHY";
                    details1.appendChild(currSmry1);
                    var bDiv = document.createElement('div');
                    bDiv.setAttribute("class","d-content");
                    details1.appendChild(bDiv);
                    var currbiolg = ["Full-Name : ","Alter-Egos : ","Place-Of-Birth : ","First-Appearance : ","Publisher : ","Alignment : "];
                    var pLi1 = document.createElement('li');
                    pLi1.innerHTML= currbiolg[0]+currBio["full-name"];
                    bDiv.appendChild(pLi1);
                    var pLi2 = document.createElement('li');
                    pLi2.innerHTML=currbiolg[1]+currBio["alter-egos"];
                    bDiv.appendChild(pLi2);
                    var pLi3 = document.createElement('li');
                    pLi3.innerHTML=currbiolg[2]+currBio["place-of-birth"];
                    bDiv.appendChild(pLi3);
                    var pLi4 = document.createElement('li');
                    pLi4.innerHTML=currbiolg[3]+currBio["first-appearance"];
                    bDiv.appendChild(pLi4);
                    var pLi5 = document.createElement('li');
                    pLi5.innerHTML=currbiolg[4]+currBio.publisher;
                    bDiv.appendChild(pLi5);
                    var pLi6 = document.createElement('li');
                    pLi6.innerHTML=currbiolg[5]+currBio.alignment;
                    bDiv.appendChild(pLi6);

                //    APPEARANCE     
                    var curraprn = resJson.appearance;
                    var details2 = document.createElement('details');
                    S_info.appendChild(details2);
                    let currSmry2 = document.createElement('summary');
                    currSmry2.innerHTML = "APPEARANCE";
                    details2.appendChild(currSmry2);
                    var aDiv = document.createElement('div');
                    aDiv.setAttribute("class","d-content");
                    details2.appendChild(aDiv);
                    var currAppr = ["Gender : ","Race : ","Height : ","Weight : ","Eye-Color : ","Hair-Color : "];
                    var pLi1 = document.createElement('li');
                    pLi1.innerHTML="Gender : "+curraprn.gender;
                    aDiv.appendChild(pLi1);
                    var pLi2 = document.createElement('li');
                    pLi2.innerHTML=currAppr[1]+curraprn.race;
                    aDiv.appendChild(pLi2);
                    var pLi3 = document.createElement('li');
                    pLi3.innerHTML=currAppr[2]+curraprn.height[0];
                    aDiv.appendChild(pLi3);
                    var pLi4 = document.createElement('li');
                    pLi4.innerHTML=currAppr[3]+curraprn.weight[1];
                    aDiv.appendChild(pLi4);
                    var pLi5 = document.createElement('li');
                    pLi5.innerHTML=currAppr[4]+curraprn["eye-color"];
                    aDiv.appendChild(pLi5);
                    var pLi6 = document.createElement('li');
                    pLi6.innerHTML=currAppr[5]+curraprn["hair-color"];
                    aDiv.appendChild(pLi6);

                //          WORK
                    var currWork = resJson.work;
                    var details3 = document.createElement('details');
                    S_info.appendChild(details3);
                    let currSmry3 = document.createElement('summary');
                    currSmry3.innerHTML = "WORK";
                    details3.appendChild(currSmry3);
                    var wDiv = document.createElement('div');
                    wDiv.setAttribute("class","d-content");
                    details3.appendChild(wDiv);
                    var pLi1 = document.createElement('li');
                    pLi1.innerHTML="Occupation : "+currWork.occupation;
                    wDiv.appendChild(pLi1);
                    var pLi2 = document.createElement('li');
                    pLi2.innerHTML="Base : "+currWork.base;
                    wDiv.appendChild(pLi2);

                //          CONNECTION
                    var currConne = resJson.connections;
                    var details4 = document.createElement('details');
                    S_info.appendChild(details4);
                    let currSmry4 = document.createElement('summary');
                    currSmry4.innerHTML = "CONNECTIONS";
                    details4.appendChild(currSmry4);
                    var cDiv = document.createElement('div');
                    cDiv.setAttribute("class","d-content");
                    details4.appendChild(cDiv);
                    var pLi1 = document.createElement('li');
                    pLi1.innerHTML="Group-Affiliation : "+currConne["group-affiliation"];
                    cDiv.appendChild(pLi1);
                    var pLi2 = document.createElement('li');
                    pLi2.innerHTML="Relatives : "+currConne.relatives;
                    cDiv.appendChild(pLi2);

                //  To go to favorite page
                    back.addEventListener('click',()=>{
                        cont.remove();
                        fav_container.style.display='flex';
                    });
                    search.onclick = ()=>{
                      cont.remove();
                    }
                });
            }
                xhreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/'+uniquefav[i],true);
                xhreq.send();
                
        }

    }
}

input.onclick = ()=>{
  if(heading[0].getAttribute('style') == 'height: 10vh'){
    heading[0].setAttribute('style','height: 30vh');
  }
}
function searchImg(){

//To go to home page    
    home.addEventListener('click',refreshPage);

    //  if(result.getAttribute('style')== 'position: relative; top:0px;'){
    //     result.setAttribute('style','position: absolute; top:101px;');
    //  }

    heading1.classList.remove('suggestions');

    if(heading[0].getAttribute('style') == 'height: 100vh;'){
        heading[0].setAttribute('style','height: 10vh');
        const border = document.createElement('div');
        border.setAttribute("class","line");
        searchPage.appendChild(border);
    }
    if(heading[0].getAttribute('style') == 'height: 30vh'){
      heading[0].setAttribute('style','height: 10vh');
    }
}

//To search the images from input name;
search.addEventListener('click',()=>{

    fav_container.display='none';

//To remove duplcate elements ..     
    if(searchPage.childNodes.length>1){
        searchPage.removeChild(searchPage.childNodes[1]);
    }

//Creating Heroes container to store them..    
    let heroes = document.createElement('div');
    heroes.setAttribute('class','heroes');
    searchPage.appendChild(heroes);
    var xhreq = new XMLHttpRequest();
    xhreq.onload = ()=>{

        var resJson = JSON.parse(xhreq.response);
        if(resJson.response == "error"){
        var p = document.createElement('p');
        p.setAttribute("class","pError");
        if(input.value == ''){
            p.innerHTML ="You have not entered any name ";
            heroes.appendChild(p);
        }
        else{
        p.innerHTML ="The "+ input.value +" you are searching is not found ";
        heroes.appendChild(p);
        }
        }
        else{
        
        for(var i=0;i<resJson.results.length;i++){

            var imageURL = resJson.results[i].image.url;
            const hero = document.createElement('div');
            hero.setAttribute("class",'heros');
            heroes.appendChild(hero);

        //For images
            var container =document.createElement('div');
            container.setAttribute("class",'images');
            hero.appendChild(container);
            var img = document.createElement('img');
            img.setAttribute("src",imageURL);
            img.setAttribute("alt","...");
            container.appendChild(img);

        //for names
            const name = resJson.results[i].name;
            const p = document.createElement('p');
            p.innerHTML = name;
            container.appendChild(p);

        // for info
            const info = document.createElement('p');
            info.setAttribute("class",'info');
            info.setAttribute("id",i);
            container.appendChild(info);
            const link = document.createElement('a');
            link.innerHTML="About";
            info.appendChild(link);

        // For Adding to favorites    
            var span_icon = document.createElement('span');
            container.appendChild(span_icon);
            var fav_icon = document.createElement('i');
            fav_icon.setAttribute("class",'fas fa-heart favrt');
            span_icon.appendChild(fav_icon);

            var getid = info.getAttribute('id');
            const iId = resJson.results[getid].id;

        // To update the favorites that are removed from favorites ..    
            for(var n =0;n<MfavArr.length;n++){
                if(MfavArr[n]== iId){
                    document.getElementsByClassName('favrt')[getid].style.color='#f5a94c';
                }
            }
            
        // Favoritess Storing
            fav_icon.addEventListener('click',()=>{
                var getid = info.getAttribute('id');
                const iId = resJson.results[getid].id;
                document.getElementsByClassName('favrt')[getid].style.color='#f5a94c';
                favArr.push(iId); 
            });

        // For Information
            info.addEventListener('click',()=>{

            // Hide
                heroes.style.display ="none";
               
                var otherCont = document.getElementsByClassName('individual-content')[0];
                var back = document.createElement('h1');
                var b_icon=document.createElement('i');

            // Back icon to go back    
                b_icon.setAttribute("class","fas fa-backward");
                back.setAttribute('class','back');
                back.appendChild(b_icon);
                
                var cont = document.createElement("div");
                cont.appendChild(back);
                cont.setAttribute("class",'cont');
                var contImg = document.createElement('img');
                contImg.setAttribute('class','contImg');
                var getid = info.getAttribute('id');

            // Adding Images in information     
                contImg.setAttribute('src',resJson.results[getid].image.url);
                cont.appendChild(contImg);
                otherCont.appendChild(cont);
                var currName = resJson.results[getid].name;
                var S_name = document.createElement('h1');
                S_name.innerHTML = currName;

            // Adding Names to the info page    
                S_name.setAttribute("class","M-name");
                cont.appendChild(S_name);
                var S_info = document.createElement('div');
                S_info.setAttribute("class","information");
                cont.appendChild(S_info);

            //                  POWERSTATS         
                var currPower = resJson.results[getid].powerstats;
                var details = document.createElement('details');
                S_info.appendChild(details);
                let currSmry = document.createElement('summary');
                currSmry.innerHTML = "POWERSTATS";
                details.appendChild(currSmry);
                var pDiv = document.createElement('div');
                pDiv.setAttribute("class","d-content");
                details.appendChild(pDiv);
                var currPwr = ["Intelligence : ","Strength : ","Speed : ","Durability : ","Power: ","Combat : "];
                var pLi1 = document.createElement('li');
                pLi1.innerHTML="Intelligence : "+currPower.intelligence;
                pDiv.appendChild(pLi1);
                var pLi2 = document.createElement('li');
                pLi2.innerHTML=currPwr[1]+currPower.strength;
                pDiv.appendChild(pLi2);
                var pLi3 = document.createElement('li');
                pLi3.innerHTML=currPwr[2]+currPower.speed;
                pDiv.appendChild(pLi3);
                var pLi4 = document.createElement('li');
                pLi4.innerHTML=currPwr[3]+currPower.durability;
                pDiv.appendChild(pLi4);
                var pLi5 = document.createElement('li');
                pLi5.innerHTML=currPwr[4]+currPower.power;
                pDiv.appendChild(pLi5);
                var pLi6 = document.createElement('li');
                pLi6.innerHTML=currPwr[5]+currPower.combat;
                pDiv.appendChild(pLi6);

            //                  BIOGRAPHY  
                var currBio = resJson.results[getid].biography;
                var details1 = document.createElement('details');
                S_info.appendChild(details1);
                let currSmry1 = document.createElement('summary');
                currSmry1.innerHTML = "BIOGRAPHY";
                details1.appendChild(currSmry1);
                var bDiv = document.createElement('div');
                bDiv.setAttribute("class","d-content");
                details1.appendChild(bDiv);
                var currbiolg = ["Full-Name : ","Alter-Egos : ","Place-Of-Birth : ","First-Appearance : ","Publisher : ","Alignment : "];
                var pLi1 = document.createElement('li');
                pLi1.innerHTML= currbiolg[0]+currBio["full-name"];
                bDiv.appendChild(pLi1);
                var pLi2 = document.createElement('li');
                pLi2.innerHTML=currbiolg[1]+currBio["alter-egos"];
                bDiv.appendChild(pLi2);
                var pLi3 = document.createElement('li');
                pLi3.innerHTML=currbiolg[2]+currBio["place-of-birth"];
                bDiv.appendChild(pLi3);
                var pLi4 = document.createElement('li');
                pLi4.innerHTML=currbiolg[3]+currBio["first-appearance"];
                bDiv.appendChild(pLi4);
                var pLi5 = document.createElement('li');
                pLi5.innerHTML=currbiolg[4]+currBio.publisher;
                bDiv.appendChild(pLi5);
                var pLi6 = document.createElement('li');
                pLi6.innerHTML=currbiolg[5]+currBio.alignment;
                bDiv.appendChild(pLi6);

            //                  APPEARANCE     
                var curraprn = resJson.results[getid].appearance;
                var details2 = document.createElement('details');
                S_info.appendChild(details2);
                let currSmry2 = document.createElement('summary');
                currSmry2.innerHTML = "APPEARANCE";
                details2.appendChild(currSmry2);
                var aDiv = document.createElement('div');
                aDiv.setAttribute("class","d-content");
                details2.appendChild(aDiv);
                var currAppr = ["Gender : ","Race : ","Height : ","Weight : ","Eye-Color : ","Hair-Color : "];
                var pLi1 = document.createElement('li');
                pLi1.innerHTML="Gender : "+curraprn.gender;
                aDiv.appendChild(pLi1);
                var pLi2 = document.createElement('li');
                pLi2.innerHTML=currAppr[1]+curraprn.race;
                aDiv.appendChild(pLi2);
                var pLi3 = document.createElement('li');
                pLi3.innerHTML=currAppr[2]+curraprn.height[0];
                aDiv.appendChild(pLi3);
                var pLi4 = document.createElement('li');
                pLi4.innerHTML=currAppr[3]+curraprn.weight[1];
                aDiv.appendChild(pLi4);
                var pLi5 = document.createElement('li');
                pLi5.innerHTML=currAppr[4]+curraprn["eye-color"];
                aDiv.appendChild(pLi5);
                var pLi6 = document.createElement('li');
                pLi6.innerHTML=currAppr[5]+curraprn["hair-color"];
                aDiv.appendChild(pLi6);

            //                  WORK
                var currWork = resJson.results[getid].work;
                var details3 = document.createElement('details');
                S_info.appendChild(details3);
                let currSmry3 = document.createElement('summary');
                currSmry3.innerHTML = "WORK";
                details3.appendChild(currSmry3);
                var wDiv = document.createElement('div');
                wDiv.setAttribute("class","d-content");
                details3.appendChild(wDiv);
                var pLi1 = document.createElement('li');
                pLi1.innerHTML="Occupation : "+currWork.occupation;
                wDiv.appendChild(pLi1);
                var pLi2 = document.createElement('li');
                pLi2.innerHTML="Base : "+currWork.base;
                wDiv.appendChild(pLi2);
                
            //                  CONNECTION
                var currConne = resJson.results[getid].connections;
                var details4 = document.createElement('details');
                S_info.appendChild(details4);
                let currSmry4 = document.createElement('summary');
                currSmry4.innerHTML = "CONNECTIONS";
                details4.appendChild(currSmry4);
                var cDiv = document.createElement('div');
                cDiv.setAttribute("class","d-content");
                details4.appendChild(cDiv);
                var pLi1 = document.createElement('li');
                pLi1.innerHTML="Group-Affiliation : "+currConne["group-affiliation"];
                cDiv.appendChild(pLi1);
                var pLi2 = document.createElement('li');
                pLi2.innerHTML="Relatives : "+currConne.relatives;
                cDiv.appendChild(pLi2);
            //  To go to searched page
                back.addEventListener('click',()=>{
                    cont.remove();
                    heroes.style.display='flex';
                });

                search.onclick = ()=>{
                  cont.remove();
                }
            });
        }
        }
    };

    xhreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/search/'+input.value,true);
    xhreq.send();

    
})

// Suggestions 

let namesInApi = ['A-Bomb', 'Abe Sapien', 'Abin Sur', 'Abomination', 'Abraxas', 'Absorbing Man', 'Adam Monroe', 'Adam Strange', 
'Agent 13', 'Agent Bob', 'Agent Zero', 'Air-Walker', 'Ajax', 'Alan Scott', 'Alex Mercer', 'Alex Woolsly', 'Alfred Pennyworth', 
'Alien', 'Allan Quatermain', 'Amazo', 'Ammo', 'Ando Masahashi', 'Angel', 'Angel', 'Angel Dust', 'Angel Salvadore', 'Angela', 
'Animal Man', 'Annihilus', 'Ant-Man', 'Ant-Man II', 'Anti-Monitor', 'Anti-Spawn', 'Anti-Venom', 'Apocalypse', 'Aquababy', 'Aqualad', 
'Aquaman', 'Arachne', 'Archangel', 'Arclight', 'Ardina', 'Ares', 'Ariel', 'Armor', 'Arsenal', 'Astro Boy', 'Atlas', 'Atlas', 'Atom', 
'Atom', 'Atom Girl', 'Atom II', 'Atom III', 'Atom IV', 'Aurora', 'Azazel', 'Azrael', 'Aztar', 'Bane', 'Banshee', 'Bantam', 'Batgirl',
'Batgirl', 'Batgirl III', 'Batgirl IV', 'Batgirl V', 'Batgirl VI', 'Batman', 'Batman', 'Batman II', 'Battlestar', 'Batwoman V', 
'Beak', 'Beast', 'Beast Boy', 'Beetle', 'Ben 10', 'Beta Ray Bill', 'Beyonder', 'Big Barda', 'Big Daddy', 'Big Man', 'Bill Harken', 
'Billy Kincaid', 'Binary', 'Bionic Woman', 'Bird-Brain', 'Bird-Man', 'Bird-Man II', 'Birdman', 'Bishop', 'Bizarro', 'Black Abbott', 
'Black Adam', 'Black Bolt', 'Black Canary', 'Black Canary', 'Black Cat', 'Black Flash', 'Black Goliath', 'Black Knight III', 
'Black Lightning', 'Black Mamba', 'Black Manta', 'Black Panther', 'Black Widow', 'Black Widow II', 'Blackout', 'Blackwing', 
'Blackwulf', 'Blade', 'Blaquesmith', 'Bling!', 'Blink', 'Blizzard', 'Blizzard', 'Blizzard II', 'Blob', 'Bloodaxe', 'Bloodhawk', 
'Bloodwraith', 'Blue Beetle', 'Blue Beetle', 'Blue Beetle II', 'Blue Beetle III', 'Boba Fett', 'Bolt', 'Bomb Queen', 'Boom-Boom', 
'Boomer', 'Booster Gold', 'Box', 'Box III', 'Box IV', 'Brainiac', 'Brainiac 5', 'Brother Voodoo', 'Brundlefly', 'Buffy', 'Bullseye', 
'Bumblebee', 'Bumbleboy', 'Bushido', 'Cable', 'Callisto', 'Cameron Hicks', 'Cannonball', 'Captain America', 'Captain Atom', 
'Captain Britain', 'Captain Cold', 'Captain Epic', 'Captain Hindsight', 'Captain Mar-vell', 'Captain Marvel', 'Captain Marvel', 
'Captain Marvel II', 'Captain Midnight', 'Captain Planet', 'Captain Universe', 'Carnage', 'Cat', 'Cat II', 'Catwoman', 
'Cecilia Reyes', 'Century', 'Cerebra', 'Chamber', 'Chameleon', 'Changeling', 'Cheetah', 'Cheetah II', 'Cheetah III', 'Chromos', 
'Chuck Norris', 'Citizen Steel', 'Claire Bennet', 'Clea', 'Cloak', 'Clock King', 'Cogliostro', 'Colin Wagner', 'Colossal Boy', 
'Colossus', 'Copycat', 'Corsair', 'Cottonmouth', 'Crimson Crusader', 'Crimson Dynamo', 'Crystal', 'Curse', 'Cy-Gor', 'Cyborg', 
'Cyborg Superman', 'Cyclops', 'Cypher', 'Dagger', 'Danny Cooper', 'Daphne Powell', 'Daredevil', 'Darkhawk', 'Darkman', 'Darkseid', 
'Darkside', 'Darkstar', 'Darth Maul', 'Darth Vader', 'Dash', 'Data', 'Dazzler', 'Deadman', 'Deadpool', 'Deadshot', 'Deathlok', 
'Deathstroke', 'Demogoblin', 'Destroyer', 'Diamondback', 'DL Hawkins', 'Doc Samson', 'Doctor Doom', 'Doctor Doom II', 'Doctor Fate', 
'Doctor Octopus', 'Doctor Strange', 'Domino', 'Donatello', 'Donna Troy', 'Doomsday', 'Doppelganger', 'Dormammu', 'Dr Manhattan', 
'Drax the Destroyer', 'Ego', 'Elastigirl', 'Electro', 'Elektra', 'Elle Bishop', 'Elongated Man', 'Emma Frost', 'Enchantress', 
'Energy', 'ERG-1', 'Ethan Hunt', 'Etrigan', 'Evil Deadpool', 'Evilhawk', 'Exodus', 'Fabian Cortez', 'Falcon', 'Fallen One II', 
'Faora', 'Feral', 'Fighting Spirit', 'Fin Fang Foom', 'Firebird', 'Firelord', 'Firestar', 'Firestorm', 'Firestorm', 'Fixer', 
'Flash', 'Flash Gordon', 'Flash II', 'Flash III', 'Flash IV', 'Forge', 'Franklin Richards', 'Franklin Storm', 'Frenzy', 'Frigga', 
'Galactus', 'Gambit', 'Gamora', 'Garbage Man', 'Gary Bell', 'General Zod', 'Genesis', 'Ghost Rider', 'Ghost Rider II', 'Giant-Man', 
'Giant-Man II', 'Giganta', 'Gladiator', 'Goblin Queen', 'Godzilla', 'Gog', 'Goku', 'Goliath', 'Goliath', 'Goliath', 'Goliath IV', 
'Gorilla Grodd', 'Granny Goodness', 'Gravity', 'Greedo', 'Green Arrow', 'Green Goblin', 'Green Goblin II', 'Green Goblin III', 
'Green Goblin IV', 'Groot', 'Guardian', 'Guy Gardner', 'Hal Jordan', 'Han Solo', 'Hancock', 'Harley Quinn', 'Harry Potter', 'Havok', 
'Hawk', 'Hawkeye', 'Hawkeye II', 'Hawkgirl', 'Hawkman', 'Hawkwoman', 'Hawkwoman II', 'Hawkwoman III', 'Heat Wave', 'Hela', 'Hellboy', 
'Hellcat', 'Hellstorm', 'Hercules', 'Hiro Nakamura', 'Hit-Girl', 'Hobgoblin', 'Hollow', 'Hope Summers', 'Howard the Duck', 'Hulk', 
'Human Torch', 'Huntress', 'Husk', 'Hybrid', 'Hydro-Man', 'Hyperion', 'Iceman', 'Impulse', 'Indiana Jones', 'Indigo', 'Ink', 
'Invisible Woman', 'Iron Fist', 'Iron Man', 'Iron Monger', 'Isis', 'Jack Bauer', 'Jack of Hearts', 'Jack-Jack', 'James Bond', 
'James T. Kirk', 'Jar Jar Binks', 'Jason Bourne', 'Jean Grey', 'Jean-Luc Picard', 'Jennifer Kale', 'Jesse Quick', 'Jessica Cruz', 
'Jessica Jones', 'Jessica Sanders', 'Jigsaw', 'Jim Powell', 'JJ Powell', 'Johann Krauss', 'John Constantine', 'John Stewart', 
'John Wraith', 'Joker', 'Jolt', 'Jubilee', 'Judge Dredd', 'Juggernaut', 'Junkpile', 'Justice', 'Jyn Erso', 'K-2SO', 'Kang', 
'Kathryn Janeway', 'Katniss Everdeen', 'Kevin 11', 'Kick-Ass', 'Kid Flash', 'Kid Flash II', 'Killer Croc', 'Killer Frost', 
'Kilowog', 'King Kong', 'King Shark', 'Kingpin', 'Klaw', 'Kool-Aid Man', 'Kraven II', 'Kraven the Hunter', 'Krypto', 'Kyle Rayner', 
'Kylo Ren', 'Lady Bullseye', 'Lady Deathstrike', 'Leader', 'Leech', 'Legion', 'Leonardo', 'Lex Luthor', 'Light Lass', 'Lightning Lad', 
'Lightning Lord', 'Living Brain', 'Living Tribunal', 'Liz Sherman', 'Lizard', 'Lobo', 'Loki', 'Longshot', 'Luke Cage', 'Luke Campbell', 
'Luke Skywalker', 'Luna', 'Lyja', 'Mach-IV', 'Machine Man', 'Magneto', 'Magog', 'Magus', 'Man of Miracles', 'Man-Bat', 'Man-Thing', 
'Man-Wolf', 'Mandarin', 'Mantis', 'Martian Manhunter', 'Marvel Girl', 'Master Brood', 'Master Chief', 'Match', 'Matt Parkman', 
'Maverick', 'Maxima', 'Maya Herrera', 'Medusa', 'Meltdown', 'Mephisto', 'Mera', 'Metallo', 'Metamorpho', 'Meteorite', 'Metron', 
'Micah Sanders', 'Michelangelo', 'Micro Lad', 'Mimic', 'Minna Murray', 'Misfit', 'Miss Martian', 'Mister Fantastic', 'Mister Freeze', 
'Mister Knife', 'Mister Mxyzptlk', 'Mister Sinister', 'Mister Zsasz', 'Mockingbird', 'MODOK', 'Mogo', 'Mohinder Suresh', 'Moloch', 
'Molten Man', 'Monarch', 'Monica Dawson', 'Moon Knight', 'Moonstone', 'Morlun', 'Morph', 'Moses Magnum', 'Mr Immortal', 
'Mr Incredible', 'Ms Marvel II', 'Multiple Man', 'Mysterio', 'Mystique', 'Namor', 'Namor', 'Namora', 'Namorita', 'Naruto Uzumaki', 
'Nathan Petrelli', 'Nebula', 'Negasonic Teenage Warhead', 'Nick Fury', 'Nightcrawler', 'Nightwing', 'Niki Sanders', 'Nina Theroux', 
'Nite Owl II', 'Northstar', 'Nova', 'Nova', 'Odin', 'Offspring', 'Omega Red', 'Omniscient', 'One Punch Man', 'One-Above-All', 
'Onslaught', 'Oracle', 'Osiris', 'Overtkill', 'Ozymandias', 'Parademon', 'Paul Blart', 'Penance', 'Penance I', 'Penance II', 
'Penguin', 'Phantom', 'Phantom Girl', 'Phoenix', 'Plantman', 'Plastic Lad', 'Plastic Man', 'Plastique', 'Poison Ivy', 'Polaris', 
'Power Girl', 'Power Man', 'Predator', 'Professor X', 'Professor Zoom', 'Psylocke', 'Punisher', 'Purple Man', 'Pyro', 'Q', 
'Quantum', 'Question', 'Quicksilver', 'Quill', "Ra's Al Ghul", 'Rachel Pirzad', 'Rambo', 'Raphael', 'Raven', 'Ray', 'Razor-Fist II', 
'Red Arrow', 'Red Hood', 'Red Hulk', 'Red Mist', 'Red Robin', 'Red Skull', 'Red Tornado', 'Redeemer II', 'Redeemer III', 
'Renata Soliz', 'Rey', 'Rhino', 'Rick Flag', 'Riddler', 'Rip Hunter', 'Ripcord', 'Robin', 'Robin II', 'Robin III', 'Robin V', 
'Robin VI', 'Rocket Raccoon', 'Rogue', 'Ronin', 'Rorschach', 'Sabretooth', 'Sage', 'Sandman', 'Sasquatch', 'Sauron', 
'Savage Dragon', 'Scarecrow', 'Scarlet Spider', 'Scarlet Spider II', 'Scarlet Witch', 'Scorpia', 'Scorpion', 'Sebastian Shaw', 
'Sentry', 'Shadow King', 'Shadow Lass', 'Shadowcat', 'Shang-Chi', 'Shatterstar', 'She-Hulk', 'She-Thing', 'Shocker', 'Shriek', 
'Shrinking Violet', 'Sif', 'Silk', 'Silk Spectre', 'Silk Spectre II', 'Silver Surfer', 'Silverclaw', 'Simon Baz', 'Sinestro', 
'Siren', 'Siren II', 'Siryn', 'Skaar', 'Snake-Eyes', 'Snowbird', 'Sobek', 'Solomon Grundy', 'Songbird', 'Space Ghost', 'Spawn', 
'Spectre', 'Speedball', 'Speedy', 'Speedy', 'Spider-Carnage', 'Spider-Girl', 'Spider-Gwen', 'Spider-Man', 'Spider-Man', 'Spider-Man', 
'Spider-Woman', 'Spider-Woman II', 'Spider-Woman III', 'Spider-Woman IV', 'Spock', 'Spyke', 'Stacy X', 'Star-Lord', 'Stardust', 
'Starfire', 'Stargirl', 'Static', 'Steel', 'Stephanie Powell', 'Steppenwolf', 'Storm', 'Stormtrooper', 'Sunspot', 'Superboy', 
'Superboy-Prime', 'Supergirl', 'Superman', 'Swamp Thing', 'Swarm', 'Sylar', 'Synch', 'T-1000', 'T-800', 'T-850', 'T-X', 'Taskmaster', 
'Tempest', 'Thanos', 'The Cape', 'The Comedian', 'Thing', 'Thor', 'Thor Girl', 'Thunderbird', 'Thunderbird II', 'Thunderbird III', 
'Thunderstrike', 'Thundra', 'Tiger Shark', 'Tigra', 'Tinkerer', 'Titan', 'Toad', 'Toxin', 'Toxin', 'Tracy Strauss', 'Trickster', 
'Trigon', 'Triplicate Girl', 'Triton', 'Two-Face', 'Ultragirl', 'Ultron', 'Utgard-Loki', 'Vagabond', 'Valerie Hart', 'Valkyrie', 
'Vanisher', 'Vegeta', 'Venom', 'Venom II', 'Venom III', 'Venompool', 'Vertigo II', 'Vibe', 'Vindicator', 'Vindicator', 'Violator', 
'Violet Parr', 'Vision', 'Vision II', 'Vixen', 'Vulcan', 'Vulture', 'Walrus', 'War Machine', 'Warbird', 'Warlock', 'Warp', 'Warpath', 
'Wasp', 'Watcher', 'Weapon XI', 'White Canary', 'White Queen', 'Wildfire', 'Winter Soldier', 'Wiz Kid', 'Wolfsbane', 'Wolverine', 
'Wonder Girl', 'Wonder Man', 'Wonder Woman', 'Wondra', 'Wyatt Wingfoot', 'X-23', 'X-Man', 'Yellow Claw', 'Yellowjacket', 
'Yellowjacket II', 'Ymir', 'Yoda', 'Zatanna', 'Zoom'];


