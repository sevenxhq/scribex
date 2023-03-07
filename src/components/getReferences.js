export const getCurrentVerse = (currentNode) => {
  let currentVerse
  let prev = currentNode.previousElementSibling;
  while (prev) {
    if (prev.dataset.type === 'mark' && prev.dataset.subtype === 'verses') {
      currentVerse = prev.dataset.attsNumber
      break;
    }

    // Get the previous sibling
    prev = prev.previousElementSibling
  }
  return currentVerse
}

export const getCurrentChapter = (currentNode) => {
  let currentChapter
  const chapterElement = currentNode.parentElement.closest('.chapter')
  console.log({chapterElement})
  // if (accordionElement) {
  //   const headingElement = accordionElement.querySelector('.sectionHeading')
  //   if (headingElement) {
  //     currentChapter = headingElement.dataset.chapterNumber
  //   }
  // }
  // return currentChapter
}