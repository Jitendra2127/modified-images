import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas as FabricCanvas, Image as FabricImage, Rect, Circle, Triangle, Textbox } from 'fabric';

const AddCaption = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [image, setImage] = useState("");
   

    const canvasRef = useRef(null); 
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        const fabricCanvas = new FabricCanvas(canvasRef.current);
        setCanvas(fabricCanvas);
        return () => {
            fabricCanvas.dispose();
        };
    }, []);

  
    useEffect(() => {
        const fetchImageData = async () => {
            const apiUrl = `https://api.unsplash.com/photos/${id}?client_id=EkVTK5tDaPAh2esOUj9Fu0XFxJpLZzK8y7oC3iH9Mec`;
            try {
                const response = await fetch(apiUrl);
                const finalData = await response.json();
               
                if (!finalData || !finalData.urls || !finalData.urls.small_s3) {
                    
                    setImage("");
                } else {
                    
                    setImage(finalData.urls.small_s3); 
                    
                }
            } catch (err) {
                
                console.error(err);
            }
        };
        if (id) {
            fetchImageData();
        }
    }, [id]);

  
    useEffect(() => {
        if (canvas && image) {
            // console.log(image);
            const imgElement = new window.Image();
            imgElement.crossOrigin = "anonymous";

           
            const proxyUrl = "https://api.allorigins.win/raw?url=";
            imgElement.src = `${proxyUrl}${image}`;

            console.log(imgElement.src)

            imgElement.onload = () => {
                const img = new FabricImage(imgElement);
                const scaleX = canvas.width / img.width;
                const scaleY = canvas.height / img.height;
                const scaleFactor = Math.min(scaleX, scaleY); 
                img.scale(scaleFactor);
                img.set({
                    left: 0,
                    top: 0,
                    selectable: false,
                });

              
                canvas.set('backgroundImage', img);
                canvas.renderAll(); 
            };
        }
    }, [canvas, image]);


 
    const addText = () => {
        const text = new Textbox('Enter new Text', {
            left: 100,
            top: 100,
            width: 250,
            fontSize: 40,
            fill:"blue"

        });
        canvas.add(text);
    };

    
    const addRectangle = () => {
        const rect = new Rect({
            left: 100,
            top: 100,
            fill: 'blue',
            width: 100,
            height: 100,
        });
        canvas.add(rect);
    };

  
    const addCircle = () => {
        const circle = new Circle({
            radius: 50,
            left: 100,
            top: 100,
            fill: 'blue',
        });
        canvas.add(circle);
    };

    
    const addTriangle = () => {
        const triangle = new Triangle({
            width: 100,
            height: 100,
            left: 100,
            top: 100,
            fill: 'green',
        });
        canvas.add(triangle);
    };

    
    const downloadCanvas = () => {
        try {
            const dataURL = canvas.toDataURL({
                format: 'png',
                quality: 1.0,  
            });
            const a = document.createElement("a");
            a.href = dataURL;
            a.download = "canvas_image.png";
            a.click();
        } catch (err) {
            console.error("Failed to export canvas:", err);
        }
    };

    return (
        <>
            <div className="p-4 space-y-4">
                <div className="text-center">
                    <span className="border w-fit px-4 py-1 rounded shadow">Add Caption</span>
                </div>

                <div className=" flex md:flex-row flex-col gap-2 *:w-full *:shadow *:rounded">
                    <div className="overflow-hidden max-h-[550px]">
                       
                        <canvas ref={canvasRef} width={800} height={600} />
                    </div>
                    <div className="border p-4">
                        <div className="grid md:grid-cols-2">
                           
                            <button onClick={addText} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Text</button>
                            <button onClick={addRectangle} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Rectangle</button>
                            <button onClick={addCircle} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Circle</button>
                            <button onClick={addTriangle} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Triangle</button>
                        </div>
                        <div className="w-full md:*:w-1/2 *:w-full text-center md:mt-20 mt-8">
                            <button onClick={downloadCanvas} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">DOWNLOAD</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCaption;
