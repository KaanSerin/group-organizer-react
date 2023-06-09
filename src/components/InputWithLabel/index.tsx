import styles from './index.module.scss';
import { FormControl, FormControlProps, FormLabel, InputGroup } from 'react-bootstrap';
import { ChangeEvent, FormEvent } from 'react';

export default function InputWithLabel({
  className,
  label,
  placeholder,
  type = 'text',
  name,
  onChange,
  value
}: {
  className: string;
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) {
  return (
    <div className={className}>
      <FormLabel className="fw-semibold">{label}</FormLabel>
      <InputGroup>
        <FormControl
          as={type === 'textarea' ? 'textarea' : 'input'}
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          className={styles.customInput}
          placeholder={placeholder}
        />
      </InputGroup>
    </div>
  );
}
