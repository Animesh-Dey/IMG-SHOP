const auth="563492ad6f9170000100000186aee832d60c457b9b439555271a0435";
const next=document.querySelector(".next");
const input=document.querySelector("input");
const searchButton=document.querySelector(".searchbutton");

let pageno=1;
let search=false;
let query="";

input.addEventListener("input",(e)=>{
    e.preventDefault();
    console.log(e.target.value);
    query=e.target.value;

});
async function createPhotos(pageno)
{
    const data=await fetch(`https://api.pexels.com/v1/curated?per_page=50&page=${pageno}`,{
        method:"GET",
        headers:{
         Accept:"application/json",
         Authorization:auth,
        },
    });

    const result=await data.json();
    //  console.log(result);
    result.photos.forEach(photo => {
        const pic=document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}
        <p>Photo : ${photo.photographer}</p>
        <a href=${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

async function searchPhotos(query,pageno)
{
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=50&page=${pageno}`,{
        method:"GET",
        headers:{
         Accept:"application/json",
         Authorization:auth,
        },
    });

    const result=await data.json();
    //  console.log(result);
    result.photos.forEach(photo => {
        const pic=document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}
        <p>Photo : ${photo.photographer}</p>
        <a href=${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}
searchButton.addEventListener("click",()=>{
    if(input.value==="") return;
    clear();
    search=true;
    searchPhotos(query,pageno);
})
function clear()
{
    input.value="";
    document.querySelector(".gallery").innerHTML="";
    pageno=1;
}
next.addEventListener("click",()=>{
   if(!search)
   {
       pageno++;
       createPhotos(pageno);
   }
   else{
       if(query.value==="") return;
       pageno++;
       searchPhotos(query,pageno);
   }
});
createPhotos(pageno);