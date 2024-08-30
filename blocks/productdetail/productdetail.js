export default async function decorate(block) {
  await fetchDataFromUrl(block);
  console.log("functionData---->", JSON.stringify(window.location.search));
}

async function fetchDataFromUrl(block) {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("detail");

    if (!data) {
        console.error("No data found in query parameters.");
        return;
    }

    let productData;
    try {
        productData = JSON.parse(data);
    } catch (e) {
        console.error("Error parsing JSON data:", e);
        return;
    }

    console.log("Data from query parameter:", productData);

    block.innerHTML = ""; // Clear existing content

    // Create the main container
    const div = document.createElement("div");
    
    const divImg = document.createElement("div")
    divImg.classList.add('img-div')
    // Create and add image
    const imgElement = document.createElement("img");
    imgElement.src = productData.thumbnail;
    imgElement.alt = productData.title;
    imgElement.classList.add("product-image");
    divImg.appendChild(imgElement);
    div.appendChild(divImg)

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

    const descriptionContainer = document.createElement("div");
    const description = document.createElement("p");
    description.classList.add("description");
    const descriptionTextNode = document.createTextNode(`${productData.description}`);
    description.appendChild(descriptionTextNode);
    descriptionContainer.appendChild(description);
    div.appendChild(descriptionContainer)

    // Append the complete structure to the block
    block.appendChild(div);
}


