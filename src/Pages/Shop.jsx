import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Offers } from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import Popular from '../Components/Popular/Popular'

export const Shop = () => {
  return (
    <div>
     <Hero />
     <Popular />
     <Offers />
     <NewCollections />
    </div>
  )
}
