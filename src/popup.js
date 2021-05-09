// console.log('came popupjs');
const defaultExclusiveURIs = ['https://www.google.com/'];
const defaultExclusiveTags = [
  'a',
  'area',
  'form',
  'input',
  'select',
  'option',
  'textarea',
  'button',
];

const defaultExclusiveDict = {
  URIs: defaultExclusiveURIs,
  tags: defaultExclusiveTags,
};

let exclusiveURIs = [];
let exclusiveTags = [];
chrome.storage.local.get(function (exclusiveEntity) {
  // console.log('came get storage in popupjs', exclusiveEntity);
  !!exclusiveEntity.URIs && (exclusiveURIs = exclusiveEntity.URIs);
  !!exclusiveEntity.tags && (exclusiveTags = exclusiveEntity.tags);
  const exclusiveURIsTableElement = generateExclusiveTable(exclusiveURIs);
  document
    .getElementById('exclusiveURIsBox')
    .appendChild(exclusiveURIsTableElement);

  const inputElementForURI = document.getElementsByTagName('input')[0];
  inputElementForURI.placeholder = 'https://example.com/';

  const exclusiveTagsTableElement = generateExclusiveTable(exclusiveTags);
  document
    .getElementById('exclusiveTagsBox')
    .appendChild(exclusiveTagsTableElement);

  const inputElementForTag = document.getElementsByTagName('input')[1];
  inputElementForTag.placeholder = 'Please enter HTML tag';

  document.querySelectorAll('.btn').forEach((btnElement) => {
    btnElement.addEventListener('click', function (event) {
      // console.log(event.target);
      if (event.target.innerText === 'Remove') {
        const removedElement = event.target.id;
        exclusiveURIs = exclusiveURIs.filter((url) => url != removedElement);
        exclusiveTags = exclusiveTags.filter((tag) => tag != removedElement);
      }
      if (event.target.innerText === 'Add') {
        Array.from(document.getElementsByTagName('input')).forEach(
          (element) => {
            if (element.value != '') {
              let isAddedURIs = !!element.closest('#exclusiveURIsBox');
              if (isAddedURIs) {
                exclusiveURIs.push(element.value);
              } else exclusiveTags.push(element.value);
            }
          }
        );
      }
      let exclusiveDict = { URIs: exclusiveURIs, tags: exclusiveTags };
      // console.log(exclusiveDict);
      chrome.storage.local.set(exclusiveDict, () => location.reload()); // TODO want to rewrite using async await
    });
  });
});

document
  .getElementById('default-settings')
  .addEventListener('mousedown', function (event) {
    event.preventDefault();

    chrome.storage.local.set(defaultExclusiveDict, () => location.reload()); // TODO use async
  });

function generateExclusiveTable(array) {
  const tableTag = document.createElement('table');

  const trTagForThead = document.createElement('tr');
  const thDataTag = document.createElement('th');
  thDataTag.style = 'width:218px';
  trTagForThead.appendChild(thDataTag);

  const thButtonTag = document.createElement('th');
  trTagForThead.appendChild(thButtonTag);

  tableTag.appendChild(trTagForThead);

  array.map((element) => {
    //TODO it is better use foreach
    const trTag = document.createElement('tr');

    // create <td> and append to <tr>
    const tdTag = document.createElement('td');
    tdTag.innerText = element;
    trTag.appendChild(tdTag);

    // create <button> and append to <tr>
    const buttonTag = document.createElement('button');
    buttonTag.type = 'button'; // need to prevent default type 'submit' which runs page reload
    buttonTag.id = element; //TODO array must not have duplication
    buttonTag.className = 'btn';
    buttonTag.innerText = 'Remove';
    trTag.appendChild(buttonTag);

    tableTag.appendChild(trTag);
  });
  const trTag = document.createElement('tr');

  // create <td> and append to <tr>
  const tdTag = document.createElement('td');
  const inputTag = document.createElement('input');
  // inputTag.type = 'text';
  tdTag.appendChild(inputTag);
  trTag.appendChild(tdTag);

  // create <button> and append to <tr>
  const buttonTag = document.createElement('button');
  buttonTag.type = 'button'; // need to prevent default type 'submit' which runs page reload
  buttonTag.className = 'btn';
  buttonTag.innerText = 'Add';
  trTag.appendChild(buttonTag);

  tableTag.appendChild(trTag);

  return tableTag;
}
