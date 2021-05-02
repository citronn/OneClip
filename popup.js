document.addEventListener(
  'mousedown',
  function (event) {
    if (event.target.tagName.toLowerCase != 'a') {
      const dummyTag = document.createElement('p');
      const uid = 'one-clip_' + String(Date.now());
      dummyTag.id = uid;
      dummyTag.innerText = event.target.innerText;
      document.body.appendChild(dummyTag);

      const element = document.querySelector('#' + uid),
        selection = window.getSelection(),
        range = document.createRange();
      range.selectNodeContents(element);
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
