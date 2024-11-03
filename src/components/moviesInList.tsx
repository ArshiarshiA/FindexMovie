export default function MovieInList({Image , Title}: {Image?:string , Title?:string}){
    return(
        <div className="flex px-10">
            <div>
                <img className="h-[250px]" src={Image} alt="" />
            </div>
            <div className="pl-2 text-2xl"><h1>{Title}</h1></div>
        </div>
    )
}