const Api = "https://api.themoviedb.org/3/genre/movie/list?api_key=1082a55dbe0455421149eaf000d2de4b";
const trendApi = "https://api.themoviedb.org/3/discover/movie?api_key=1082a55dbe0455421149eaf000d2de4b&trending/all/day?language=en-US";
const searchYT = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBmjICdTfbCdDf_VPDYzE02ZYgD3kvkfmg"



const imagePath = "https://image.tmdb.org/t/p/original";
var movies_list;
const movies_section = document.querySelector(".movies_section");
const movies_row = document.querySelector(".movies_row");
const bannerSection  = document.querySelector("#bannerSection");



const getMoviesFromCategories = async (category)=>{
    const Api1 = `https://api.themoviedb.org/3/discover/movie?api_key=1082a55dbe0455421149eaf000d2de4b&with_genres=${category.id}`;
    
    await fetch(Api1).then(res=>res.json()).then((res)=>{
        console.log("imm: ",res);
        var images = fetchMovieImages(res.results);
        //console.log("Yes1: ",images);
       const html = `
       <div class = "catHead">
       <h3 id="not_black">${category.name}</h3>
       
       <div class="images">
      ${images}
               </div>
         </div>
        `


        const div = document.createElement('div');
        div.className = "movies_row";
        div.innerHTML = html;
        
        movies_section.append(div);
     
    })

    
}

const fetchTrailer = (movieName,id)=>{

    
    let ytUrl;
    
    const getClassofDiv = document.getElementsByClassName(id);
   
    console.log("VeryImp",getClassofDiv);
    console.log("DivClass:",id)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieName}&key=AIzaSyBmjICdTfbCdDf_VPDYzE02ZYgD3kvkfmg`).then(res=>res.json()).then((res)=>{
        ytUrl = `https://www.youtube.com/embed/${res.items[0].id.videoId}?autoplay=1&controls=0`
        
        const iFrame = `<iframe src="${ytUrl}"   class = "movie_item" frameborder="0"></iframe>`

        
        console.log("Res: ",res);
        const div = document.createElement('div');
        div.innerHTML  = iFrame;
        
        
        const div2 = document.createElement('div');
         
        getClassofDiv[0].innerHTML = iFrame;
        console.log("DivClass2: ",getClassofDiv);
        
    });

    
    
    return ytUrl;


}

const handleMouse = ()=>{
    console.log("left");
}

const fetchMovieImages = (category) =>{
    var movImg = [];
    var indId = 0;
    category.forEach(elem => {
      
        movImg.push(`<div class = "${elem.id} movie_cont ${indId}" >
        <img class="movie_item" onclick="fetchTrailer('${elem.title}','${elem.id}')"   src="${imagePath}${elem.backdrop_path}" alt="squid game"/>
        
        <h4 class="not_black">${elem.title}</h4></div>
        `)
        indId = indId+1;
    })

      return movImg;
    
}




const fetchAndBuildAllSection = (category)=>{
    console.table(category);
}

const fetchTrendingSection = ()=>{
    var lst1;
    fetch(trendApi).then(res=>res.json()).then((res)=>{
        var trendImages = fetchMovieImages(res.results);
        console.log(trendImages);
         const html2 = `
         
         
         
        ${trendImages}
                
           `

        const div2 = document.createElement('div');
        div2.className = "images";
        div2.classList.add("catHead");
        div2.innerHTML = html2;
        movies_section.append(div2);
        lst1 =  res.results;
        console.log("Results: ",res.results[0]);
        buildBannerSection(res.results[0]);
        return lst1;
    })
    return lst1;
}

const buildBannerSection = (latest)=>{
    var bannerHeading = document.getElementsByClassName("bannerHeading");
    console.log("Latest: ",bannerHeading);
    bannerHeading[0].innerHTML = `${latest.title}`;
bannerSection.style.backgroundImage = `url('${imagePath}${latest.backdrop_path}')`
console.log("LST: ",`${imagePath}${latest.backdrop_path}`);
var bannerCont = document.getElementsByClassName("demo");
bannerCont[0].innerHTML = latest.overview;


}

const init = async ()=>{
  await  fetch(Api).then(res => res.json()).then((res) => {
    //console.log(res.genres)
   var latest =  fetchTrendingSection();
    fetchAndBuildAllSection(res.genres);
   // console.log(res.genres[0]);

    const movies = res.genres.map(elem => {
        getMoviesFromCategories(elem);
    }) 
    
    
     
    console.table("Yes: ",latest)
   })

}










window.addEventListener('load',()=>{
    init();
    
})

// window.addEventListener('scroll',()=>{
//     document.getElementById("header").style.backgroundColor = "Grey"
// })

window.addEventListener('scroll',()=>{
    console.log("True: ",window.pageYOffset);
    if(window.pageYOffset===0){
        
        document.getElementById("header").style.backgroundColor = "Transparent";
            }
    else if (window.pageYOffset!==0){
        console.log("Treu2");
        document.getElementById("header").style.backgroundColor = "Black";
    }
})

const checkScroll = ()=>{
    console.log("true: ",document.body.scrollTop) 
    
    return false;
} 