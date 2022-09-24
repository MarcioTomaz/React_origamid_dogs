import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';

const LoginForm = () => {

  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleLogin(event) {
    event.preventDefault();
    if (username.validate() && password.validate());
    userLogin(username.value, password.value)
  }

  return (
    <section>

      <h1>Login</h1>
      <form action="" onSubmit={handleLogin}>

        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />

        {loading ?
          (<Button disabled>Carregando...</Button>)
          :
          (<Button >Entrar</Button>)
        }

        {error && <p className="text-danger">{error}</p>}
      </form>

      <Link to="/login/criar" >Cadastro</Link>
    </section>
  )
}

export default LoginForm