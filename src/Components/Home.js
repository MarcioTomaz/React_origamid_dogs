import React from 'react'
import { UserContext } from '../UserContext'

const Home = () => {

  const usuario = React.useContext(UserContext);
  console.log(usuario)

  return (
    <div> <h1>{usuario.teste}</h1></div>
  )
}

export default Home