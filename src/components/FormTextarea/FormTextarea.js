import styles from './FormTextarea.module.scss';

const FormTextarea = ({ ...rest }) => {
  return (
    <textarea className={styles.formTextarea} {...rest} ></textarea>
  );
};

export default FormTextarea;
