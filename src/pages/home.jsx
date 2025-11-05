import React from 'react'
import Navbar from '../components/navbar'
import bg0 from "../assets/bg0.gif"
import { category } from '../category'

const Home = () => {
  return (
    <div className="bg-gray-50">
      
      {/* Hero Section*/}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bg0} alt="Hero" className='w-full h-full object-cover'/>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/70 to-slate-900/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Discover Amazing Products
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
              Shop the latest trends with exclusive deals and fast delivery. Your perfect find is just a click away.
            </p>
            <div className="flex gap-4">
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Shop Now
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Category Section*/}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold mb-3">
            Shop By Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our curated collections and find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {category.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-slate-300 transform hover:-translate-y-2"
            >
              <div className="bg-gray-50 rounded-xl p-4 mb-4 group-hover:bg-slate-50 transition-colors duration-300 flex items-center justify-center h-32">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-gray-900 font-semibold text-center text-sm group-hover:text-slate-700 transition-colors duration-300">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home
