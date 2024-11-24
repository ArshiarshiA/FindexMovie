import React from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { IoBookmark } from "react-icons/io5"
import { MdOutlineMovie } from "react-icons/md"
import { IMovieCardData } from "./movieCard"
import { TMovieList } from "@/app/page"

interface ISavedMovie {
    ImdbId?: string
    Poster: string
    Title?: string
    Year?: string
    Type?: string
    movieList: TMovieList
    setMovie: React.Dispatch<React.SetStateAction<IMovieCardData | null>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    check: boolean
    setCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SavedMovie({ ImdbId, Poster, Title, Year, Type, movieList, setIsLoading, setMovie, isLoading, check, setCheck }: ISavedMovie) {
    return (
        <div
            key={ImdbId}
            className="flex border-b py-3"
        >
            <div className="w-fit">
                {
                    <img src={Poster} className="h-[250px] object-cover" height={250} width={160} alt="" />
                }
            </div>
            <div className="pl-5 flex flex-col justify-between w-7/12">
                <div>
                    <h1 className="text-xl text-white">{Title}</h1>
                    <p className="text-[#aaaaaa85]">Years of Release : {Year}</p>
                    <p className="flex items-center text-[#aaaaaa85]"><MdOutlineMovie /> : {Type}</p>
                </div>
                <div className="flex">
                    <button
                        className="bg-yellow-400 border border-black text-black px-4 transition-all duration-300 delay-100 hover:bg-black hover:border hover:border-yellow-400 hover:text-white"
                        onClick={() => {
                            axios.get(`https://www.omdbapi.com/?apikey=ce48eb55&t=${Title}&type=${Type}`)
                                .then(response => {
                                    setMovie(response.data)
                                    setIsLoading(isLoading == true ? false : true)
                                })
                        }}
                    >
                        Detail
                    </button>
                    <IoBookmark className="cursor-pointer" onClick={() => {
                        movieList?.splice(movieList.findIndex(item => item.Title === Title), 1)
                        if (typeof window !== undefined) {
                            window.localStorage.setItem('movieList', JSON.stringify(movieList))
                        }
                        toast.info(`${Title} Removed From Your List`, {
                            position: 'bottom-left',
                            autoClose: 6000,
                            theme: 'dark'
                        })
                        setCheck(check == true ? false : true)
                    }} size={30} />
                </div>
            </div>
        </div>
    )
}