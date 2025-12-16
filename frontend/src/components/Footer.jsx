import React from 'react'
import logo from "../assets/logo.png"
function Footer() {
  return (
    <div className='w-full overflow-hidden md:h-[36vh] h-[21vh] lg:mb-0 mb-[77px] text-gray-600 md:mb-[77px]'>
        <div className='w-full md:h-[30vh] h-[15vh] py-5 md:mb-0 bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[3px]'>
            <div className='md:w-[30%] w-[10%] h-full flex items-start justify-center flex-col gap-[5px]  '>
                <div className='flex items-start justify-start gap-[5px] mt-2.5 md:mt-10'>
                    <img src={logo} alt=""  className='md:w-10 md:h-10 w-[30px] h-[30px]'/>
                    <p className='text-[19px] hidden md:block md:text-[20px] text-[black] font-semibold'>SmartCart</p>
            
                </div>
                <p className='text-[15px]  hidden md:block'>SmartCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals backed by trusted service designed to make your life easier every day.</p>
                {/* <p className='text-[15px] text-[#1e2223] flex md:hidden'>Fast. Easy. Reliable. OneCart Shopping</p> */}

                
            </div>
            <div className='md:w-[25%] w-[40%] h-full flex items-center justify-center flex-col text-center'>
                    <div className='flex items-center justify-center gap-[5px] mt-2.5 md:mt-10'>
                        <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans font-semibold '>COMPANY</p>

                    </div>
                    <ul>
                         <li className='text-[15px] hidden md:block cursor-pointer'>Home</li>
                        <li className='text-[15px] cursor-pointer '>About us</li>
                        <li className='text-[15px] hidden md:block cursor-pointer'>Delivery</li>
                        <li className='text-[15px] cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                <div className='md:w-[25%] w-[40%]  h-full flex items-center justify-center flex-col text-center '>
                     <div className='flex items-center justify-center gap-[5px] mt-2.5 md:mt-10'>
                        <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans font-semibold'>GET IN TOUCH</p>

                    </div>
                     <ul>
                         <li className='text-[15px] '>+91-9119001283</li>
                        <li className='text-[15px] '>sc@smartcart.com</li>
                        <li className='text-[15px] hidden md:block'>+1-000-000-0000</li>
                        <li className='text-[15px] hidden md:block'>admin@onecart.com</li>
                    </ul>
                </div>

        </div>
        <div className='w-full h-px bg-slate-400'></div>
        <div className='w-full p-4 h-[7vh] bg-[#dbfcfcec] flex items-center justify-center'>Copyright 2025@smartcart.com-All Rights Reserved</div>
      
    </div>
  )
}

export default Footer
