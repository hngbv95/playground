(function() {
    const menuButton = <HTMLButtonElement>document.querySelector('#menu-button');
    const nav = document.querySelector('#menu-nav');
    const menuButtonState = {
        isClose: true
    }

    function showMenu() {
        nav!.classList.add('show')
        menuButton.classList.add('show')
    }

    function hideMenu() {
        nav!.classList.remove('show')
        menuButton.classList.remove('show')
    }

    const btnProxy = new Proxy(menuButtonState, {
        set(target, p, newValue) {
            if (p !== 'isClose') {
                target[p] = newValue
                return true;
            }

            if (typeof newValue !== 'boolean') {
                throw new TypeError("isClose must be a boolean");
            }

            if (newValue) {
                hideMenu()
            } else {
                showMenu()
            }

            target[p] = newValue;
            return true;
        },
    })

    menuButton.addEventListener('click', (el) => {
        btnProxy.isClose = !btnProxy.isClose;
    })
})()