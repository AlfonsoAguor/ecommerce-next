import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage(){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
        });
    }, [])

    return(
        <Layout>
            <h1>Ordenes</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Pago</th>
                        <th>Destinatario</th>
                        <th>Productos</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr>
                            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>{order.paid ? 'Pagado' : 'Pendiente'}</td>
                            <td>{order.name} {order.mail} {order.city} {order.postalCode} {order.address} {order.country}</td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data?.product_data.name} x {l.quantity}<br />
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}