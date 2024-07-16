"use client"
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { QuranDataType, SuratDataType } from "../DataType/QuranType"
import Link from 'next/link';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaBookQuran } from "react-icons/fa6";

const QuranDetail = () => {
const params = useParams();
const {id} = params;
const [surat, setSurat] = useState<SuratDataType>({} as SuratDataType);
const [loading, setLoading] = useState(false);

const getSurat = async () => {
  setLoading(true)
  try{
    await axios.get(`https://quran-api.santrikoding.com/api/surah/${id}`)
    .then(res  => {
      console.log(res.data);
      const data = res.data
      setSurat(data);
      console.log("surat", data.ayat)
    })
    setLoading(false)
  } catch(error){
    console.log(error)
    setLoading(false)
  }
}

  useEffect(()=> {
    getSurat()
  },[id])

  const numbers = `۰۱۲۳٤۵٦۷۸۹`;
  const convert = (num: { toString: () => any; }) => {
    let res = "";
    const str = num.toString();
    for (let c of str) {
      res += numbers.charAt(c);
    }
    return res;
  };


  return (
    <main className='page'>
      <div className="container">
      <div className='flex bg-slate-400 h-28 px-3 fixed w-full xl:w-[650px]'>
        {
          surat.nomor ==1 ? <div className='flex items-center justify-center'><FaArrowCircleLeft size={45} className='text-slate-200'/></div> : (
        <div className='flex items-center justify-center'>
        <Link href={`/${surat?.nomor - 1}`}>
         <div className=''><FaArrowCircleLeft size={45} className='text-slate-200 hover:text-slate-100 transition-all'/></div>
        </Link> 
        </div>

          ) 
        }

        {
          loading || surat.nama == undefined || surat.nama == "" ? <div className='w-full'></div> : (
        <div className=' w-full flex flex-col justify-center items-center mx-2'>
        <div className='text-[20px] font-bold'>{surat.nomor}. {surat.nama_latin} ( {surat.nama} ) </div>
      <div className='capitalize'>{surat.jumlah_ayat} Ayat - {surat.tempat_turun}</div>
        </div>            
          )
        }

        {
          surat.nomor ==114 ? <div className='flex items-center justify-center'><FaArrowCircleRight  size={45} className='text-slate-200'/></div> : (
      <div  className='flex items-center justify-center'>
       <Link href={`/${surat?.nomor + 1}`}>
       <div className=''><FaArrowCircleRight  size={45} className='text-slate-200 hover:text-slate-100 transition-all'/></div>
       </Link>
       </div>            
          )
        }
      </div>
      {
        loading?
        <div  className='p-5 pt-32'>Loading...</div>
        : (
        <div>
      <div className='p-5 pt-36'>
        {
          surat.ayat?.map((ayat, i)=> {
            return(
              <div className='mb-8' key={i}>
                <div className='text-[32px] font-bold mb-4 text-right font-arabicFont tracking-wide leading-[75px]'>{ayat.ar}<span className='font-light text-[25px] tracking-tighter mr-2'>({convert(ayat.nomor)})</span></div>
                <div className='font-light text-[14px] mb-4' dangerouslySetInnerHTML={{__html: ayat?.tr}}/>
                <div className='text-[18px]'>{ayat.nomor}. {ayat.idn}</div>
              </div>
            )
          })
        }
      </div>          
        </div>          
        )
      }

      <Link href={'/'}>
      <div className=' flex justify-center items-center fixed bg-slate-950 bottom-5 ml-5 h-16 w-16 transition-all rounded-full shadow-xl cursor-pointer hover:bg-slate-800'>

      <FaBookQuran className='text-slate-100' size={30} />
      </div>      
      </Link>


      </div>
    </main>
  )
}

export default QuranDetail