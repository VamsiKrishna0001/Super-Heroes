
let heading = document.getElementsByClassName('header');
let searchPage = document.getElementsByClassName('search-page')[0];
let input = document.getElementById('input');
let search = document.getElementById('search');
let fav = document.getElementsByClassName('fa-heart')[0];
let home = document.getElementsByClassName('fa-mask')[0];
let fav_container = document.getElementsByClassName('fav-container')[0];

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
                fav_icon.setAttribute("class",'fas fa-heart favrt favrt2');
                fav_icon.style.color = '#f5a94c';
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
                    pLi1.innerHTML="Intelligence :"+currPower.intelligence;
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
                    pLi1.innerHTML="Gender :"+curraprn.gender;
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
                    pLi1.innerHTML="Occupation :"+currWork.occupation;
                    wDiv.appendChild(pLi1);
                    var pLi2 = document.createElement('li');
                    pLi2.innerHTML="Base :"+currWork.base;
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
                    pLi1.innerHTML="Group-Affiliation :"+currConne["group-affiliation"];
                    cDiv.appendChild(pLi1);
                    var pLi2 = document.createElement('li');
                    pLi2.innerHTML="Relatives :"+currConne.relatives;
                    cDiv.appendChild(pLi2);

                //  To go to favorite page
                    back.addEventListener('click',()=>{
                        cont.remove();
                        fav_container.style.display='flex';
                    });
                });
            }
                xhreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/'+uniquefav[i],true);
                xhreq.send();
                
        }

    }
}


function searchImg(){

//To go to home page    
    home.addEventListener('click',refreshPage);

    if(heading[0].getAttribute('style') == 'height: 100vh;'){
        heading[0].setAttribute('style','height: 10vh');
        const border = document.createElement('div');
        border.setAttribute("class","line");
        searchPage.appendChild(border);
    }
}

//To search the images from input name;
search.addEventListener('click',()=>{

    fav_container.display='none';

//To remove duplcate elements ..     
    if(searchPage.childNodes.length>2){
        console.log(searchPage.childNodes);
        searchPage.childNodes[2].remove();
    }

//Creating Heroes container to store them..    
    let heroes = document.createElement('div');
    heroes.setAttribute('class','heroes');
    searchPage.appendChild(heroes);
    console.log(searchPage);

    var xhreq = new XMLHttpRequest();
    xhreq.onload = ()=>{

        var resJson = JSON.parse(xhreq.response);
        
        console.log(resJson);
       if(resJson.response == "error"){
        var p = document.createElement('p');
        p.setAttribute("class","pError");
        if(input.value == ''){
            p.innerHTML ="You have not entered any name ";
            heroes.appendChild(p);
        }else{
        p.innerHTML ="The "+ input.value +" you are searching is not found ";
        heroes.appendChild(p);
        }
       }else{
        
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
                pLi1.innerHTML="Intelligence :"+currPower.intelligence;
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
                pLi1.innerHTML="Gender :"+curraprn.gender;
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
                pLi1.innerHTML="Occupation :"+currWork.occupation;
                wDiv.appendChild(pLi1);
                var pLi2 = document.createElement('li');
                pLi2.innerHTML="Base :"+currWork.base;
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
                pLi1.innerHTML="Group-Affiliation :"+currConne["group-affiliation"];
                cDiv.appendChild(pLi1);
                var pLi2 = document.createElement('li');
                pLi2.innerHTML="Relatives :"+currConne.relatives;
                cDiv.appendChild(pLi2);
            //  To go to searched page
                back.addEventListener('click',()=>{
                    cont.remove();
                    heroes.style.display='flex';
                });
          });
        }
       }
    };

    console.log(input.value);
    xhreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/search/'+input.value,true);
    xhreq.send();
})


