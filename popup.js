document.addEventListener(
  'click',
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
      if (succeeded) {
        alert('コピーが成功しました！');
      } else {
        alert('コピーが失敗しました!');
      }
      selection.removeAllRanges();
      document.body.removeChild(dummyTag);
    }
  },
  false
);
