import React from 'react'
import { UserContext } from '../UserContext'
import Feed from './Feed/Feed'

const Home = () => {

  const usuario = React.useContext(UserContext);
  console.log(usuario)

  return (
    <section className="container mainContainer"> 
      <Feed />
    </section>
  )
}

export default Home