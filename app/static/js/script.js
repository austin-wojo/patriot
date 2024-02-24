document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navUL = document.querySelector('#main-nav ul');
  
    hamburger.addEventListener('click', () => {
      navUL.classList.toggle('active');
    });
  });