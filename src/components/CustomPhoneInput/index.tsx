import styles from './index.module.scss';
import PhoneInput from 'react-phone-number-input';
import { FormLabel } from 'react-bootstrap';

export default function CustomPhoneInput({
  className,
  label,
  phone,
  onFormDataChange
}: {
  className?: string;
  label: string;
  phone: string;
  onFormDataChange: any;
}) {
  return (
    <div className={[styles.countryPhoneInputContainer, className].join(' ')}>
      <FormLabel className={styles.phoneInputLabel}>{label}</FormLabel>
      <PhoneInput className={styles.countryPhoneInput} value={phone} onChange={onFormDataChange} />
    </div>
  );
}
