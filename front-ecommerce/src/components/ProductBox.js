import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
    
`;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.2);
    img{
        max-width: 100%;
        max-height: 100%;
    }
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: .9rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

const PriceRow=styled.div`
    display: block;
    @media screen and (min-width: 768px){
        display: flex;
        div:nth-child(2){
            margin-left: 10px;
        }
    }
`;

const Price = styled.div`
    font-size: 1rem;
    font-weight: 500;
    @media screen and (min-width: 768px){
        font-size: 1.5rem;
        text-align: left;
    }
`;

export default function ProductBox({_id, title, description, price, images}){
    const url= '/product/'+_id;

    const {addProduct} = useContext(CartContext);

    return(
        <ProductWrapper>
            <WhiteBox href={url}>
                <img src={`${process.env.NEXT_PUBLIC_BACK_URL}${images[0]}`} alt={title} />
            </WhiteBox>

            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>
                        {price}€
                    </Price>
                    <div>
                        <Button blockB primary outline onClick={() => addProduct(_id)}>
                            Añadir <CartIcon />
                        </Button>
                    </div>
                </PriceRow>
            </ProductInfoBox>

        </ProductWrapper>
    );
}

