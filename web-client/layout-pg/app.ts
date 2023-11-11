import './fly-text/controller';

(function() {
    const options: IntersectionObserverInit = {
        // null means viewport
        root: null,
        rootMargin: '0px',
        threshold: [0.5]
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.anim').forEach(el => {
                    const htmlEl = <HTMLElement> el;
                    htmlEl.classList.add(htmlEl.dataset['animClass']!) ;
                    htmlEl.classList.remove(`anim-init`) ;
                    htmlEl.removeAttribute('data-anim-class')
                })
                observer.unobserve(entry.target)
            }
        })
    }, options)

    const animatedElements = document.querySelectorAll('main section');
    animatedElements.forEach((el) => {
        observer.observe(el)
    })
})()