const sw = document.getElementById("theme");
const root = document.documentElement;

let lastClick: MouseEvent | TouchEvent | any

document.addEventListener('click', e => {
    lastClick = e;
})

document.addEventListener('touchstart', e => {
    lastClick = e;
})

sw.addEventListener('input', (e: any) => {
    setTheme(e.target.value);
})

function setTheme(theme) {
    const x = lastClick.clientX ?? lastClick.touches[0].clientX;
    const y = lastClick.clientY ?? lastClick.touches[0].clientY;
    const radius = Math.hypot(innerWidth, innerHeight);

    if (!document.startViewTransition) {
        root.setAttribute('color-scheme', theme);
        return;
    }

    const transition = document.startViewTransition(() => {
        root.setAttribute('color-scheme', theme);
    })

    transition.ready.then(() => {
        root.animate(
            {
                clipPath: [
                    `circle(0 at ${x}px ${y}px)`,
                    `circle(${radius}px at ${x}px ${y}px)`,
                ]
            },
            {
                duration: 500,
                easing: 'ease-in',
                // Just target the new rendered layer
                pseudoElement: '::view-transition-new(root)'
            }
        )
    })    
}