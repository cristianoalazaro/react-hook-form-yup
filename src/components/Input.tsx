import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ type, id, name, ...props }: InputProps, ref: any ) {
        return (
            <>
                <input
                    type={type}
                    className={props.className}
                    id={id}
                    name={name}
                    ref={ref}
                    {...props}
                />
            </>
        )
    }

export default forwardRef(Input);