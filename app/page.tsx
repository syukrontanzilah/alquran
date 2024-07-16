"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { QuranDataType } from "./DataType/QuranType";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [listQuran, setListQuran] = useState<QuranDataType[]>([] as QuranDataType[])

  const URL = 'https://quran-api.santrikoding.com/api/surah';

  const getAllSurah = async () => {
    try{
      await axios.get(URL)
      .then(res => {
        const data = res.data;
        console.log('datanya', data);
        setListQuran(data)
      })

    } catch(error){
      console.log(error)
    }
  }

  useEffect(()=> {
    getAllSurah()
  },[])

  const nuzul = (x:string) => {
    if(x==="mekah"){
      return "makiyah"
    }
    if(x==="madinah")
    return "madaniyah"
  }

  return (
    <main className="page">
      <div className="container">
      <div className='flex bg-slate-400 h-24 px-3 fixed w-full xl:w-[650px] items-center justify-center font-bold text-[20px]'>
         Quran At-Tanzil
      </div>
        
         <div className="p-5 pt-32">
          {listQuran.map((item, i)=> {
            return(
              <Link href={{ 
                pathname: `/${item.nomor}`,
                // query: {nama: item.nama},
                }}>
              <div key={i} className="flex justify-between items-center p-3 border rounded-xl mb-4 transition-all hover:bg-slate-100 shadow-md">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full flex justify-center items-center border border-gray-300 mr-3">
                   {item?.nomor} 
                  </div>
                  <div>
                    <div className="font-bold"> {item?.nama_latin}</div>
                    <div className="font-light text-gray-500 text-sm">{item?.arti}</div>
                    <div className="font-light text-gray-500 text-sm capitalize">{item?.jumlah_ayat} ayat - {nuzul(item?.tempat_turun)}</div>
                  </div>
                  
                </div>
                <div className="font-bold text-2xl font-arabicFont">{item.nama}</div>
              </div>
              </Link>
            )
          })}
         </div>
      </div>

     
    </main>
  );
}
