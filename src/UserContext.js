
import { getSuggestedQuery } from '@testing-library/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {

  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const [teste, setTeste] = React.useState('');

  const userLogout = React.useCallback(async function () {

    setData(null);
    setError(null);
    setLoading(false);
    setLoading(false);
    window.localStorage.removeItem('token');
    navigate('/login')

  }, [navigate])

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    console.log(json);
  }

  async function userLogin(username, password) {

    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      console.log(tokenRes)
      // if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      if (!tokenRes.ok) throw new Error(`Error: Usuário Inválido!`);

      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta')
      // returnUser('Marcio')
    } catch (err) {

      setError(err.message);
      setLogin(false);
    } finally {

      setLoading(false);
    }
  }

  function returnUser(parametro) {
    setTeste(parametro)
  }

  React.useEffect(() => {

    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          const json = await response.json();

          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);

          console.log(json);

        } catch (err) {
          userLogout();

        } finally {
          setLoading(false);
        }
      }

    }
    autoLogin();
  }, [userLogout])

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, teste, error, loading, login }}>
      {children}
    </UserContext.Provider>
  )
}

