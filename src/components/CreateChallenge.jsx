import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../util/index"
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
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = {
        title,
        category,
        duration: Number(duration), 
        invited: [], 
      };
      const res = await postData("/challenges", data);
      console.log(res)
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create challenge");
    } finally {
      setLoading(false);
    }
  };  
   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-screen">
       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full relative">
         <span
           className="absolute top-2 right-2 text-gray-400 text-xl cursor-pointer"
           onClick={() => navigate("/login")}
         >
           &times;
         </span>
         <h2 className="text-2xl font-bold text-black text-center mb-2">
           Create a Challenge
         </h2>
         <form className="space-y-4" onSubmit={handleSubmit}>
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
             <label className="text-gray-600 block mb-1">Duration(days)</label>
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
           <button
             type="submit"
             disabled={loading}
             className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
           >
             {loading ? "Creating..." : "Create"}
           </button>
         </form>
       </div>
     </div>
   );
}
export default CreateChallengeModal