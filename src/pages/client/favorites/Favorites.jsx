import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { renderStars, formatCurrency } from "../../../utils/configformat";
import { removeFromFavorites, clearFavorites } from "../../../reducer/favoritesSlice";

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector((state) => state.favorites.items);

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-700 tracking-tight">
                💖 Danh sách yêu thích
            </h1>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 mt-12">
                    <p className="text-lg">Danh sách yêu thích trống.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 
                                   text-white font-medium rounded-lg shadow-md 
                                   hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <RiCompassDiscoverLine className="w-6 h-6" /> Khám phá ngay
                    </button>
                </div>
            ) : (
                <>
                    {/* 🔥 Nút Xóa tất cả */}
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={() => dispatch(clearFavorites())}
                            className="px-5 py-2 bg-red-500 text-white font-medium rounded-lg 
                                       shadow-md hover:bg-red-600 transition-all flex items-center gap-2"
                        >
                            <FaTrash className="w-4 h-4" />
                            Xóa tất cả
                        </button>
                    </div>
                    {/* 🔥 Danh sách sản phẩm */}
                    <motion.div
                        key={favorites.length}
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {favorites.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="relative bg-white dark:bg-orange-100 rounded-2xl shadow-2xl 
                                               hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="relative bg-white" onClick={() => navigate(`/product/${item.id}`)}>
                                        <img
                                            src={item.thumb}
                                            alt={item.title}
                                            className="w-full h-96 object-contain rounded-t-2xl"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-900 line-clamp-2">
                                            {item.title}
                                        </h2>
                                        <div className="text-gray-500">{renderStars(item.totalRating)}</div>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                            Giá: <strong className="text-blue-600 dark:text-blue-400">{formatCurrency(item.price)}</strong>
                                        </span>
                                        <div className="mt-auto flex justify-between items-center pt-4">
                                            <button
                                                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white 
                                                           text-sm font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 
                                                           transition-all flex items-center gap-2"
                                                onClick={() => dispatch(removeFromFavorites(item.id))}
                                            >
                                                <FaTrash className="w-4 h-4" />
                                                Xóa
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                                                           text-sm font-medium rounded-lg hover:scale-[1.02] 
                                                           transition-all flex items-center gap-2"
                                                onClick={() => navigate(`/product/${item.id}`) & window.scrollTo(0, 0)}
                                            >
                                                <FaShoppingCart className="w-4 h-4" />
                                                Mua ngay
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default Favorites;
