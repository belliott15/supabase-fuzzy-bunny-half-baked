import {  
    getFamilies, 
    checkAuth, 
    logout, 
    updateBunny, 
    oneBunny,
    deleteBunny
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const deleteBunnyButton = document.querySelector('#delete-button');

const params = new URLSearchParams(window.location.search);

form.addEventListener('submit', async e => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    const bunnyName = data.get('bunny-name');
    const familyID = data.get('family-id');
    // use createBunny to create a bunny with this name and family id
    await updateBunny(params.get('id'), bunnyName, familyID);
    form.reset();
    window.location.replace('../families');
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    const nameInput = document.querySelector('input'); 
    // grab the select HTML element from the DOM
    const dropdownEl = document.querySelector('select');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families){
    // create an option tag
        const optionEl = document.createElement('option'); 
    // set the option's value and text content
        optionEl.value = family.id;
        optionEl.textContent = family.name;
        const currentBunny = await oneBunny(params.get('id'));
        nameInput.value = currentBunny.name;

        if (family.id === currentBunny.family_id) {
            optionEl.selected = true;
        }
    // and append the option to the select
        dropdownEl.append(optionEl);
    }
});

deleteBunnyButton.addEventListener('click', async () => {
    await deleteBunny(params.get('id'));
    window.location.replace('../families');
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
