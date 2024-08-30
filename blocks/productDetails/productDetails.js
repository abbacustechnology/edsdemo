export default async function decorate (block){
   await fetchDataFromUrl(block)
    console.log("functionData---->",JSON.stringify(block))
}

async function fetchDataFromUrl (block){
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('product-detail');
    
    console.log('Data from query parameter:', data);
}