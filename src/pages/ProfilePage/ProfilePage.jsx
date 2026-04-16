import { useState } from "react";
import PersonalInfo from "../../components/ProfileSections/PersonalInfo";
import SecurityInfo from "../../components/ProfileSections/SecurityInfo";
import PaymentInfo from "../../components/ProfileSections/PaymentInfo";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="flex container flex-col md:flex-row p-8 gap-10">
      <nav className="w-full md:w-1/4 flex flex-col gap-4">
        <button
          onClick={() => setActiveSection("personal")}
          className={

            activeSection === "personal" ? "font-bold text-blue-600" : ""
          }
          style={{textAlign: "left"}}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActiveSection("security")}
          className={
            activeSection === "security" ? "font-bold text-blue-600" : ""
          }
          style={{textAlign: "left"}}
        >
          Sign-in and Security
        </button>
        <button
          onClick={() => setActiveSection("payment")}
          className={

            activeSection === "payment" ? "font-bold text-blue-600" : ""
          }
          style={{textAlign: "left"}}
        >
          Billing and Payment Information
        </button>
      </nav>

      <hr />

      <section className="w-full">
        {activeSection === "personal" && <PersonalInfo />}
        {activeSection === "security" && <SecurityInfo />}
        {activeSection === "payment" && <PaymentInfo />}
      </section>
    </div>
  );
};

export default ProfilePage;
