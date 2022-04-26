function scrollToTop() {
  let currentScroll = document.documentElement.scrollTop;
  const timer = setInterval(() => {
    if (currentScroll <= 0) {
      clearTimeout(timer);
    }
    window.scrollTo(0, currentScroll -= 70);
  }, 10);
}

export default scrollToTop;
