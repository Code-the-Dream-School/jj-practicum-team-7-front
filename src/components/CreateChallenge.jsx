import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChallengeModal = () =>{
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [duration, setDuration] = useState('');
    const [invited, setInvited] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-screen">
       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full relative">
         <span
           className="absolute top-2 right-2 text-gray-400 text-xl cursor-pointer"
           onClick={() => navigate("/")}
         >
           &times;
         </span>
         <h2 className="text-2xl font-bold text-black text-center mb-2">
           Create a Challenge
         </h2>
         <form className="space-y-4">
           {/* fields */}
         </form>
       </div>
     </div>
   );
}
export default CreateChallengeModal