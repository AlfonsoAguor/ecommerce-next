import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Title = styled.h1`
    color: #fff;
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
    @media screen and (min-width: 768px){
        font-size: 3rem;
    }
`;

const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
`;

const Bg = styled.div`
    background-color: #222;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap:40px;
    padding: 40px 0;
    img{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1){
        order: 2;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr .9fr;
        div:nth-child(1){
            order: 0;
        }
        img{
            max-width: 100%;
        }
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;

`;

export default function Featured({product}) {

    const {addProduct} = useContext(CartContext);


    function addFeaturedToCart(){
        addProduct(product._id);
    }

  return (
    <Bg>
        <Center>
            <ColumnsWrapper>
                <Column>
                    <div>
                        <Title>{product.title}</Title>
                        <Desc>{product.description}</Desc>
                        <ButtonsWrapper>
                            <ButtonLink href={'/products/'+product._id} outline white>Leer mas</ButtonLink>
                            <Button white onClick={addFeaturedToCart}>
                            <CartIcon />
                                Añadir al carrito
                            </Button>
                        </ButtonsWrapper>
                    </div>
                </Column>
                <Column>
                    {/*<img src="http://localhost:3000/uploads/1733837982523-iphone-13.png"></img>*/}
                    <img src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/1733837982523-iphone-13.png`}></img>
                </Column>
            </ColumnsWrapper>
        </Center>
    </Bg> 
  );
}
