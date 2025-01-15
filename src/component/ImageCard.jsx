import { useNavigate } from "react-router-dom"
const ImageCard = ({ele,key}) => {
    const navigate=useNavigate();
    const handleImagenavigate=()=>{
        console.log(ele)
        navigate(`/AddCaption?id=${ele.id}`)
    }
    return (
        <>
            <div className=" cursor-pointer border h-fit space-y-4  rounded p-2" key={key} >
                <div className="  rounded max-h-72 w-full overflow-hidden" >
                    <img src={ele.urls.small_s3}
                        alt={ele.description||"No Image Available"}
                        className="w-full"
                    />
                </div>
                <div className="  *:w-full">
                    <button type="button" onClick={()=>handleImagenavigate()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ADD CAPTION</button>
                </div>
            </div>

        </>
    )
}

export default ImageCard
