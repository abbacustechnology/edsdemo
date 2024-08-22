export default function decorate(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);
  
    // Setup image columns and rows
    [...block.children].forEach((row) => {
      row.classList.add('row'); // Ensure this class is added
  
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          if (picWrapper && picWrapper.children.length === 1) {
            // Picture is the only content in the column
            picWrapper.classList.add('columns-img-col');
          }
        }
      });
    });
  }
  