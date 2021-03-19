import React, { useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { updateOrder } from '../../actions'

import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import './style.css'

export default function Orders() {
    const order = useSelector(state=> state.order)
    const [type, setType] = useState("")
    const dispatch = useDispatch()

    const onOrderUpdate = (orderId) => {
        const payload ={
           orderId, type
        }
        dispatch(updateOrder(payload))
    }

    const formatDate =(date) => {
        if (date) {
            const d = new Date(date)
            return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
        }
        return ""
    }

    return (
        <Layout sidebar>
            {
                order.orders.map((orderItem, index)=> 
                    <Card style={{margin: "10px 0"}}
                    headerleft={orderItem._id} key={index}>
                        <div style={{
                            padding: '50px 50px',
                            display:'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <div className='title'>Items</div>
                                {orderItem.items.map((item, index)=> 
                                    <div className='value' key={index}>
                                        {item.productId.name}
                                    </div>
                                )}
                            </div>
                            <div>
                                <span className='title'>Total Price</span>
                                <br />
                                <span className='value'>{orderItem.totalAmount}</span>
                            </div>
                            <div>
                                <span className='title'>Payment Type</span>
                                <span className='value'>{orderItem.paymentType}</span>
                            </div>
                            <div>
                                <span className='title'>Payment Status</span>
                                <span className='value'>{orderItem.paymentStatus}</span>
                            </div>
                            </div>
                            <div style={{
                                padding: '100px',
                                boxSizing: 'border-box',
                                alignItems: 'center',
                                display: 'flex'
                                }}>
                                <div className='orderTrack'>
                                    {
                                        orderItem.orderStatus.map((status, index) =>
                                            <div className={`orderStatus ${
                                                status.isCompleted ? "active" : ""
                                                }`}  key={index}>
                                                <div className={`point ${status.isCompleted ? 'active' : ""}`}>
                                                </div>
                                                <div className='orderInfo'>
                                                    <div className='status'>{status.type}</div>
                                                    <div className='date'>{formatDate(status.date)}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            <div
                                style={{
                                    padding: "0 50px",
                                    boxSizing: "border-box",
                                }}
                                >
                                <select onChange={(e) => setType(e.target.value)}>
                                    <option value={""}>select status</option>
                                    {orderItem.orderStatus.map((status) => {
                                    return (
                                        <>
                                        {!status.isCompleted ? (
                                            <option key={status.type} value={status.type}>
                                            {status.type}
                                            </option>
                                        ) : null}
                                        </>
                                    );
                                    })}
                                </select>
                            </div>
                            <div style={{
                                padding: '0 50px',
                                boxSizing: 'border-box'
                            }}>
                                <button onClick={()=>onOrderUpdate(orderItem._id)}>confirm</button>
                            </div>
                        </div>
                    </Card>
                )
            }
        </Layout>
    )
}
