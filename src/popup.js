console.log('came popupjs');
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
  console.log('came get storage in popupjs', exclusiveEntity);
  !!exclusiveEntity.URIs && (exclusiveURIs = exclusiveEntity.URIs);
  !!exclusiveEntity.tags && (exclusiveTags = exclusiveEntity.tags);
  const exclusiveURIsTableElement = generateExclusiveTable(exclusiveURIs);
  document
    .getElementById('exclusiveURIsBox')
    .appendChild(exclusiveURIsTableElement);

  const exclusiveTagsTableElement = generateExclusiveTable(exclusiveTags);
  document
    .getElementById('exclusiveTagsBox')
    .appendChild(exclusiveTagsTableElement);
});

chrome.storage.onChanged.addListener(() => {
  //TODO use async
  // notifiy need to reload page to load new settings
  // insert dom which have text 'please reload' and style 'red' in popup.html
});

document
  .getElementById('default-settings')
  .addEventListener('mousedown', function (event) {
    event.preventDefault();

    chrome.storage.local.set(defaultExclusiveDict, () =>
      console.log('set default')
    );
  });

function generateExclusiveTable(array) {
  const tableTag = document.createElement('table');

  array.map((element) => {
    const trTag = document.createElement('tr');

    // create <td> and append to <tr>
    const tdTag = document.createElement('td');
    tdTag.innerText = element;
    trTag.appendChild(tdTag);

    // create <button> and append to <tr>
    const buttonTag = document.createElement('button');
    buttonTag.id = element; //TODO array must not have duplication
    buttonTag.innerText = 'Remove';
    trTag.appendChild(buttonTag);

    tableTag.appendChild(trTag);
  });

  return tableTag;
}
