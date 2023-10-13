import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "./Input";

/*const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório').min(7, 'Nome deve ter no mínimo 7 caracteres'),
    email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: Yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
});*/

type FormType = {
    name: string;
    lastName?: string;
    email: string;
    password: string;
};

const simulateRequest = async () => {
    const myPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Hello');
        },2000);
    });

    return myPromise;
}

function MyForm2() {
    const { register, handleSubmit, formState, reset, control } = useForm<FormType>({
        mode: 'all',
        //resolver: yupResolver(schema),
        /*defaultValues:{
            name: '',
            email: '',
            password: '',
        }*/
    });

    const { errors, isSubmitting } = formState;
    const { onChange } = register('name');

    const handleSubmitData = async (data: FormType) => {
        console.log(data);
        await simulateRequest();
        reset();
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome</label>
                <input 
                    {...register('name', {required: 'Campo requerido'})} 
                    type="text" 
                    className={`form-control ${errors.name ? 'border-danger':'border-success'}`} 
                    id="name"
                    autoFocus 
                />
                {errors.name && <p style={{color: 'red'}}>{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="lastName">Sobrenome</label>
                <Input 
                    {...register('lastName', {
                        validate: (fieldValue) => {
                            return (fieldValue !== "Ap Lázaro" || "Enter a different lastname");
                        }
                    })}
                    className="form-control border-success"
                    id="lastName"
                    name="lastName"
                />
                {errors.lastName && <p style={{color: 'red'}}>{errors.lastName.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input {...register('email')} type="email" className={`form-control ${errors.email ? 'border-danger':'border-success'}`} id="email" />
                {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Senha</label>
                <input {...register('password')} type="password" className={`form-control ${errors.password ? 'border-danger':'border-success'}`} id="password" />
                {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {`${isSubmitting ? 'Enviando...' : 'Gravar'} `}
            </button>
        </form>
    )
}

export default MyForm2;