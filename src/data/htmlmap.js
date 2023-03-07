const htmlMap= (context) =>{
  return {
    "*": {
      "*": {
        "tagName": "span"
      },
      "sequence":{
        "tagName": "section"
      }
    },
    "wrapper": {
      "*": {
        "tagName": "wrapper"
      },
      "sequence":{
        "tagName": "section"
      }
    },
    "paragraph": {
      "*": {
        "tagName": "p"
      }
    },
    "mark": {
      "*": {
        "tagName": "span"
      },
      "chapter": ({ atts }) => { 
        context.lastChapter  = atts.number;
        return ({
        classList: ['mark', 'chapter', `chapter-${atts.number}`],
        id: `chapter-${atts.number}`,
        tagName: 'span'
      }) },
      "verses": ({ atts }) => ({
        classList: ['mark', 'verses', `verse-${atts.number}`],
        id: `ch${context.lastChapter}v${atts.number}`,
        tagName: "span",
        contentEditable: "false"
      })
    },
    "graft":{
      "heading": {
        "tagName": "div"
      },
      "title": {
        "tagName": "div"
      },
      "introduction": {
        "tagName": "div"
      }
    }
  }
}

export default htmlMap({});

