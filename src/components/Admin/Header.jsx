import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleNavigation = () => {
    if (!userData) {
      navigate("/login");
    } else {
      navigate("/admin/profile");
    }
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4">
      {/* Nút mở sidebar */}
      {/* <button
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-200 transition"
      >
        <Menu size={24} className="text-gray-700" />
      </button> */}

      {/* Thanh tìm kiếm */}
      {/* <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      {/* Thông tin user */}
      <div className="flex items-center cursor-pointer" onClick={handleNavigation}>
        <img
          className="h-10 w-10 rounded-full object-cover border border-gray-300"
          src={
            userData?.avatar ||
            "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
          }
          alt="avatar"
        />
        <div className="ml-3">
          <span className="font-medium text-gray-700">{userData?.fullname || "Admin"}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
