import { createOptimizedPicture } from "../../scripts/aem";

export default async function decorate(block) {
    await fetchData(block);
}

async function fetchData(block) {
    try {
        const response = await fetch('https://dummyjson.com/products');
        
        // Ensure the response is properly parsed as JSON
        const data = await response.json();

        // Here, you need to append the data to the block in a meaningful way
        // Assuming you want to display the products in the block
        data.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.textContent = `Product: ${product.title}, Price: $${product.price}`;
            block.appendChild(productElement);
        });

        console.log("productResponse--->", JSON.stringify(data));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
