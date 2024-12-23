import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding-top: 10px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const Title = styled.h2`
    font-size: 2rem;
    padding-top: 20px;
    font-weight: 500;
`;

export default function NewProduct({products}){
    return(
        <Center>
            <Title>Nuevos productos</Title>
            <ProductGrid>
                {products?.length > 0 && products.map(product => (
                    <ProductBox key={product._id} {...product} />
                ))}
            </ProductGrid>
        </Center>
    );
}