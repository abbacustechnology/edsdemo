import { loadFragment } from '../fragment/fragment.js';
import { loadCSS } from '../../scripts/aem.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Setup image columns
  [...block.children].forEach((row, rowIndex) => {
    [...row.children].forEach((col, columnIndex) => {

      // Skip the second column in each row (index 1)
      if (columnIndex === 1) {
        // Hide all text content in this column
        const textElements = col.querySelectorAll('div, span, p'); // Add more selectors if needed
        textElements.forEach(textElem => {
          textElem.style.display = 'none'; // Hide text element
        });
        return; // Skip button creation for this column
      }

      // Process text content
      const textElements = col.querySelectorAll('div, span, p'); // Add more selectors if needed
      textElements.forEach(async (textElem) => {
        const secondDiv = row.children[1];
        const pTag = secondDiv.querySelector('p');
        console.log("rowIndex---->", pTag.textContent);
        console.log("columnIndex---->", col);
        console.log("textElement---->", textElem.textContent);
        
        const button = document.createElement('button');
        button.textContent = textElem.textContent;
        button.className = 'my-button';

        // Create the modal once and only once for this block
        const modal = await createModal(pTag.textContent); // Wait for modal to be created
        modal.classList.add('hidden'); // Initially hide the modal
        document.body.appendChild(modal); // Append modal to body once

        // Add an event listener for mouseenter to show the modal
        button.addEventListener('mouseenter', () => {
          const buttonRect = button.getBoundingClientRect();
          modal.style.top = `${buttonRect.bottom + window.scrollY}px`;
          modal.style.left = `${buttonRect.left}px`;
          modal.classList.remove('hidden'); // Show modal
          modal.classList.add('visible'); // Ensure it's visible
          console.log('mouse in');
        });

        // Add an event listener for mouseleave to hide the modal
        button.addEventListener('mouseleave', () => {
          modal.classList.remove('visible'); // Hide modal
          modal.classList.add('hidden');
          console.log('mouse out');
        });

        // Add the button to the container
        const container = document.querySelector('.hover-content'); // Ensure container exists
        if (container) {
          container.appendChild(button);
        } else {
          console.error('Container not found');
        }

        textElem.style.display = 'none'; // Hide original text element
      });
    });
  });
}

async function createModal(url) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  
  // Define the fragment URL (this can be dynamic or hardcoded)
  const fragmentUrl = url;
  
  // Extract the path from the URL
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  try {
    // Load the fragment content
    const fragment = await loadFragment(path);
    modalContent.append(...fragment.childNodes); // Append the fragment content to modal
  } catch (error) {
    console.error('Error loading fragment:', error);
    modalContent.textContent = 'Error loading content.';
  }

  modal.appendChild(modalContent);
  return modal;
}
