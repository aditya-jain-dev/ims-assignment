import React, { useState, useEffect } from "react";
import { products as initialProducts } from "../assets/frontend_assets/assets";

const ProductList = () => {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState("add"); // "add" or "edit"
    const [currentProduct, setCurrentProduct] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const toggleDrawer = (mode = "add", product = {}) => {
        setDrawerMode(mode);
        setCurrentProduct(product);
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newProduct = {
            _id: drawerMode === "add" ? Date.now().toString() : currentProduct._id,
            name: formData.get("name"),
            category: formData.get("category"),
            price: parseFloat(formData.get("price")),
            quantity: parseInt(formData.get("quantity")),
            image: currentProduct.image || [],
            date: currentProduct.date || Date.now()
        };

        if (drawerMode === "add") {
            setProducts([...products, newProduct]);
        } else {
            setProducts(products.map(product => product._id === newProduct._id ? newProduct : product));
        }

        toggleDrawer();
    };

    const handleDelete = (product) => {
        setProductToDelete(product);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        setProducts(products.filter(product => product._id !== productToDelete._id));
        setIsModalOpen(false);
        setProductToDelete(null);
    };

    return (
        <>
            {/* title */}
            <div className='inline-flex gap-2 items-center my-6'>
                <p className='text-gray-500 text-xl'>PRODUCTS <span className='text-gray-700 font-medium'>LIST</span></p>
            </div>

            <div className="flex items-center justify-between">
                {/* search */}
                <div className="pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search" value={searchTerm} onChange={handleSearch} className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items" />
                    </div>
                </div>

                {/* add button */}
                <button type="button" onClick={() => toggleDrawer("add")} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">ADD</button>

                {/* drawer component */}
                <div className={`fixed top-0 right-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} bg-white`}>
                    <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase mb-6">{drawerMode === "add" ? "ADD PRODUCT" : "EDIT PRODUCT"}</h5>
                    <button type="button" onClick={toggleDrawer} aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center" >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" id="name" name="name" defaultValue={currentProduct.name || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" id="category" name="category" defaultValue={currentProduct.category || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" id="price" name="price" defaultValue={currentProduct.price || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" id="quantity" name="quantity" defaultValue={currentProduct.quantity || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
                    </form>
                </div>
            </div>

            <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${isDrawerOpen ? 'blur-sm' : ''}`}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product._id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.quantity}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button onClick={() => toggleDrawer("edit", product)} className="font-medium text-blue-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(product)} className="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">Cancel</button>
                            <button onClick={confirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductList;