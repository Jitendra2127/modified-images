
import { useState } from "react";
import Search from "../component/Search"
import ImageCard from "../component/ImageCard";
import ImageLoader from "../component/ImageLoader";

const Home = () => {
    const [data, setData] = useState([]);
    const [dataloader, setDataLoader] = useState(true);


    const handleSearch = async (query) => {

        const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=EkVTK5tDaPAh2esOUj9Fu0XFxJpLZzK8y7oC3iH9Mec`;
        try {
            const response = await fetch(apiUrl);
            const finalData = await response.json();
            // setDataLoader(true)

            if (!finalData.results || finalData.results.length === 0) {

                setData([]);
            } else {

                setData(finalData.results);
                setDataLoader(false)
            }
        } catch (err) {

            console.error(err);
        }
    };


    return (
        <>
            <div className=" md:p-4 p-2">
                <div className=" w-fit border p-2  rounded shadow ">

                    <h3>Name : Jitendra</h3>
                    <h3>Email : jitendrak2128@gmail.com</h3>
                </div>


                <Search searchItem={handleSearch} />
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 md:mt-8 mt-2  ">
                    {
                        data.map((ele) => (
                            <ImageCard ele={ele} key={ele.id} />

                        ))
                    }
                </div>
                {
                    dataloader &&
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 md:mt-8 mt-2  ">
                        {
                            Array(8).fill().map((_, index) => (
                                <ImageLoader key={index} />
                            ))
                        }
                    </div>
                }

            </div>
        </>
    )
}

export default Home
