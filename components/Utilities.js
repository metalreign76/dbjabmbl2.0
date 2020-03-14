export function decode(stringToDecode) {

    return stringToDecode
        .replace('&#038;', '&')
        .replace('&amp;', '&')
}

export function extractImage(postContent) {
    if(postContent.indexOf('<img ') == -1) return postContent;
    var firstImageLoc=postContent.indexOf('<img ')
    var firstSrcLoc=postContent.indexOf(' src=\"', firstImageLoc)
    var endOfSrcLoc=postContent.indexOf('\" ', firstSrcLoc+8);
    var imageURI = postContent.substring(firstSrcLoc+6, endOfSrcLoc);
    return imageURI;
  }
  