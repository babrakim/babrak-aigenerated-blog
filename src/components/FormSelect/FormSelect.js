import styles from './FormSelect.module.scss';

const FormSelect = ({ ...rest }) => {
  return (
    <select className={styles.formSelect} {...rest} ></select>
  );
};

export default FormSelect;
