import styles from './index.module.scss';
import { FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { ChangeEvent } from 'react';

interface InputWithLabelProps {
  className?: string;
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  rows?: number;
}

export default function InputWithLabel({
  className,
  label,
  placeholder,
  type = 'text',
  name,
  onChange,
  value,
  disabled,
  rows
}: InputWithLabelProps) {
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
          disabled={disabled}
          // @ts-ignore
          rows={type === 'textarea' ? rows : undefined}
        />
      </InputGroup>
    </div>
  );
}
