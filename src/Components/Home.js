import React from 'react'
import { UserContext } from '../UserContext'
import Feed from './Feed/Feed'
import Head from './Helper/Head';

const Home = () => {

  const usuario = React.useContext(UserContext);
  console.log(usuario)

  return (
    <section className="container mainContainer"> 
      <Head title="Fotos" description="Home do site dogs com fotos"/>      
      <Feed />
    </section>
  )
}

export default Home