import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryRef = document.querySelector('.gallery');
insertGalleryMarkup(createGalleryMarkup(galleryItems));

function createGalleryMarkup(arrayItems) {
    return arrayItems.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                loading = "lazy"
                alt="${description}"
                />
            </a>
        </div>`;
})
        .join('');
}

function insertGalleryMarkup(galleryMarkup) {
    galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
}

galleryRef.addEventListener('click', openImg);

function openImg(event) {
    event.preventDefault();

    const originalImg = event.target.dataset.source;
    if (!originalImg) {
        return;
    }

    const instance = createModal(originalImg);
    instance.show();

    if (basicLightbox.visible()) {
        document.addEventListener('keydown', closeModal);
    }
    function closeModal(event) {
        if (event.code === 'Escape') {
        instance.close();
        document.removeEventListener('keydown', closeModal);
        }
    }

    function createModal(linkOfImg) {
       return basicLightbox.create(`<img src="${linkOfImg}">`); 
    }
        
    
}



