import { useEffect, useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "./Product";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import Footer from "../components/Footer";

const Home = () => {
  let heroData = [
    {text1: "30% OFF Limited Offer",text2:"Trending Style"},
    {text1: "Discover the Best of bold fashion",text2:"Limited Time Only!"},
    {text1: "Explore Our Best Collection",text2: "Shop Now!"},
    {text1: "Choose your Perfect Fashion Fit",text2: "Now on Sale!"}
  ];
  let [heroCount,setHeroCount] = useState(0);
  useEffect(() => {
    let interval = setInterval(()=> {
        setHeroCount(prevCount => (prevCount === 1 ? 0: prevCount +1));
    },3000);
  },[]);
  return (
    <div className="overflow-x-hidden relative">
    <div className='w-screen md:h-[70vh] h-[60vh] mt-[70px] lg:h-[90vh] bg-linear-to-l from-[#141414] to-[#0c2025]'>
        <Background heroCount={heroCount}/>
        <Hero heroCount={heroCount}
        setHeroCount={setHeroCount} 
        heroData={heroData[heroCount]}
        />
    </div>
    <Product/>
    <OurPolicy/>
    <NewsLetterBox/>
    {/* <div className="h-[250px] lg:h-[180px] bg-[#dbfcfcec] lg:mb-0">  */}
    <Footer/>
    {/* </div> */}
    </div>
  )
}

export default Home