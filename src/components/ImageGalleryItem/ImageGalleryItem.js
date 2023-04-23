import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ webformatURL, largeImageURL, onPics }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        onClick={onPics}
        src={webformatURL}
        alt=""
        data-link={largeImageURL}
      />
    </li>
  );
};
