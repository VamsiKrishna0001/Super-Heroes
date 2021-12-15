
let heading = document.getElementsByClassName('header');
let main = document.getElementsByClassName('content')[0];
const input = document.getElementById('input');
let search = document.getElementById('search');
function searchImg(){
    console.log(input.value);
    console.log(heading[0].getAttribute('style'));
    if(heading[0].getAttribute('style') == 'height: 100vh;'){
        heading[0].setAttribute('style','height: 10vh');
        const border = document.createElement('div');
        border.setAttribute("class","line");
        main.appendChild(border);
    }
    // let heroes = document.createElement('div');
    // heroes.setAttribute('class','heroes');
    // main.appendChild(heroes);
    // console.log(main);

    // var xhreq = new XMLHttpRequest();
    // xhreq.onload = ()=>{
    //     var resJson = JSON.parse(xhreq.response);
    //     console.log(resJson);
    //     for(var i=0;i<resJson.results.length;i++){
    //         var imageURL = resJson.results[i].image.url;
    //         console.log(imageURL);
    //         const hero = document.createElement('div');
    //          hero.setAttribute("class",'heros');
    //          //For images
    //         var container =document.createElement('div');
    //         container.setAttribute("class",'images');
    //         var img = document.createElement('img');
    //         img.setAttribute("src",imageURL);
    //         img.setAttribute("alt","...");
    //         //for names
    //         const name = resJson.results[i].name;
    //         const p = document.createElement('p');
    //         p.innerHTML = name;

    //         // for info
    //         const info = document.createElement('p');
    //         // const iId = resJson.results[i].id;
    //         info.setAttribute("class",'info');
    //         info.setAttribute("id",i);
    //         const link = document.createElement('a');
    //         // link.setAttribute("href",'');
    //         link.innerHTML="About";
    //         info.addEventListener('click',()=>{
    //             //Hide
    //             heroes.style.display ="none";
    //             var otherCont = document.getElementsByClassName('individual-content')[0];
    //             var back = document.createElement('h1');
    //             back.setAttribute('class','back');
    //             back.innerHTML = "Back";
    //             var cont = document.createElement("div");
    //             cont.appendChild(back);
    //             cont.setAttribute("class",'cont');
    //             var contImg = document.createElement('img');
    //             contImg.setAttribute('class','contImg');
    //             var getid = info.getAttribute('id');
    //             contImg.setAttribute('src',resJson.results[getid].image.url);
    //             cont.appendChild(contImg);
    //             otherCont.appendChild(cont);

    //           //  To go to searched page
    //             back.addEventListener('click',()=>{
    //                 cont.remove();
    //                 heroes.style.display='flex';
    //             })
    //        })


    //         info.appendChild(link);
    //         heroes.appendChild(hero);
    //         container.appendChild(img);
    //         container.appendChild(p);
    //         container.appendChild(info);
    //         hero.appendChild(container);
           
    //     }
    // }
    // console.log(input.value);
    // xhreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/search/'+input.value,true);
    // xhreq.send();
    //heroes.remove();
}

function goBack(hideContent,getsavedid,resJson){
    hideContent.style.display ="none";
    var otherCont = document.getElementsByClassName('individual-content')[0];
    var back = document.createElement('h1');
    back.innerHTML = "Back";
    var cont = document.createElement("div");
    cont.appendChild(back);
    cont.setAttribute("class",'cont');
    var contImg = document.createElement('img');
    contImg.setAttribute('class','contImg');
    var getid = getsavedid.getAttribute('id');
    contImg.setAttribute('src',resJson.results[getid].image.url);
    cont.appendChild(contImg);
    otherCont.appendChild(cont);

} 
 
search.addEventListener('click',()=>{

    if(main.childNodes.length>2){
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
            console.log(imageURL);
            const hero = document.createElement('div');
             hero.setAttribute("class",'heros');
             //For images
            var container =document.createElement('div');
            container.setAttribute("class",'images');
            var img = document.createElement('img');
            img.setAttribute("src",imageURL);
            img.setAttribute("alt","...");
            //for names
            const name = resJson.results[i].name;
            const p = document.createElement('p');
            p.innerHTML = name;
            // for info
            const info = document.createElement('p');
            // const iId = resJson.results[i].id;
            info.setAttribute("class",'info');
            info.setAttribute("id",i);
            const link = document.createElement('a');
            // link.setAttribute("href",'');
            link.innerHTML="About";
            info.addEventListener('click',()=>{
                //Hide
                heroes.style.display ="none";
                var otherCont = document.getElementsByClassName('individual-content')[0];
                var back = document.createElement('h1');
                back.setAttribute('class','back');
                back.innerHTML = "Back";
                var cont = document.createElement("div");
                cont.appendChild(back);
                cont.setAttribute("class",'cont');
                var contImg = document.createElement('img');
                contImg.setAttribute('class','contImg');
                var getid = info.getAttribute('id');
                contImg.setAttribute('src',resJson.results[getid].image.url);
                cont.appendChild(contImg);
                otherCont.appendChild(cont);

              //  To go to searched page
                back.addEventListener('click',()=>{
                    cont.remove();
                    heroes.style.display='flex';
                })
           })


            info.appendChild(link);
            heroes.appendChild(hero);
            container.appendChild(img);
            container.appendChild(p);
            container.appendChild(info);
            hero.appendChild(container);
           
        }
    }
    console.log(input.value);
    xhreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/search/'+input.value,true);
    xhreq.send();
})

