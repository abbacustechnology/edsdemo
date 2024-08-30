// import { createOptimizedPicture } from "../../scripts/aem";

export default async function decorate(block) {
    await fetchData(block);
}

// async function fetchData(block) {
//     try {
//         // const response = await fetch('https://dummyjson.com/products');

//         const response = await fetch('https://dummyjson.com/products', {
//             // mode: 'no-cors',
//             method: 'GET',
//           });
        
//         // Ensure the response is properly parsed as JSON
//         const data = await response.json();

//         // Here, you need to append the data to the block in a meaningful way
//         // Assuming you want to display the products in the block
//         data.products.forEach(product => {
//             const productElement = document.createElement('div');
//             productElement.textContent = `Product: ${product.title}, Price: $${product.price}`;
//             block.appendChild(productElement);
//         });

//         console.log("productResponse--->", JSON.stringify(data));

//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// async function fetchData(block) {
//     try {
//         const response = await fetch('https://dummyjson.com/products');
//         const data = await response.json();

//         // Clear the block before appending new content
//         block.innerHTML = '';

//         // Create a list element to hold the product items
//         const listElement = document.createElement('ul');
//         listElement.classList.add('product-list');

//         // Iterate over the products and create list items
//         data.products.forEach(product => {
//             const listItem = document.createElement('li');
//             listItem.classList.add('product-item');

//             // Create an element for the product title
//             const titleElement = document.createElement('h2');
//             titleElement.textContent = product.title;
//             listItem.appendChild(titleElement);

//             // Optionally create an element for the product description
//             const descriptionElement = document.createElement('p');
//             descriptionElement.textContent = product.description;
//             listItem.appendChild(descriptionElement);

//             // Optionally create an element for the product price
//             const priceElement = document.createElement('span');
//             priceElement.textContent = `Price: $${product.price}`;
//             listItem.appendChild(priceElement);

//             // Optionally add a product image
//             if (product.thumbnail) {
//                 const imgElement = document.createElement('img');
//                 imgElement.src = product.thumbnail;
//                 imgElement.alt = product.title;
//                 listItem.appendChild(imgElement);
//             }

//             // Append the list item to the list element
//             listElement.appendChild(listItem);
//         });

//         // Append the list element to the block
//         block.appendChild(listElement);

//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }


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
                window.location.href = `https://main--edsdemo--abbacustechnology.hlx.live/product-detail?title=${product.title}`
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
