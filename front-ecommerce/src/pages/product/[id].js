import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Box from "@/components/Box";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { CartContext } from "@/components/CartContext";
import { useContext } from "react";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 40px 0;
    @media screen and (min-width: 768px){
        grid-template-columns: .8fr 1.2fr;
    }
`;

const PriceRow= styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const Price = styled.span`
    font-size: 1.4rem;
`;

export default function ProductPage({product}){
    const {addProduct} = useContext(CartContext);

    return(
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product.images}/>
                    </Box>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <Price>{product.price}€</Price>
                            <Button primary onClick={() => addProduct(product._id)}><CartIcon />Añadir al carrito</Button>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);

    return {
        props:{
            product: JSON.parse(JSON.stringify(product)),
        }
    };
}