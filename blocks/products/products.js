// import { createOptimizedPicture } from "../../scripts/aem";

export default async function decorate(block) {
    await fetchData(block);
}
async function fetchData(block) {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        // Clear the block before appending new content
        block.innerHTML = '';

        // Create a table element
        const table = document.createElement('table');
        table.classList.add('product-table');

        // Create the table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Image', 'Title', 'Description', 'Price','Action'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create the table body
        const tbody = document.createElement('tbody');

        // Iterate over the products and create table rows
        data.products.forEach(product => {
            const row = document.createElement('tr');

            // Product Image
            const imgCell = document.createElement('td');
            if (product.thumbnail) {
                const imgElement = document.createElement('img');
                imgElement.src = product.thumbnail;
                imgElement.alt = product.title;
                imgElement.classList.add('product-image');
                imgCell.appendChild(imgElement);
            }
            row.appendChild(imgCell);

            // Product Title
            const titleCell = document.createElement('td');
            titleCell.textContent = product.title;
            row.appendChild(titleCell);

        

            // Product Description
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = product.description;
            row.appendChild(descriptionCell);

            // Product Price
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${product.price}`;
            row.appendChild(priceCell);

               // Button

               const actionCell = document.createElement('td');
               const button = document.createElement('button');
               button.textContent = 'View Details'; // Button text
               button.onclick = () => {
                window.location.href = `https://main--edsdemo--abbacustechnology.hlx.live/product-detail?detail=${JSON.stringify(product)}`
               };
               actionCell.appendChild(button)
               row.appendChild(actionCell);

            // Append the row to the table body
            tbody.appendChild(row);

             

        });



        // Append the table body to the table
        table.appendChild(tbody);

        // Append the table to the block
        block.appendChild(table);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
