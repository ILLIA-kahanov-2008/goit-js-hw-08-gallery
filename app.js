const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryList = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
let activeIndex = null;

function makeGalleryCards(items) {
  return items.map(({ preview, original, description }) => {
    return `<li class="gallery__item"><a class="gallery__link"
    href=${original}><img class="gallery__image" src=${preview}
      data-source=${original} alt=${description}/></a></li>`;
  }
  );
};

galleryList.insertAdjacentHTML('afterbegin', makeGalleryCards(galleryItems).join(''));

galleryList.addEventListener('click', onModalOpen);

function onModalOpen(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  };

  modal.classList.add('is-open');
  modalImage.src = event.target.dataset.source;

  makeGalleryCards(galleryItems).forEach((element, index) => {
    if (element.includes(event.target.src)) {
      activeIndex = index;
    }

    window.addEventListener('keydown', keyboardManipulation);
  });
}

  modal.addEventListener('click', onCloseModal);

  function onCloseModal(event) {
    if (event.target.nodeName === 'IMG') {
      return;
    }
    modalImage.src = '';
    modal.classList.remove('is-open');

    window.removeEventListener('keydown', keyboardManipulation);
  }

  function keyboardManipulation({ code }) {
    switch (code) {
      case galleryItems.length - 1 > activeIndex && "ArrowRight":
        activeIndex += 1;
        modalImage.src = galleryItems[activeIndex].original;
        break;
      case activeIndex > 0 && "ArrowLeft":
        activeIndex -= 1;
        modalImage.src = galleryItems[activeIndex].original;
        break;
      case activeIndex === galleryItems.length - 1 && "ArrowRight":
        activeIndex = 0;
        modalImage.src = galleryItems[activeIndex].original;
        break;
      case activeIndex === 0 && "ArrowLeft":
        activeIndex = galleryItems.length - 1;
        modalImage.src = galleryItems[activeIndex].original;
        break;
      case "Escape":
        onCloseModal(event);
        break;
      default:
        alert("only to use: ESC to exit and RIGHT (<-) or LEFT (->) arrow buttons to navigation");
    }
  }