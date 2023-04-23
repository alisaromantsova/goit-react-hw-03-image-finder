import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ img, close }) => {
  return (
    <div className={css.Overlay} onClick={close}>
      <div className={css.Modal}>
        <img src={img} alt="" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  img: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
