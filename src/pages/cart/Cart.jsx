import React from 'react'
import CartComponent from '../../components/cartComponent/CartComponent.jsx'
import NavBar from '../../components/navBar/NavBar.jsx'
import Footer from '../../components/footer/Footer'

export default function Cart() {
  return (
    <div>
      <NavBar />
      <h1>Página Cart</h1>
      <CartComponent/>
      <Footer />
    </div>
  )
}
