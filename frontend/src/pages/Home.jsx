import { useEffect, useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "./Product";

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
        setHeroCount(prevCount => (prevCount === 3 ? 0: prevCount +1));
    },3000);
  },[]);
  return (
    <div className="overflow-x-hidden relative top-[70px]">
    <div className='w-screen md:h-[60vh] sm:h-[30vh] lg:h-screen bg-linear-to-l from-[#141414] to-[#0c2025]'>
        <Background heroCount={heroCount}/>
        <Hero heroCount={heroCount}
        setHeroCount={setHeroCount} 
        heroData={heroData[heroCount]}
        />
    </div>
    <Product/>
    </div>
  )
}

export default Home