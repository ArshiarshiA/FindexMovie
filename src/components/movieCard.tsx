import { IoTimeOutline } from "react-icons/io5";
import { SiRottentomatoes } from "react-icons/si";
import { SiMetacritic } from "react-icons/si";
import RatingBlock from "./ratingBlock";
import { TfiWorld } from "react-icons/tfi";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { TMovieList } from "@/app/page";
import React, { SetStateAction } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU'

interface IRating {
    Source: string
    Value: string
}

export interface IMovieCardData {
    Poster?: string
    Title?: string
    Runtime?: string
    Year?: string
    Director?: string
    Country?: string
    Plot?: string
    Genre?: string
    Type?: string
    Ratings?: IRating[]
    Actors?: string
    imdbID?: string
    Response?: string
    MovieList?: TMovieList
    setMovieList: React.Dispatch<React.SetStateAction<TMovieList>>
    setCheck: React.Dispatch<SetStateAction<boolean>>
    Check: boolean
}

export default function MovieCard({ Poster = DEFAULT_IMG, Title, Runtime, Year, Director, Plot, Country, Genre, Type, Ratings, imdbID, Actors, MovieList, setMovieList, setCheck, Check }: IMovieCardData) {
    return (
        <div className="max-[747px]:px-5">
            <div className="flex max-w-[800px] max-[747px]:flex-col max-[747px]:items-center m-auto border border-gray-700 rounded-3xl">
                <div className="w-5/12 max-[747px]:w-full">
                    <div className="relative w-fit m-auto">
                        <img
                            src={Poster}
                            alt=""
                            className="max-h-[500px] object-cover relative -top-12 left-0 rounded-3xl max-[747px]:m-auto"
                        />
                        <div className="absolute -top-12 left-0">
                            <div className="bg-[#d1d1d18f] rounded-xl rounded-l-3xl p-3">
                                {MovieList?.findIndex(data => data.Title == Title) != -1 ? (
                                    <IoBookmark className="cursor-pointer" onClick={() => {
                                        MovieList?.splice(MovieList.findIndex(item => item.Title === Title) , 1)
                                        if (typeof window !== undefined) {
                                            window.localStorage.setItem('movieList', JSON.stringify(MovieList))
                                        }
                                        toast.info(`${Title} Removed From Your List`, {
                                            position: 'bottom-left',
                                            autoClose: 5000,
                                            theme: 'dark'
                                        })
                                        setCheck(Check == true ? false : true)
                                    }} size={30} />
                                ) : (
                                    <CiBookmark className="cursor-pointer" onClick={() => {
                                        setMovieList([...MovieList, { Title, Poster, Runtime, Type, Year, imdbID }])
                                        toast.success(`${Title} Added To Your List`, {
                                            position: 'bottom-left',
                                            autoClose: 6000,
                                            theme: 'dark'
                                        })
                                        setCheck(Check == false ? true : false)
                                    }} size={30} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="pl-4 relative -top-6">
                        <h1 className="text-3xl text-white">{Title}</h1>
                        <div className="py-2 text-[#aaaaaa85]">
                            <span className="flex items-center"><IoTimeOutline size={20} className="pr-1" /> : {Runtime}</span>
                            <span className="flex items-center"><TfiWorld size={20} className="pr-1" /> : {Country}</span>
                        </div>
                    </div>
                </div>
                <div className="w-7/12 pr-5 pt-5 max-[747px]:w-full max-[747px]:px-5 max-[747px]:pb-5">
                    <div className="text-[#aaaaaa85]">
                        <p>{Year}</p>
                        <p>{Director}</p>
                    </div>
                    <p className="text-justify py-4 text-2xl text-white">{Plot}</p>
                    <div className="flex gap-5">
                        {Ratings?.map(rate => (
                            <RatingBlock key={rate.Source} value={rate.Value}>
                                {
                                    rate.Source === 'Internet Movie Database'
                                        ? <span className="text-yellow-400">IMDB</span>
                                        : rate.Source === 'Rotten Tomatoes'
                                            ? <SiRottentomatoes className="text-red-500" />
                                            : <SiMetacritic className="text-yellow-400" />
                                }
                            </RatingBlock>
                        ))}
                    </div>
                    <div className="flex gap-2 pt-6">
                        {Genre?.split(',').map(genre => (
                            <div key={genre} className="text-gray-400 bg-[#0000001a] border border-gray-500 px-3 rounded-full">
                                {genre}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap pt-2">
                        {Actors?.split(',').map(actors => (
                            <div key={actors} className="pr-4 pt-3 text-[#aaaaaa85] hover:text-white transition-all">
                                <a
                                    target="_blank"
                                    href={`https://www.google.com/search?q=${actors}`}>{actors}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}