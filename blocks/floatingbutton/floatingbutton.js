// export default function decorate(block) {
//   const cols = [...block.firstElementChild.children];
//   block.classList.add(`columns-${cols.length}-cols`);

//   // setup image columns
//   [...block.children].forEach((row) => {
//     [...row.children].forEach((col) => {
//       const btn = col.querySelector("a");
//       if (btn) {
//         const title = btn.textContent.trim(); // Get the text inside the button
//         const href = btn.getAttribute("href"); // Get the href attribute
//         const baseUrl = `${window.location.protocol}//${window.location.host}`;
//         console.log("Base URL:", baseUrl);
//         console.log("Title:", title);
//         console.log("Link:", href);
//       }
//     });
//   });
// }


export default function decorate(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);
  
    let floatingButtonCreated = false; // To ensure only one floating button is created
  
    // Setup image columns
    [...block.children].forEach((row) => {
      [...row.children].forEach((col) => {
        const btn = col.querySelector("a");
        if (btn && !floatingButtonCreated) {  // Only create one floating button
          const href = btn.getAttribute("href"); // Get the href attribute
          const baseUrl = `${window.location.protocol}//${window.location.host}`;
          const fullUrl = new URL(href, baseUrl); // Combine base URL and href
  
          console.log("Base URL:", baseUrl);
          console.log("Link:", fullUrl);
  
          // Create the floating button
          const floatingButton = document.createElement('div');
          floatingButton.classList.add('floating-button');
          
          // Create image element
          const img = document.createElement('img');
          
          img.src = '../../assets/images/chat.png'; // Set your image URL here
          img.alt = 'Floating Button'; // Add alternative text for the image
          img.style.width = '50px'; // Adjust the size of the image
          img.style.height = '50px'; // Adjust the size of the image
  
          // Wrap the image in the anchor tag for redirection
          const link = document.createElement('a');
          link.href = fullUrl;
          link.appendChild(img);
  
          // Add the link (with image) to the floating button
          floatingButton.appendChild(link);
  
          // Style the floating button
        //   floatingButton.style.position = 'fixed';
        //   floatingButton.style.bottom = '20px';
        //   floatingButton.style.right = '20px';
        //   floatingButton.style.padding = '10px';
        //   floatingButton.style.borderRadius = '50px';
        //   floatingButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        //   floatingButton.style.textAlign = 'center';
        //   floatingButton.style.zIndex = '1000';
  
          // Append floating button to the body
          document.body.appendChild(floatingButton);
  
          floatingButtonCreated = true; // Ensure only one floating button is created
        }
      });
    });
  }
  
  