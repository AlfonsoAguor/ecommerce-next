import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProduct from "@/components/NewProducts";

export default function Home({ featuredProduct, newProducts }) {

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProduct products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '675844d0fa56d0c05eb1672d';
  
  try {
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});

    return {
      props: { 
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts))
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      featuredProduct: { featuredProduct: null, newProducts: [] },
    };
  }
}
