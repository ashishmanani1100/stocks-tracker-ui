import { getPriceAlertData, updatePriceAlert } from "@/lib/apiFunctions/stocksAPI";
import { useEffect, useState } from "react";

export default function Child({ data = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputText, setInputText] = useState("");

  const handleModalOpen = (item) => {
    setSelectedItem(item); 
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setInputText(""); 
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e,item) => {
    e.preventDefault();
    await updatePriceAlert({ stock: item?.s, price: inputText });
    console.log("Form Submitted with:", inputText);
    handleModalClose();
  };

  useEffect(()=>{
  (async()=>{
    try{
      if(selectedItem?.s){
        const data =await getPriceAlertData(selectedItem?.s)
        console.log(data)
        if(data?.price){
          setInputText(data?.price)
        }
      }
    }catch(err){}
  })()
  },[selectedItem])

  

  return (
    <div className="p-6 space-y-6">
      {data?.map((item, index) => {
        return (
          <div key={index}>
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl relative">
              <div className="text-xl font-semibold text-gray-800">
                {item?.s}
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span className="text-sm font-semibold">Price:</span>
                <span className="text-xl font-bold text-green-600">
                  ${item?.p}
                </span>
              </div>

              {/* Price Alert Button */}
              <button
                onClick={() => handleModalOpen(item)}
                className="absolute top-4 right-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out"
              >
                Price Alert
              </button>
            </div>

            {/* Modal */}
            {isModalOpen && selectedItem?.s === item?.s && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                key={"temp"}
              >
                <div className="bg-white p-6 rounded-lg w-1/3">
                  <h2 className="text-xl font-semibold mb-4">
                    Set Price Alert for {selectedItem?.s}
                  </h2>
                  <form onSubmit={(e)=>handleSubmit(e,item)}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Enter a Value
                      </label>
                      <input
                        type="number"
                        value={inputText}
                        onChange={handleInputChange}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                        placeholder="Enter new value"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={handleModalClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
