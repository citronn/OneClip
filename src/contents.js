console.log('came content.js');
let exclusiveURIs = [];
let exclusiveTags = []; //TODO validation: all elements must be lowercase

chrome.storage.local.get(function (exclusiveEntity) {
  console.log('came get storage in contentsjs', exclusiveEntity);
  !!exclusiveEntity.URIs && (exclusiveURIs = exclusiveEntity.URIs);
  !!exclusiveEntity.tags && (exclusiveTags = exclusiveEntity.tags);
});

const currentHostName = document.location.hostname;

let exclusizeHostNames = exclusiveURIs.map((url) => new URL(url).hostname);

!exclusizeHostNames.includes(currentHostName) &&
  document.addEventListener(
    'mousedown',
    function (event) {
      if (
        !exclusiveTags.includes(event.target.tagName.toLowerCase()) &&
        event.target.innerText // TODO To be considered: looks complicated and may be unnecessary
      ) {
        const dummyTag = document.createElement('p');
        const uid = 'one-clip_' + String(Date.now());
        dummyTag.id = uid;
        dummyTag.innerText = event.target.innerText;
        document.body.appendChild(dummyTag);

        const dummyTagSelector = document.querySelector('#' + uid),
          selection = window.getSelection(),
          range = document.createRange();
        range.selectNodeContents(dummyTagSelector);
        selection.removeAllRanges();
        selection.addRange(range);
        const succeeded = document.execCommand('copy');
        const tmpStyle = event.target.style;
        if (succeeded) {
          event.target.style.backgroundColor = 'rgb(130, 255, 130)';
          setTimeout(async function () {
            await (event.target.style = tmpStyle);
          }, 500);
        } else {
          alert('コピーが失敗しました!');
        }
        selection.removeAllRanges();
        document.body.removeChild(dummyTag);
      }
    },
    false
  );
