import {useAuth} from  "../../context/AuthContext.jsx";
import EditableField from "../EditableFields/EditableField.jsx";

const PersonalInfo = () => {

    const { user, updateUserProfile } = useAuth();
    const currentPersonal = user?.profile?.personal || {};
    const homeAddress = user?.billingAddress?.find((address) => address.type === "Home" )
    const displayAddress = homeAddress ? `${homeAddress.address}, ${homeAddress.city}, ${homeAddress.zip} , ${homeAddress.state}, ${homeAddress.country}` : "No home address set";



    const handleUpdate = (field, newValue) => {
        updateUserProfile({
            personal:{
                ...currentPersonal,
                [field]: newValue
            }
        })
    };
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-left">Personal Information</h2>
      <p className="text-gray-500 mb-8 text-sm text-left">Manage your personal details and how we can reach you.</p>

      <hr />
      
      <EditableField 
        label="First Name" 
        value={user.profile?.personal?.name} 
        onSave={(val) => handleUpdate("name", val)} 
      />
      <EditableField 
        label="Last Name" 
        value={user.profile?.personal?.lastName} 
        onSave={(val) => handleUpdate("lastName", val)} 
      />
      <EditableField 
        label="Contact Email" 
        value={user.profile?.personal?.email} 
        onSave={(val) => handleUpdate("email", val)} 
      />
      <EditableField 
        label="Phone Number" 
        value={user.profile?.personal?.phone} 
        onSave={(val) => handleUpdate("phone", val)} 
      />
      <div className="flex flex-row items-baseline justify-between py-4 border-b pb-4 gap-6">
        <label className="text-xs font-medium text-gray-500 whitespace-nowrap">HOME ADDRESS</label>
        <div className="flex-grow text-left">
        <p className="text-xs text-gray-900 mt-1">{displayAddress}</p>
        <p className="text-xs text-blue-600 mt-1 italic">
          * This address is managed in your Payment & Billing settings.
        </p>
        </div>
      </div>
    </div>
  )
};

export default PersonalInfo;
