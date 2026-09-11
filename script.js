const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();
