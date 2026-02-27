import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
  Users, 
  MapPin, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Droplet
} from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { API } from "../../config.js";

const BloodLabCampRegistrations = () => {
  const { id: campId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [registrations, setRegistrations] = useState([]);
  
  // Determine the base path based on the current location
  // If the user accessed this from /hospital/..., we want to go back to /hospital/camps
  // If they accessed it from /lab/..., we want to go back to /lab/camps
  const basePath = location.pathname.startsWith('/hospital') ? '/hospital/camps' : '/lab/camps';

  const [loading, setLoading] = useState(true);
  const [campDetails, setCampDetails] = useState(null);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/blood-lab/camps/${campId}/registrations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
         setRegistrations(res.data.registrations || []);
      }
    } catch (err) {
      toast.error("Failed to fetch registrations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCampDetails = async () => {
      // You might need a new endpoint to fetch a single camp, or you can pass state via navigation.
      // Assuming you have an endpoint for GET /camps/:id, we use it for now. Or just use registrations.
  };

  useEffect(() => {
    fetchRegistrations();
  }, [campId]);

  const handleStatusUpdate = async (registrationId, newStatus, quantityML = null) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API}/api/blood-lab/camps/registrations/${registrationId}/status`,
         { status: newStatus, quantity: quantityML },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Status updated to ${newStatus}`);
      fetchRegistrations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
           <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-xl">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                Camp Registrations
              </h1>
              <p className="text-gray-600 mt-1">Manage expected donors for this camp</p>
           </div>
           <button 
             onClick={() => navigate(basePath)}
             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
           >
             Back to Camps
           </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 overflow-hidden">
             {loading ? (
                <div className="p-8 text-center text-gray-500">Loading registrations...</div>
             ) : registrations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No donors have registered for this camp yet.</div>
             ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-red-50 text-gray-700 border-b border-red-100">
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Donor Name</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Blood Group</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount (ml)</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {registrations.map(reg => (
                           <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-gray-800">
                                 {reg.donor?.fullName || 'Unknown'}
                              </td>
                              <td className="px-4 py-3">
                                 <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                                   {reg.donor?.bloodGroup || 'N/A'}
                                 </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                 <div className="flex items-center gap-1">
                                   <Phone size={14} className="text-gray-400" />
                                   {reg.donor?.phone || 'N/A'}
                                 </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                 <div className="flex flex-col gap-1">
                                   <div className="flex items-center gap-1">
                                      <Clock size={14} className="text-gray-400" />
                                      {reg.donationDate ? new Date(reg.donationDate).toLocaleDateString() : 'N/A'}
                                   </div>
                                   <div className="flex items-center gap-1 text-xs">
                                      {reg.timeSlot}
                                   </div>
                                 </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                 <div className="flex items-center gap-1">
                                   <Droplet size={14} className="text-red-500" />
                                   {reg.quantityML || 350} ml
                                 </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    reg.status === 'Donated' ? 'bg-green-100 text-green-800' :
                                    reg.status === 'No-Show' ? 'bg-gray-100 text-gray-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {reg.status === 'No-Show' ? 'Not Donated' : reg.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                  {reg.status === 'Registered' && (
                                     <div className="flex justify-end gap-2">
                                        <button 
                                          onClick={() => handleStatusUpdate(reg._id, 'Donated', reg.quantityML || 350)}
                                          className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-lg text-sm hover:bg-green-100 transition-colors"
                                          title="Mark as Donated"
                                        >
                                           <CheckCircle size={14} /> Donated
                                        </button>
                                        <button 
                                          onClick={() => handleStatusUpdate(reg._id, 'No-Show')}
                                          className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                                          title="Mark as Not Donated"
                                        >
                                           <XCircle size={14} /> Not Donated
                                        </button>
                                     </div>
                                  )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default BloodLabCampRegistrations;
