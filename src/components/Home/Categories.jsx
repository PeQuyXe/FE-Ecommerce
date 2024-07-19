import { useQuery } from 'react-query';
import axios from 'axios';

const Categories = () => {
  const {
    data: dataCate,
    isLoading,
    error,
  } = useQuery('categories', async () => {
    const response = await axios.get('http://localhost:8080/api/categories');
    return response.data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error:', error);
    return null;
  }

  if (!Array.isArray(dataCate)) {
    console.error('Error: Data không nhận dữ liệu mảng');
    return null;
  }

  return (
    <section className="home-category">
      <div className="container mx-auto px-4">
        <div className="title mb-8">
          <span className="title-highlighter highlighter-secondary flex items-center">
            <i className="far fa-tags mr-2"></i> Danh mục
          </span>
          <h2 className="text-2xl font-bold">Tìm kiếm theo danh mục</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {dataCate.map((cateItem) => (
            <a
              href={`/product-category?category=${cateItem.id}`}
              key={cateItem.id}
              className="group block relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out"
            >
              <img
                className="w-full h-auto object-cover"
                src={`/src/assets/category/${cateItem.image}`}
                alt={cateItem.name}
                height={30}
                width={30}
              />
              <h6 className="text-center text-sm mt-2">{cateItem.name}</h6>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
