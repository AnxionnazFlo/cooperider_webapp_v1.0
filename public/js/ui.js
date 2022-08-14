// on scroll reduce the top nav
window.onscroll = function() { reduceTopNav() };

const reduceTopNav = () => {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        document.querySelector('#top_nav').classList.add('p-1');
        document.querySelector('#logo_img').classList.add('logo_min');
        document.querySelector('#top_nav').classList.add('top_nav_height_mini');
        document.querySelector('#logo_img').classList.remove('logo');
    } else {
        document.querySelector('#top_nav').classList.remove('p-1');
        document.querySelector('#logo_img').classList.add('logo');
        document.querySelector('#top_nav').classList.remove('top_nav_height_mini');
        document.querySelector('#logo_img').classList.remove('logo_min');
    }
}

// on media queries, unstick the top nav links

let media = window.matchMedia("(max-width: 980px)");
if (media.matches) {
    const topNav = document.querySelector('#top_nav');
    topNav.classList.remove('sticky-top');
} else {
    const topNav = document.querySelector('#top_nav');
    topNav.classList.add('sticky-top');
}


media.onchange = (e) => {
    if (e.matches) {
        const topNav = document.querySelector('#top_nav');
        topNav.classList.remove('sticky-top');
    } else {
        const topNav = document.querySelector('#top_nav');
        topNav.classList.add('sticky-top');
    }
}

let mediaMedium = matchMedia("(max-width: 1200px)");

if (mediaMedium.matches) {
    const liHidePoint = document.querySelector('#li_hide_point');
    liHidePoint.classList.remove('me-5');
    const liHideTracks = document.querySelector('#li_hide_tracks');
    liHideTracks.classList.remove('ms-5');
    const liNavButton = document.querySelectorAll('.li_nav_button');
    liNavButton.forEach(item => { item.classList.remove('mx-3'); });

} else {
    const liHidePoint = document.querySelector('#li_hide_point');
    liHidePoint.classList.add('me-5');
    const liHideTracks = document.querySelector('#li_hide_tracks');
    liHideTracks.classList.add('ms-5');
    const liNavButton = document.querySelectorAll('.li_nav_button');
    liNavButton.forEach(item => { item.classList.add('mx-3'); });

}

mediaMedium.onchange = (e) => {
    if (e.matches) {
        const liHidePoint = document.querySelector('#li_hide_point');
        liHidePoint.classList.remove('me-5');
        const liHideTracks = document.querySelector('#li_hide_tracks');
        liHideTracks.classList.remove('ms-5');
        const liNavButton = document.querySelectorAll('.li_nav_button');
        liNavButton.forEach(item => { item.classList.remove('mx-3'); });
    } else {
        const liHidePoint = document.querySelector('#li_hide_point');
        liHidePoint.classList.add('me-5');
        const liHideTracks = document.querySelector('#li_hide_tracks');
        liHideTracks.classList.add('ms-5');
        const liNavButton = document.querySelectorAll('.li_nav_button');
        liNavButton.forEach(item => { item.classList.add('mx-3'); });

    }
}