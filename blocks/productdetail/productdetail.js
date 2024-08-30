export default async function decorate (block){
    await fetchDataFromUrl()
     console.log("functionData---->",JSON.stringify(window.location.search))
 }
 
 async function fetchDataFromUrl (){
     const urlParams = new URLSearchParams(window.location.search);
     const data = urlParams.get('detail');
     
     console.log('Data from query parameter:', data);
 }