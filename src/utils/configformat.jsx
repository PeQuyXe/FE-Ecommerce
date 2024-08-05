export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const renderStars = (rating) => {
  const normalizedRating = Number(rating) || 0;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} className="text-yellow-500">
          ★
        </span>
      ))}
      {hasHalfStar && <span className="text-yellow-500">☆</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
};

export const calculateOriginalPrice = (price, discount) => {
  return price / (1 - discount / 100);
};
