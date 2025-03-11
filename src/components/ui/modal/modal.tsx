import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal} data-id="modal">
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
<<<<<<< HEAD
          <button className={styles.button} type='button' data-cy="closeIcon">
            <CloseIcon type='primary' onClick={onClose} data-cy="closeIcon"/>
=======
          <button className={styles.button} type='button' data-cy="close_icon">
            <CloseIcon type='primary' onClick={onClose} data-cy="close_icon"/>
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
