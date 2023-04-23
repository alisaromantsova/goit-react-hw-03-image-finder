import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ pics, onPics }) => {
  return (
    <ul className={css.ImageGallery}>
      {pics.map(pic => (
        <ImageGalleryItem
          key={pic.id}
          webformatURL={pic.webformatURL}
          largeImageURL={pic.largeImageURL}
          onPics={onPics}
        />
      ))}
    </ul>
  );
};
