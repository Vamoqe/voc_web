const form = document.getElementById('word-form');
const input = document.getElementById('word-input');
const tableBody = document.querySelector('#word-table tbody');

let words = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();
  
  if (inputValue) {
    // Check if the word already exists
    const existingWordIndex = words.findIndex(word => word === inputValue);
    
    if (existingWordIndex === -1) {
      // If it's a new word, add it to the list
      words.push(inputValue);
    } else {
      // If the word already exists, update it
      words[existingWordIndex] = inputValue;
    }

    // Clear the input box and render the table
    input.value = '';
    renderTable();
  }
});

function renderTable() {
  tableBody.innerHTML = '';

  words.forEach((word, index) => {
    const row = document.createElement('tr');
    const indexCell = document.createElement('td');
    const wordCell = document.createElement('td');
    const editCell = document.createElement('td');
    const editButton = document.createElement('button');

    indexCell.textContent = index + 1;
    wordCell.textContent = word;
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newWord = prompt(`Edit word #${index + 1}`, word);
      
      if (newWord && newWord !== word) {
        words[index] = newWord.trim();
        renderTable();
      }
    });

    row.appendChild(indexCell);
    row.appendChild(wordCell);
    editCell.appendChild(editButton);
    row.appendChild(editCell);
    tableBody.appendChild(row);
  });
}

// Render the table on page load
renderTable();
