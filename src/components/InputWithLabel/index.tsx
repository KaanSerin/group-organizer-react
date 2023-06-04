import styles from './index.module.scss';
import {FormControl, FormLabel, InputGroup} from "react-bootstrap";

export default function InputWithLabel({
                                           className,
                                           label,
                                           placeholder,
                                           type = "text",
                                       }: { className: string, label: string, placeholder: string, type?: string }) {
    return (
        <div className={className}>
            <FormLabel className="fw-semibold">{label}</FormLabel>
            <InputGroup>
                <FormControl type={type} className={styles.customInput} placeholder={placeholder}/>
            </InputGroup>
        </div>
    )
}