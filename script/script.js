function scrollToTop (duration) {
    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;

    const cosParameter = document.scrollingElement.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollCount will be Infinity
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}


function scrollToElement(elementId, duration) {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
    }

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = document.scrollingElement.scrollTop;
    const distance = targetPosition - startPosition;
    const cosParameter = distance / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step(newTimestamp) {
        if (oldTimestamp !== null) {
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) {
                return (document.scrollingElement.scrollTop = targetPosition);
            }
            document.scrollingElement.scrollTop = startPosition + cosParameter - cosParameter * Math.cos(scrollCount);
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
}
