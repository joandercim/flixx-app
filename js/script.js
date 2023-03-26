const global = {
    currentPage: window.location.pathname
};

// Highlight active link
function highLightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')  
       }


        console.log(link.attributes[1].textContent)
    })
}

function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home');
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/tv-details.html':
            console.log('TV Show Details');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/search.html':
            console.log('Search Page');
            break;
    }
    
    highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);