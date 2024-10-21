import React from "react";
import { Card, Col, Image } from "antd";


// const ProductCard = ({ item }) => (
//     <Col sm={24} md={12} lg={8} xl={6}>
//         <div className="my-2 border-2 hover:opacity-75 cursor-pointer flex flex-col items-center justify-center ">
//             <Image preview={false} src={item.thumbnail} height={200} />
//             <div className="flex justify-between p-3 w-full ">
//                 <div>
//                     <h1 className="font-bold text-lg font-montserrat">{item.title}</h1>
//                     <h1 className="font-semibold text-md">${item.price}</h1>
//                     <h1 className="font-semibold">{item.category}</h1>
//                 </div>
//                 <div>
//                     <button className="bg-black text-white p-2 rounded-md">Add To Cart</button>
//                 </div>
//             </div>
//         </div>
//     </Col>
// );
const ProductCard = ({ item }) => (
    <Col sm={24} md={12} lg={8} xl={6}>
        <div className="my-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105 cursor-pointer">
            
            <div className="relative">
                <Image preview={false} src={item.thumbnail} height={350} className="w-full object-cover" />
            </div>

            
            <div className="p-4">
                <h1 className="font-bold text-lg font-montserrat text-gray-900 truncate">{item.title}</h1>
                <h1 className="text-sm text-gray-500 mt-1">{item.category}</h1>
                
            
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">${item.price}</span>
                    <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    </Col>
);



export default ProductCard;