import { useQuery } from 'react-query';
import axios from 'axios';

const Cart = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery('cartProducts', async () => {
    const response = await axios.get('/api/products');
    return response.data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Tính toán tổng tạm tính và tổng đơn hàng
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const total = subtotal; // Có thể thêm phí vận chuyển và thuế vào đây

  return (
    <section className="cart-product-cart-area">
      <div className="container">
        <div className="cart-product-cart-wrap">
          <div className="product-table-heading">
            <h4 className="title">Giỏ hàng của bạn</h4>
            <a href="cart/deleteAllCart" className="cart-clear">
              Xoá tất cả sản phẩm
            </a>
          </div>
          <div className="table-responsive">
            <table className="table cart-product-table mb--40">
              <thead>
                <tr>
                  <th scope="col" className="product-remove"></th>
                  <th scope="col" className="product-thumbnail">
                    Sản phẩm
                  </th>
                  <th scope="col" className="product-title"></th>
                  <th scope="col" className="product-price">
                    Giá
                  </th>
                  <th scope="col" className="product-quantity">
                    Số lượng
                  </th>
                  <th scope="col" className="product-subtotal">
                    Tạm tính
                  </th>
                </tr>
              </thead>
              <tbody id="cart_main">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="product-remove">
                      <button>Xoá</button>
                    </td>
                    <td className="product-thumbnail">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="product-title">{product.name}</td>
                    <td className="product-price">${product.price}</td>
                    <td className="product-quantity">{product.quantity}</td>
                    <td className="product-subtotal">
                      ${product.price * product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div id="not-cart-main"></div>
          </div>
          <div className="row">
            <div className="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5">
              <div className="cart-order-summery mt--80">
                <h5 className="title mb--20">Tóm tắt đơn hàng</h5>
                <div className="summery-table-wrap">
                  <table className="table summery-table mb--30">
                    <tbody>
                      <tr className="order-subtotal">
                        <td>Tạm tính</td>
                        <td id="order-subtotal">${subtotal}</td>
                      </tr>
                      <tr className="order-total">
                        <td>Tổng</td>
                        <td
                          id="order-total-amount"
                          className="order-total-amount"
                        >
                          ${total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a href="checkout" className="btn-custom">
                  Tiến hành thanh toán
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
