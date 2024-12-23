import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import Box from "@/components/Box";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
    @media screen and (min-width: 768px){
        grid-template-columns: 1.2fr .8fr;
    }
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 60px;
    height: 60px;
    padding: 2px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 50px;
        max-height: 50px;
    }
    @media screen and (min-width: 768px){
        padding: 10px;
        width: 100px;
        height: 100px;
        img{
            max-width: 80px;
            max-height: 80px;
        }
    }
`;

const QuantityLabel = styled.span`
    display: block;
    padding: 0 15px;

    @media screen and (min-width: 768px){
        display: inline-block;
        paddinG: 0 10px;
    }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default function CartPage(){
    const {cartProduct, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName ] = useState('');
    const [mail, setMail ] = useState('');
    const [city, setCity ] = useState('');
    const [postalCode, setCode ] = useState('');
    const [address, setAddress ] = useState('');
    const [country, setCountry ] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    {/* Carga los productos si la longitud de cartProduct es menor de 0 */}
    useEffect(() => {
        if(cartProduct.length > 0){
            axios.post('/api/cart', {ids: cartProduct}).then(response => {setProducts(response.data)})
        } else {
            setProducts([]);
        }
    }, [cartProduct]);

    {/* Controla si el pago ha sido efectuado */}
    useEffect(() => {
        if (typeof window === 'undefined') {
          return;
        }
        if (window?.location.href.includes('success')) {
          setIsSuccess(true);
          clearCart();
        }
      }, []);

    {/* Funciones para añadir cantidad o quitar */}
    function moreOfThisProduct(id){
        addProduct(id);
    }

    function lessOfThisProduct(id){
        removeProduct(id);
    }

    {/* Funcion para el pago */}
    async function goToPayment(){
        const response = await axios.post ('/api/checkout', {
            name,mail,city,postalCode,address,country,cartProduct
        });

        if(response.data.url){
            window.location = response.data.url;
        }
    }

    {/* Suma el precio a tantas veces que haya el mismo id */}
    let total = 0;
    for (const productId of cartProduct){
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }
    
    {/* Si el pago ha sido efectuado, muestra esta pagina */}
    if (isSuccess) {
        return (
          <>
            <Header />
            <Center>
              <ColumnsWrapper>
                <Box>
                  <h1>Gracias por el pedido</h1>
                  <p>Recibira un correo</p>
                </Box>
              </ColumnsWrapper>
            </Center>
          </>
        );
      }

    return(
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h3>Carrito</h3>
                        {!products?.length && (
                            <div>No hay productos</div>
                        )}

                        {products?.length > 0 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Productos</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <ProductInfoCell>
                                            <ProductImageBox>
                                                <img src={`${process.env.NEXT_PUBLIC_BACK_URL}${product.images[0]}`} alt={product.title} />
                                            </ProductImageBox>
                                            {product.title}
                                        </ProductInfoCell>

                                        {/* Cuenta cuantas veces aparece el id en el array */}
                                        <td>
                                            <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                            <QuantityLabel>{cartProduct.filter(id => id === product._id).length}</QuantityLabel>
                                            <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                        </td>
                                        <td>{cartProduct.filter(id => id === product._id).length * product.price}€</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td><b>Total:</b></td>
                                    <td>{total}€</td>
                                </tr>
                            </tbody>
                        </Table>
                        )}
                    </Box>

                    {/* la doble admiracion lo convierte en valor booleano, en esta caso seria el true */}
                    {!!cartProduct?.length && (
                        <Box>
                            <h3>Información de orden</h3>
                            <Input type="text" placeholder="Nombre" name="name" value={name} onChange={e => setName(e.target.value)}/>
                            <Input type="text" placeholder="Correo" name="mail" value={mail} onChange={e => setMail(e.target.value)}/>
                            <CityHolder>
                                <Input type="text" placeholder="Ciudad" name="city" value={city} onChange={e => setCity(e.target.value)}/>
                                <Input type="text" placeholder="Codigo postal" name="postalCode" value={postalCode} onChange={e => setCode(e.target.value)}/>
                            </CityHolder>
                            <Input type="text" placeholder="Dirección" name="address" value={address} onChange={e => setAddress(e.target.value)}/>
                            <Input type="text" placeholder="Pais" name="country" value={country} onChange={e => setCountry(e.target.value)}/>
                            <Button blockB black type="submit" onClick={goToPayment}>Continuar con el pago</Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}