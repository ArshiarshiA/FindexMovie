"use client"
import MovieCard, { IMovieCardData } from "@/components/movieCard";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdCopyright } from "react-icons/md";
import { MdOutlineMovie } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { CiTrash } from "react-icons/ci";
import SavedMovie from "@/components/savedMovie";
import TypeSelector from "@/components/typeSelector";

interface IMovieListItems {
  Poster: string
  Title?: string
  Runtime?: string
  Year?: string
  imdbID?: string
  Type?: string
}

export type TMovieList = IMovieListItems[]

interface ISearchedM {
  Title: string
  Poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU'
  Year: string
  imdbID: string
  Type: string
}

interface IFilteredM {
  Search: ISearchedM[]
  Response: string
}

export default function Home() {

  const [movieList, setMovieLists] = useState<TMovieList>([])
  const [check, setCheck] = useState<boolean>(true)
  const [movie, setMovie] = useState<IMovieCardData | null>(null)
  const [filteredM, setFilteredM] = useState<IFilteredM | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [type, setType] = useState<string>('')

  useEffect(() => {
    setMovieLists(() => {
      const store = typeof window !== undefined ? window.localStorage.getItem('movieList') : 'error'
      return store ? JSON.parse(store) : []
    })
  }, [])

  useEffect(() => {
    if (input.length >= 1) {
      axios.get(`https://www.omdbapi.com/?apikey=ce48eb55&s=${input}&type=${type}`)
        .then(response => response.data)
        .then(data => {
          setFilteredM(data)
        })
    } else {
      setIsLoading(false)
    }
  }, [input, type])

  useEffect(() => {
    if (typeof window !== undefined) {
      window.localStorage.setItem('movieList', JSON.stringify(movieList))
    }
  }, [movieList])

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  console.log(movieList[0])

  return (
    <>
      <section className="pt-40">
        <div className="text-center">
          <div className="relative flex justify-center">
            <h1 className="text-white text-9xl special-font z-10 max-[747px]:text-8xl">FINDEX MOVIE</h1>
            <img className="w-[600px] absolute -top-36 max-[523px]:-top-36 max-[430px]:-top-28" src='https://pngimg.com/d/deadpool_PNG81.png' alt="" />
          </div>
        </div>
      </section>

      <section className="pt-44">
        <div className="max-w-[1000px] m-auto">
          <div>
            <div className="text-center">
              <h1 className="text-5xl">Your Movie List</h1>
              <p className="text-[#aaaaaa85] text-2xl pt-2 font-extralight">Add Your Movies For Watch Later.</p>
            </div>
            <div className="max-w-[450px] m-auto pt-7 px-5">
              {movieList.length >= 1 ? (
                <>
                  <button
                    onClick={() => {
                      localStorage.removeItem('movieList')
                      setMovieLists([])
                      toast.info('Removed All Movies', {
                        position: 'bottom-left',
                        autoClose: 6000,
                        theme: 'dark'
                      })
                    }}
                    className="flex items-center gap-2"
                  >
                    <CiTrash size={20} />
                    Clear All
                  </button>
                  {
                    movieList.map(movie => (
                      <SavedMovie
                        {...movie}
                        key={movie.imdbID}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        movieList={movieList}
                        setMovie={setMovie}
                        check={check}
                        setCheck={setCheck}
                      />
                    ))
                  }
                </>
              ) : (
                <div className="flex justify-center items-center w-16 h-16 rounded-full bg-[#e2e2e249] m-auto mt-5">
                  <GoPlus size={35} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="flex items-center justify-center flex-col-reverse py-28">
        <div className="w-4/12 max-[747px]:w-full">
          <div className="flex items-end pt-10">
            <div className="relative px-3 pt-5 w-3/4">
              <input
                className="px-5 py-2 rounded-md bg-black border border-gray-500 outline-none w-full text-white"
                onChange={changeHandler}
                type="text"
                placeholder="SEARCH A MOVIE..."
              />
              <IoIosSearch size={25} className="absolute right-5 top-7 text-white" />
            </div>
            <div className="w-1/2">
              <TypeSelector type={type} setType={setType} />
            </div>
          </div>
          <div className="py-5 max-[747px]:px-5">
            {
              filteredM?.Search !== undefined && filteredM?.Search.length !== 0
                ? <p>{filteredM?.Search.length} Result</p> : ''
            }
            {filteredM?.Search?.map(movie => (
              <div
                key={movie.imdbID}
                className="flex border-b py-3"
              >
                <div className="w-fit">
                  <img className="h-[250px] object-cover" src={movie.Poster} alt="" />
                </div>
                <div className="pl-5 flex flex-col justify-between w-7/12">
                  <div>
                    <h1 className="text-xl text-white">{movie.Title}</h1>
                    <p className="text-[#aaaaaa85]">Years of Release : {movie.Year}</p>
                    <p className="flex items-center text-[#aaaaaa85]"><MdOutlineMovie /> : {movie.Type}</p>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-400 px-4 text-black border border-black transition-all duration-300 delay-100 hover:bg-black hover:border hover:border-yellow-400 hover:text-white"
                      onClick={() => {
                        axios.get(`https://www.omdbapi.com/?apikey=ce48eb55&t=${movie.Title}&type=${movie.Type}`)
                          .then(response => setMovie(response.data))
                          .then(data => {
                            setIsLoading(true)
                            scrollTo({ top: 640, behavior: 'smooth' })
                          })
                      }}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isLoading ? (
          movie?.Response === 'False' ? (
            <div className="text-center">
              <IoIosSearch size={39} className="w-full" />
              <h1 className="text-3xl border-b pb-2">No items found..!</h1>
            </div>
          ) : (
            <MovieCard {...movie}
              MovieList={movieList}
              setMovieList={setMovieLists}
              Check={check}
              setCheck={setCheck}
            />
          )
        ) : (
          <h1>Waiting For Your Searching...</h1>
        )}
      </main>

      <footer>
        <div className="max-w-[1000px] m-auto px-2">
          <div className="flex justify-between max-[466px]:flex-col items-center gap-3 pb-4 text-white">
            <p>Developer : <a className="border-b" href="https://github.com/ArshiarshiA">Arshia Mansury</a></p>
            <p className="flex text-white">All Right Reserved 2024 <MdCopyright /></p>
          </div>
          <div className="border-t border-t-yellow-400 py-4 text-center text-white">
            <p>Powered By <a className="text-yellow-400" href="https://www.omdbapi.com/">OMDB</a></p>
          </div>
        </div>
      </footer>
    </>
  )
}