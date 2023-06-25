import React from 'react';
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='w-38 object-contain' />
        <button 
          type='button' 
          onClick={() => {}}
          className='black_btn'
        >
          Login
        </button>
      </nav>
      <h1 className='head_text'>
        Summarize articles with <br className='max-md:hidden' />
        <span className='orange_gradient'>Open AI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading experience with Sumz and get the gist of any article in a few seconds.
      </h2>
    </header>
  )
}

export default Hero;