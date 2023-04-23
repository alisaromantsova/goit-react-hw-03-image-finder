import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

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

ImageGallery.propTypes = {
  pics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onPics: PropTypes.func.isRequired,
};
