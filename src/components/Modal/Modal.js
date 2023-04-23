import css from './Modal.module.css';
export const Modal = ({ img, close }) => {
  return (
    <div className={css.Overlay} onClick={close}>
      <div className={css.Modal}>
        <img src={img} alt="" />
      </div>
    </div>
  );
};
