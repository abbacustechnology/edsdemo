export default async function decorate(block) {
  await fetchDataFromUrl(block);
  console.log("functionData---->", JSON.stringify(window.location.search));
}

async function fetchDataFromUrl(block) {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("detail");

    // If no data is found in the query parameters, display a "No details found" message
    if (!data) {
        displayNoDetailsFound(block);
        return;
    }

    let productData;
    try {
        productData = JSON.parse(data);
    } catch (e) {
        console.error("Error parsing JSON data:", e);
        displayNoDetailsFound(block);
        return;
    }

    console.log("Data from query parameter:", productData);

    block.innerHTML = ""; // Clear existing content

    // Create the main container
    const div = document.createElement("div");

    // Create a div for the image
    const divImg = document.createElement("div");
    divImg.classList.add("img-div");

    // Create and add the product image
    const imgElement = document.createElement("img");
    imgElement.src = productData.thumbnail;
    imgElement.alt = productData.title;
    imgElement.classList.add("product-image");
    divImg.appendChild(imgElement);
    div.appendChild(divImg);

    // Create container for title and price
    const textContainer = document.createElement("div");
    textContainer.classList.add("div1");

    // Create and add product title
    const titleParagraph = document.createElement("h3");
    titleParagraph.classList.add("header");
    const titleTextNode = document.createTextNode(productData.title);
    titleParagraph.appendChild(titleTextNode);
    textContainer.appendChild(titleParagraph);

    // Create and add product price
    const priceParagraph = document.createElement("h3");
    priceParagraph.classList.add("header");
    const priceTextNode = document.createTextNode(`$${productData.price}`);
    priceParagraph.appendChild(priceTextNode);
    textContainer.appendChild(priceParagraph);
    div.appendChild(textContainer);

    // Create and add product description
    const descriptionContainer = document.createElement("div");
    const description = document.createElement("p");
    description.classList.add("description");
    const descriptionTextNode = document.createTextNode(productData.description);
    description.appendChild(descriptionTextNode);
    descriptionContainer.appendChild(description);
    div.appendChild(descriptionContainer);

    // Append the complete structure to the block
    block.appendChild(div);
}

// Function to display a "No details found" message
function displayNoDetailsFound(block) {
    block.innerHTML = ""; // Clear existing content

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("no-details-img");
    // Create the img element
    const imgElement = document.createElement("img");
    
    // Set the src attribute to the path of the local image
    imgElement.src = "../../assets/images/no_data.png"; // Adjust the path based on your directory structure
    imgElement.alt = "Example Image";
    
    // Append the image to the container
    imgContainer.appendChild(imgElement);
    
    // Append the container to the block
    block.appendChild(imgContainer);

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("no-details");

    const message = document.createElement("p");
    message.textContent = "No Product Details found";
    messageContainer.appendChild(message);

    block.appendChild(messageContainer);
}


