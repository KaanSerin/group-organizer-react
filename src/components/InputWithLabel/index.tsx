import styles from './index.module.scss';
import {FormControl, FormLabel, InputGroup} from "react-bootstrap";

export default function InputWithLabel({
                                           className,
                                           label,
                                           placeholder
                                       }: { className: string, label: string, placeholder: string }) {
    return (
        <div className={className}>
            <FormLabel className="fw-semibold">{label}</FormLabel>
            <InputGroup>
                <FormControl className={styles.customInput} placeholder={placeholder}/>
            </InputGroup>
        </div>
    )
}