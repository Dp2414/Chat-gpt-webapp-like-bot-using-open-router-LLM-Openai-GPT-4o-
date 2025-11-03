import React from 'react'

const NavBar = () => {
  return (
    <div className="flex justify-start items-start gap-2 p-2 h-[10%]">
      <img src="../public/logo.webp" alt="" className="w-[50px]" />
      <div className="text-white text-xl">
        <h3>Text Writer</h3>
        <p className="text-gray-500 text-sm">Ask Me Anything</p>
      </div>
    </div>
  );
}

export default NavBar
