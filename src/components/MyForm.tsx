import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "./Input";

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório').min(7, 'Nome deve ter no mínimo 7 caracteres'),
    email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: Yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormType = {
    name: string;
    lastName?: string;
    email: string;
    age?: number;
    password: string;
    phoneNumbers?: {
        number: string;
    }[];
};

const simulateRequest = async () => {
    const myPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Hello');
        }, 2000);
    });

    return myPromise;
}

function MyForm() {
    const { register, handleSubmit, formState, reset, control } = useForm<FormType>({
        mode: 'all',
        resolver: yupResolver(schema),
        /*defaultValues:{
            name: '',
            email: '',
            password: '',
        }*/
    });

    const { errors, isSubmitting } = formState;

    const { append, remove, fields } = useFieldArray({
        name: 'phoneNumbers',
        control,
    });

    const handleSubmitData = async (data: any) => {
        console.log(data);
        await simulateRequest();
        reset();
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome</label>
                <input
                    {...register('name')}
                    type="text"
                    className={`form-control ${errors.name ? 'border-danger' : 'border-success'}`}
                    id="name"
                    autoFocus
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="lastName">Sobrenome</label>
                <Input
                    {...register('lastName')}
                    className="form-control border-success"
                    id="lastName"
                    name="lastName"
                />
            </div>
            <div className="mb-3">
                <Controller
                    control={control}
                    name="age"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <input type='number'
                            onChange={onChange}
                            onBlur={() => {alert(value)}}
                            value={value}
                        />
                    )}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input {...register('email')} type="email" className={`form-control ${errors.email ? 'border-danger' : 'border-success'}`} id="email" />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
            <div className="mb-3">
                <label>List of phone number</label>
                <div>
                    {fields.map((field, index) => {
                        return (<div className="form-control d-flex" key={field.id}>
                            <input
                                type="text" {...register(`phoneNumbers.${index}.number` as const)}
                                className="form-control border-success"
                            />
                            {
                                index >= 0 && (
                                    <button className="btn btn-danger" onClick={() => remove(index)}>
                                        Remove
                                    </button>
                                )
                            }
                        </div>
                        )
                    })}
                    <button className="btn btn-secondary" onClick={() => append({ number: "" })}>Add Phone Number</button>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Senha</label>
                <input {...register('password')} type="password" className={`form-control ${errors.password ? 'border-danger' : 'border-success'}`} id="password" />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {`${isSubmitting ? 'Enviando...' : 'Gravar'} `}
            </button>
        </form>
    )
}

export default MyForm;