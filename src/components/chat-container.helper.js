export default (selector) => {
    const element = document.querySelector(selector);

    element.scrollTop = element.scrollHeight;
}   