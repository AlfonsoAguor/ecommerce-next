import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
    padding-top: 10px;
`;


export default function ProductsPage({products}){
    console.log({products});
    return(
        <>
            <Header />
            <Center>
                <Title>Todos los productos</Title>
                <ProductGrid>
                    {products?.length > 0 && products.map(product => (
                        <ProductBox key={product._id} {...product} />
                    ))}
                </ProductGrid>
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});

    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
        }
    };
    
}