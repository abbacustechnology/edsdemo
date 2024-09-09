export default async function decorate(block) {
  createButton(block);
}

function createButton(block) {
  const div = document.createElement('div');
  const button = document.createElement('button');
  const modal = createModal(); // Create the modal

  // Set the button's text content
  button.textContent = 'Hover Me';

  // Add class for styling
  button.classList.add('trigger-button');

  // Append the button and modal to the div and block
  div.appendChild(button);
  div.appendChild(modal);
  block.appendChild(div);

  // Add event listeners for hover
  button.addEventListener('mouseover', () => {
    console.log("Button hovered");
    modal.classList.add('visible'); // Show modal on hover
  });

  button.addEventListener('mouseout', () => {
    console.log("Button not hovered");
    modal.classList.remove('visible'); // Hide modal when not hovering
  });
}

function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.textContent = 'This is a modal!'; // Modal content

  // const closeButton = document.createElement('button');
  // closeButton.classList.add('close-button');
  // closeButton.textContent = '×'; // Close button

  // closeButton.addEventListener('click', () => {
  //   modal.classList.remove('visible');
  // });

  // modal.appendChild(closeButton);
  modal.appendChild(modalContent);

  return modal;
}
