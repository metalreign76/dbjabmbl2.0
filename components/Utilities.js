import moment from 'moment';

export function decode(stringToDecode) {

    return stringToDecode
        .replace('&#038;', '&')
        .replace('&amp;', '&')
        .replace('&#8216;', '"')
        .replace('&#8217;', '"')
}

export function extractImage(postContent) {
    if(postContent.indexOf('<img ') == -1) return postContent;
    var firstImageLoc=postContent.indexOf('<img ')
    var firstSrcLoc=postContent.indexOf(' src=\"', firstImageLoc)
    var endOfSrcLoc=postContent.indexOf('\" ', firstSrcLoc+8);
    var imageURI = postContent.substring(firstSrcLoc+6, endOfSrcLoc);
    return imageURI;
}

export function removeImageSizes(fullPost) {
    var removeWidths = fullPost.replace(/width="[0-9]{2,4}" /g, "")
    var removeHeights = removeWidths.replace(/height="[0-9]{2,4}"/g, "")
    var removeSizes = removeHeights.replace(/sizes=".*"/g, "sizes=\"(max-width: 300px) 80vw\"")
    var removeFigures = removeSizes.replace(/<figure class=".*">/g, "")
    var removeFigures2 = removeFigures.replace(/<figure>/g, "")
    return removeFigures2;
  }
  
  export function findEarliestGigDate(gigsArray) {
    let earliestDate = '2099-01-01';
    let maybeEarlier = earliestDate;
    gigsArray.forEach((gig) => {
        maybeEarlier = moment(gig.startTime, 'X').format('YYYY-MM-DD')
         if(maybeEarlier < earliestDate)
         earliestDate = maybeEarlier; 
    })
    return earliestDate;
  }