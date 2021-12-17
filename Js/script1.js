
let heading = document.getElementsByClassName('header');
let main = document.getElementsByClassName('content')[0];
const input = document.getElementById('input');
let search = document.getElementById('search');
let fav = document.getElementsByClassName('fa-heart')[0];
let home = document.getElementsByClassName('fa-mask')[0];
let fav_container = document.getElementsByClassName('fav-container')[0];
let favArr =[];
let bFromfav=[];
let favName =[];

// home.addEventListener('click',()=>{

//     heading[0].setAttribute('style','height: 100vh');
//     var f_line = document.getElementsByClassName('F-line')[0];
//     f_line.setAttribute("style"," margin: 5px 0; width: 100vw;");
//     fav.addEventListener('click',favorites);

// },true);

// home.removeEventListener('click',()=>{
//     heading[0].setAttribute('style','height: 10vh');
// var f_line = document.getElementsByClassName('F-line')[0];
// f_line.setAttribute("style"," margin: 5px 0; width: 100vw;");
// fav.addEventListener('click',favorites);
// },true);

fav.addEventListener('click',favorites);
var retV;
function favorites(){
    
    searchImg();
    main.style.display = 'none';
    fav_container.style.display='flex';
    var f_line = document.getElementsByClassName('F-line')[0];
    f_line.setAttribute("style"," margin: 5px 0; width: 100vw; border-bottom: 4px solid black;");

    // var back = document.createElement('h1');
    // var b_icon=document.createElement('i');
    // b_icon.setAttribute("class","fas fa-backward");
    // back.setAttribute('class','back');
    // back.appendChild(b_icon);
    // fav_container.appendChild(back);
    // back.addEventListener('click',()=>{
    //      //.remove();
    //     fav_container.style.display='none';
    //         main.style.display = 'flex';
    //     });
    if(favArr.length == 0){
    //    console.log('yes');
        console.log(fav_container.childNodes.length);
       if(fav_container.childNodes.length>3){
       fav_container.removeChild(fav_container.childNodes[3]);
       fav_container.removeChild(fav_container.childNodes[3]);
       console.log("back p");
       }
        var back = document.createElement('h1');
        var b_icon=document.createElement('i');
        b_icon.setAttribute("class","fas fa-backward");
        back.setAttribute('class','back');
        back.appendChild(b_icon);
        fav_container.appendChild(back);
        back.addEventListener('click',()=>{
            if(favArr.length!=0){
                p.remove();
            }
        fav_container.style.display='none';
        main.style.display = 'flex';
       });

       var p = document.createElement('p');
       p.innerHTML = "You Have No Favorites";
       fav_container.appendChild(p);
       search.addEventListener('click',()=>{
        // heroes.remove();
        p.remove();
        fav_container.style.display = 'none';
        main.style.display = 'flex';
    })
    }else{
        if(fav_container.childNodes.length>4){
            fav_container.childNodes[4].remove();
        }
        
        let heroes = document.createElement('div');
        heroes.setAttribute('class','heroes');
        fav_container.appendChild(heroes);
        console.log(fav_container);
      //  var arr =[];
        
        let uniquefav = [...new Set(favArr)];
        console.log(favArr);
        console.log(uniquefav);
        favArr = uniquefav;
        console.log("after:"+favArr);
        

        for(var f =0;f<uniquefav.length;f++){
           
            ajax(f);
        }
        function ajax(i){
            console.log(i);
            console.log( uniquefav[i]);
            var xhreq = new XMLHttpRequest();
            xhreq.onload = ()=>{
                var resJson = JSON.parse(xhreq.response);
                console.log(resJson);
                var imageURL = resJson.image.url;
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
                const name = resJson.name;
                const p = document.createElement('p');
                p.innerHTML = name;
                container.appendChild(p);
                // for info
                const info = document.createElement('p');
              
                info.setAttribute("class",'info');
                info.setAttribute("id",i);
                container.appendChild(info);
                
                const link = document.createElement('a');
                // link.setAttribute("href",'');
                link.innerHTML="About";
                info.appendChild(link);
                var span_icon = document.createElement('span');
                container.appendChild(span_icon);
                var fav_icon = document.createElement('i');
                fav_icon.setAttribute("class",'fas fa-heart favrt');
                span_icon.appendChild(fav_icon);
                fav_icon.addEventListener('click',()=>{
                  info.parentNode.parentNode.remove();
                  console.log(i);
                  uniquefav.splice(i,1);
                })
                search.addEventListener('click',()=>{
                    heroes.remove();
                    
                    fav_container.style.display = 'none';
                    main.style.display = 'flex';
                })

                info.addEventListener('click',()=>{
                    //Hide
                    fav_container.style.display ="none";
                    var otherCont = document.getElementsByClassName('individual-content')[0];
                    var back = document.createElement('h1');
                    var b_icon=document.createElement('i');
                    b_icon.setAttribute("class","fas fa-backward");
                    back.setAttribute('class','back');
                    // back.innerHTML = "Back";
                    back.appendChild(b_icon);
                    var cont = document.createElement("div");
                    cont.appendChild(back);
                    cont.setAttribute("class",'cont');
                    var contImg = document.createElement('img');
                    contImg.setAttribute('class','contImg');
                    var getid = info.getAttribute('id');
                    contImg.setAttribute('src',resJson.image.url);
                    cont.appendChild(contImg);
                    otherCont.appendChild(cont);
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
                    //  var mainPwr = ["intelligence","strength","speed","durability","power","combat"];
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

                    var currBio = resJson.biography;

                    //    BIOLOGY  
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

                    var curraprn = resJson.appearance;
                    // Appearance     
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
                    pLi1.innerHTML="Intelligence :"+curraprn.gender;
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
                    // WORk
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
                    //Connection
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
                    //  To go to searched page
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
    console.log(input.value);
    console.log(heading[0].getAttribute('style'));
    if(heading[0].getAttribute('style') == 'height: 100vh;'){
        heading[0].setAttribute('style','height: 10vh');
        const border = document.createElement('div');
        border.setAttribute("class","line");
        main.appendChild(border);
    }
}
search.addEventListener('click',()=>{
    fav_container.display='none';
    console.log(main.childNodes);
    if(main.childNodes.length>2){
        console.log(main.childNodes);
        main.childNodes[2].remove();
    }

    let heroes = document.createElement('div');
    heroes.setAttribute('class','heroes');
    main.appendChild(heroes);
    console.log(main);

    var xhreq = new XMLHttpRequest();
    xhreq.onload = ()=>{
        var resJson = JSON.parse(xhreq.response);
        console.log(resJson);
        for(var i=0;i<resJson.results.length;i++){
            var imageURL = resJson.results[i].image.url;
         //   console.log(imageURL);
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
            // const iId = resJson.results[i].id;
            info.setAttribute("class",'info');
            info.setAttribute("id",i);
            container.appendChild(info);
           
            const link = document.createElement('a');
            // link.setAttribute("href",'');
            link.innerHTML="About";
            info.appendChild(link);
            var span_icon = document.createElement('span');
            container.appendChild(span_icon);
            var fav_icon = document.createElement('i');
            fav_icon.setAttribute("class",'fas fa-heart favrt');
            span_icon.appendChild(fav_icon);
            // Favoritess Storing
            fav_icon.addEventListener('click',()=>{
                console.log("Yes Clicked");
                var getid = info.getAttribute('id');
                document.getElementsByClassName('favrt')[getid].style.color='blue';
                const iId = resJson.results[getid].id
                favName.push(input.value);
                favArr.push(iId);
                console.log(iId);
            })

            // For Information
            info.addEventListener('click',()=>{
                // Hide
                heroes.style.display ="none";
                var otherCont = document.getElementsByClassName('individual-content')[0];
                var back = document.createElement('h1');
                var b_icon=document.createElement('i');
                b_icon.setAttribute("class","fas fa-backward");
                back.setAttribute('class','back');
                // back.innerHTML = "Back";
                back.appendChild(b_icon);
                var cont = document.createElement("div");
                cont.appendChild(back);
                cont.setAttribute("class",'cont');
                var contImg = document.createElement('img');
                contImg.setAttribute('class','contImg');
                var getid = info.getAttribute('id');
                contImg.setAttribute('src',resJson.results[getid].image.url);
                cont.appendChild(contImg);
                otherCont.appendChild(cont);
                var currName = resJson.results[getid].name;
                var S_name = document.createElement('h1');
                S_name.innerHTML = currName;
                S_name.setAttribute("class","M-name");
                cont.appendChild(S_name);
                var S_info = document.createElement('div');
                S_info.setAttribute("class","information");
                cont.appendChild(S_info);
            //      POWERSTATS         
                var currPower = resJson.results[getid].powerstats;
                var details = document.createElement('details');
                S_info.appendChild(details);
                let currSmry = document.createElement('summary');
                currSmry.innerHTML = "POWERSTATS";
                details.appendChild(currSmry);
                var pDiv = document.createElement('div');
                pDiv.setAttribute("class","d-content");
                details.appendChild(pDiv);
              //  var mainPwr = ["intelligence","strength","speed","durability","power","combat"];
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

                var currBio = resJson.results[getid].biography;
        
            //    BIOLOGY  
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

                var curraprn = resJson.results[getid].appearance;
           // Appearance     
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
                pLi1.innerHTML="Intelligence :"+curraprn.gender;
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
                // WORk
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
                //Connection
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
                })
          })
        }
    }
    console.log(input.value);
    xhreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/search/'+input.value,true);
    xhreq.send();
})

