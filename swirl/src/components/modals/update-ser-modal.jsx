import countries from "../../utils/countries"
const UpdateUserModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // If the modal is not open, return null
  
    return (
      <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      )}
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update user Info
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            
            <div className="p-3 md:p-5">
            <form>
               <div className="grid grid-cols-12 gap-2">
              
              <div className="col-span-6">
                    <label className="font-bold" htmlFor="">First Name: </label>
                    <input type="text" className="border-2 border-[lightgrey] hover:border-black rounded-md mt-2 h-8"  />
                </div>
                <div className="col-span-6">
                    <label className="font-bold" htmlFor="">Last Name: </label> 
                    <input type="text" className="border-2 border-[lightgrey] hover:border-black rounded-md mt-2 h-8"  />
                </div>
              
              <div className="col-span-12 mt-2 " >
                  <label className="font-bold" htmlFor="">Bio :</label>
                  <br />
                  <input type="text" className="w-full border-2 rounded-md mt-2 h-8 border-[lightgrey] hover:border-gray"/>
               </div>
               <div className="flex justify-between items-center gap-3 mt-2">
              <div className="col-span-5">
                    <label className="font-bold" htmlFor="">Username: </label>
                    <input type="text" className="border-2 border-[lightgrey] hover:border-black rounded-md mt-2 h-8"  />
                </div>
                <div className="col-span-5 ">
                    <label className="font-bold" htmlFor="">Country: </label> 
                    
                    <select className="w-[39vw] sm:w-[12vw] border-2 border-[lightgray] rounded-md mt-2 h-8" name="" id="">
                        {countries.map((v,i)=>{
                            return <option key={i} value={v}>{v}</option>
                        })}
                    </select>
                
                </div>
                
              </div>
              <div className="col-span-12 bg-black text-white flex justify-center items-center py-2 mt-5 rounded-md font-bold">
                    <button>Update User</button>
                </div>
               </div>
               
            </form>
            </div>
          </div>
        </div>
      </div></>
    );
  };
  
  export default UpdateUserModal;
  
