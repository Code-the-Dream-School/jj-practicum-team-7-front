import { useState } from "react";
import { useNavigate } from "react-router-dom";
const categories = [
  "Fitness",
  "Learning",
  "Productivity",
  "Health",
  "Creativity",
  "Self-Care",
  "Finance",
  "Mindfulness",
  "Other",
];

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
           <div>
             <label className="text-gray-600 block mb-1">Title</label>
             <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               required
               minLength="5"
               maxLength="50"
               className="w-full p-3 border rounded-lg"
             />
           </div>
           <div>
             <label className="text-gray-600 block mb-1">Category</label>
             <select
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               required
               className="w-full p-3 border rounded-lg"
             >
               <option value="">Choose a category</option>
               {categories.map((cat) => (
                 <option key={cat} value={cat}>
                   {cat}
                 </option>
               ))}
             </select>
           </div>
           <div>
             <label className="text-gray-600 block mb-1">Daration(days)</label>
             <input
               type="number"
               value={duration}
               onChange={(e) => {
                 const value = e.target.value;
                 if (
                   value === "" ||
                   (Number(value) >= 1 && Number(value) <= 10)
                 ) {
                   setDuration(value);
                 }
               }}
               required
               min="1"
               max="10"
               className="w-full p-3 border rounded-lg"
             />
           </div>
         </form>
         <p>{title}</p>
         <p>Category: {category}</p>
         <p>Daration: {duration}</p>
       </div>
     </div>
   );
}
export default CreateChallengeModal