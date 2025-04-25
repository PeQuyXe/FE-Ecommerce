import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { FaEye } from 'react-icons/fa';
import { LoaderCircle } from 'lucide-react';
import { renderStars, formatCurrency, calculateOriginalPrice } from '../../../utils/configformat';
// import { toast } from 'react-toastify';
// import { addToFavorites } from '../../../reducer/favoritesSlice';
// import { useDispatch, useSelector } from 'react-redux';

export default function ImageSearchResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = location.state;
        if (!data || !data.results || !data.imagePreview) {
            navigate('/');
        } else {
            setResults(data.results);
            setImage(data.imagePreview);
            setLoading(false);
        }
    }, [location, navigate]);
    // const favorites = useSelector((state) => state.favorites.items);
    // const dispatch = useDispatch();
    // const toggleFavorite = (item) => {
    //     const isFavorite = favorites.some((fav) => fav.prod_id === item.prod_id);

    //     if (isFavorite) {
    //         toast.info("Sản phẩm đã có trong danh sách yêu thích", {
    //             autoClose: 500,
    //         });
    //     } else {
    //         toast.success("Đã thêm vào yêu thích", { autoClose: 500 });

    //         // Chỉ lưu thông tin cần thiết để tránh dữ liệu rườm rà
    //         const itemToSave = {
    //             prod_id: item.prod_id,
    //             title: item.title,
    //             image: item.images[0]?.image || '/placeholder.jpg',
    //             price: item.price,
    //             discount: item.discount,
    //             totalRating: item.totalRating,
    //         };

    //         dispatch(addToFavorites(itemToSave));
    //     }
    // };



    const addToCart = (item) => {
        // const productWithQuantity = {
        //   ...item,
        //   quantity: 1,
        // };

        // dispatch(ADD_TO_CART(productWithQuantity));
        // toast.success('Đã thêm vào giỏ hàng', {
        //   autoClose: 1000,
        // });

        window.scrollTo(0, 0);
        navigate(`/product/${item.prod_id}`);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
                <p className="mt-4 text-gray-500">Đang tải kết quả...</p>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Kết quả tìm kiếm</h1>

            <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Ảnh bạn đã tải lên:</p>
                <img
                    src={image}
                    alt="Uploaded preview"
                    className="rounded-lg border w-48 shadow-lg"
                />
            </div>

            {results.length === 0 ? (
                <div className="text-center mt-20">
                    <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm liên quan</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Tìm lại
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {results.slice(0, 6).map((item) => (
                        <div
                            key={item.prod_id}
                            className="p-4 rounded-lg shadow-md relative flex flex-col justify-between h-full"
                        >
                            <Link to={`/product/${item.prod_id}`} className="block">
                                <img
                                    src={item.images[0]?.image || '/placeholder.jpg'}
                                    alt={item.title}
                                    className="w-full h-40 object-contain p-2 transform-gpu transition-transform duration-500 hover:scale-105"
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                    }}
                                />
                                {item.discount !== 0 && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded">
                                        Giảm {item.discount}%
                                    </div>
                                )}
                            </Link>

                            <div className="absolute inset-0 bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <ul className="flex space-x-2">
                                    {/* <li>
                                        <button
                                            onClick={() =>
                                                navigate(`/product/${item.prod_id}`) & window.scrollTo(0, 0)
                                            }
                                            className="text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 p-3 rounded-lg"
                                        >
                                            <FaEye />
                                        </button>
                                    </li> */}

                                    <li>
                                        <button
                                            onClick={() =>
                                                addToCart(item) & window.scrollTo(0, 0)
                                            }
                                            className={`text-white p-2 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ${item.quantity === 0
                                                ? 'cursor-not-allowed'
                                                : 'cursor-pointer'
                                                }`}
                                            disabled={item.quantity === 0}
                                        >
                                            Mua sản phẩm
                                        </button>
                                    </li>
                                    {/* <li>
                                        <button
                                            onClick={() =>
                                                toggleFavorite(item)
                                            }
                                            className="text-white p-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
                                        >
                                            <FaHeart />
                                        </button>
                                    </li> */}
                                </ul>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                                <div className="text-gray-500">
                                    {renderStars(item.totalRating)}
                                </div>

                                <div className="text-xl font-bold text-red-500">
                                    {formatCurrency(item.price)}
                                    {item.discount !== 0 && (
                                        <span className="text-sm line-through text-gray-500 ml-2">
                                            {formatCurrency(
                                                calculateOriginalPrice(item.price, item.discount)
                                            )}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
