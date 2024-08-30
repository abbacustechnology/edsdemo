import { createOptimizedPicture } from "../../scripts/aem";

export default async function decorate(block) {
    fetchData(block)
}

async function fetchData (block){
    const response = await fetch('https://dummyjson.com/products').then(response => response.clone.json())
    block.append(response)
    console.log("productResponse--->",JSON.stringify(response))
}