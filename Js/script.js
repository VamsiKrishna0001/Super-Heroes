
const input = document.getElementById("input");
const heroes = document.getElementsByClassName("heroes")[0];

input.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter'){
        loadImages();
    }
});

function loadImages(){
    
    var xreq = new XMLHttpRequest();
    xreq.onload = ()=>{
        console.log(xreq.response);
        var responseJson = JSON.parse(xreq.response);
        console.log(responseJson);
        // var imageURL = responseJson.message;
        const imgNodes =[];
        for(var i =0;i<responseJson.results.length;i++){
            var imageURL = responseJson.results[i].image.url;
            console.log(imageURL);
            imgNodes[i] = document.createElement('div');
            imgNodes[i].className = 'img';
            imgNodes[i].style.backgroundImage= 'url('+imageURL+')';
            heroes.appendChild(imgNodes[i]);
            // dImage.setAttribute('src',imageURL);
        }
        // var imageURL = responseJson.results[0].image.url;
        // console.log(imageURL);
        // dImage.setAttribute('src',imageURL);
    };

    // xreq.open('get','https://dog.ceo/api/breeds/image/random',true);
    xreq.open('get','https://www.superheroapi.com/api.php/2980995878784118/search/'+input.value,true);
    xreq.send();
    // const url = "https://www.superheroapi.com/api.php/2980995878784118/search/"+input.value;
    // fetch(url)
    // .then(response=>{
    //     if(response.ok){
    //         console.log(response.json);
    //         return response.json();
    //     }else{
    //         alert(response.status);
           
    //     }
    // })

    // .then(data => {
    //    const imgNodes =[];
    //    for(let i=0;i<data.results.length;i++){
    //        imgNodes[i] = document.createElement('div');
    //        imgNodes[i].className = 'img';
    //        imgNodes[i].style.backgroundImage= 'url('+data.results[i].urls+')';
    //        heroes.appendChild(imgNodes[i]);
    //    }
    // })

}