import { useState } from 'react';
import CouponList from './CouponList';
import CouponForm from './CouponForm';

const CouponAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAddCoupon = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEditCoupon = (coupon) => {
    setEditData(coupon);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-lg">
      {showForm ? (
        <CouponForm initialData={editData} onSubmit={handleFormSubmit} />
      ) : (
        <CouponList onEdit={handleEditCoupon} onAdd={handleAddCoupon} />
      )}
    </div>
  );
};

export default CouponAdmin;
