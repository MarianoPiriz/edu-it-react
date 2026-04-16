import {useAuth} from "../../context/AuthContext";
import EditableField from "../EditableFields/EditableField";

const SecurityInfo = () => {

    const { user , updateAccountPassword } = useAuth();
    const handlePasswordUpdate = (newPassword) => {
      updateAccountPassword(newPassword);
      alert("Password updated successfully");
    }

  return (
    <div className="max-w-2xl">
     <h2 className="text-2xl font-bold mb-6">Login & Security</h2>
      <p className="text-gray-500 mb-8 text-sm">Manage your account access and password.</p>

      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <div className="flex flex-row">
          <span className="text-gray-500 text-xs font-semibold uppercase">Username</span>
          <span className="text-gray-800 text-xs ml-5">{user.username}</span>
        </div>
        <span className="text-xs text-gray-400 italic text-right">
          Username cannot be changed
        </span>
      </div> 

      <EditableField
        label="Password"
        value={user.password}
        type="password"
        onSave={handlePasswordUpdate}
      />
    </div>
  )
}

export default SecurityInfo
