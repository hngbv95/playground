const changer = document.getElementById('change-state');
const area = document.getElementById('grid-transit-area');

changer.addEventListener('input', (e: any) => {
    console.log(e, e.target.innerHTML)
    area.setAttribute('state', e.target.value)
})