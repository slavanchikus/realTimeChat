export const saveSelection = () => {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
};

export const pasteNodeAtCaret = (nodeName, savedRange, elementAtr, parentNode, htmlContent) => {
  const node = document.createElement(nodeName);
  if (elementAtr) {
    Object.keys(elementAtr).map((key, index) => (
            node.setAttribute(key, elementAtr[key])
        ));
  }
  if (htmlContent) {
    node.innerHTML = htmlContent;
  }
  if (parentNode) {
    parentNode.insertBefore(node, parentNode.firstChild);
  }
  if (savedRange) {
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRange);
    } else if (document.selection && savedRange.select) {
      savedRange.select();
    }
    if (window.getSelection) {
      savedRange.insertNode(node);
      savedRange.collapse(false);
    } else if (document.selection && document.selection.createRange) {
      savedRange.pasteHTML(node);
    }
    savedRange.setStartAfter(node);
    savedRange.setEndAfter(node);
  }
};

export const countLength = (element) => {
  let inputImgCount = element.innerHTML.match(/<img .*?>/g);
  const inputTextCount = !/^\s+$/.test(element.innerText) ? element.innerText.length : 0;
  inputImgCount = inputImgCount ? inputImgCount.length : 0;
  return inputTextCount + inputImgCount;
};

export const formatContent = (html) => {
  const textWithImg = html.match(/<img .*?>/g);
  let content = html.replace(/<span[^>]*>|<\/span[^>]*>/g, '').replace(/<br><\/?\w+?>\s*?(<\/?\w+?>)/g, '\n').replace(/(<\/?\w+?>)\s*?(<\/?\w+?>)|(<\/?\w+?>)/g, '\n');
  if (textWithImg) {
    textWithImg.map((item) => {
      const imgId = /id="([^"]+)"/.exec(item)[1];
      if (imgId && /!#[\w]*#/g.test(imgId)) {
        content = content.replace(item, imgId);
      }
    });
  }
  return content.trim();
};
