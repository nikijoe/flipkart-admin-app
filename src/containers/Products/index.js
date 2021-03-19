import React, {useState} from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { addProduct } from '../../actions'

import Input from '../../components/UI/Input' 
import Layout from '../../components/Layout'
import NewModal from '../../components/UI/Modal'
import {generatePublicUrl} from '../../urlConfig'

import './style.css'
import { deleteProductById } from '../../actions'

export default function Products() {

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [productPictures, setProductPictures] = useState([])
    const [show, setShow] = useState(false)
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)
    const categories = useSelector(state => state.category)
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const createCategoryList =(categories, options =[]) => {
        for (let category of categories){
            options.push({value: category._id, name: category.name })
            if (category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    const handleProductPictures= (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }

    const clearVariables = () => {
        setName('')
        setQuantity('')
        setPrice('')
        setDescription('')
        setProductPictures([])
    }
    const handleSavenClose = () => {
        const form = new FormData()
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', category)
        for(let pic of productPictures){
            form.append('productPictures', pic)
        }
        dispatch(addProduct(form))
        clearVariables()
        setShow(false)
    }
    const handleClose = () => {
        clearVariables()
        setShow(false)
    }
    const handleShow = () => {
        clearVariables()
        setShow(true)
    }
        
    const renderProducts = () => {
        return (
            <Table style={{fontSize: '12px'}} responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                {/* <th>Description</th> */}
                <th>Category</th>
                <th>Product Pictures</th>
              </tr>
            </thead>
            <tbody>
                {
                    products.products.length > 0 ? 
                    products.products.map(product => 
                        <tr key={product._id}>
                        <td>1</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        {/* <td>{product.description}</td> */}
                        <td>{product.category.name}</td>
                        <td>
                            <button onClick={() => showProductDetailModal(product)}>
                                info
                            </button>
                            <button onClick={() => {
                                const payload = {
                                    productId: product._id
                                }
                                dispatch(deleteProductById(payload))
                            }}>del</button>
                        </td>
                        </tr>
                    ) : null
                }
            </tbody>
          </Table>
        )
    }

    const showProductDetailModal = (product) => {
        setProductDetails(product)
        setProductDetailModal(true)
    }    
    
    const renderAddProductModal = () => {
        return (
            <NewModal show={show} onHide={handleClose} handleClose={handleClose} handleSavenClose=
            {handleSavenClose} modalTitle="Add New Product">
                <Input 
                    value={name}
                    placeholder ={'Product Name'}
                    onChange={(e)=>setName(e.target.value)}
                />
                <Input 
                    value={quantity}
                    placeholder ={'Quantity'}
                    onChange={(e)=>setQuantity(e.target.value)}
                />
                <Input 
                    value={price}
                    placeholder ={'Price'}
                    onChange={(e)=>setPrice(e.target.value)}
                />
                <Input 
                    value={description}
                    placeholder ={'Description'}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <select className='form-control' 
                value={category}
                onChange={(e)=> setCategory(e.target.value)}>
                    <option>select a category</option>
                    {createCategoryList(categories.categories).map(option=> 
                            <option key={option.value} value={option.value}>{option.name}</option>
                    )}
                </select>

                {
                    productPictures.length > 0 ? 
                    productPictures.map((pic, index) => <div key={index}>{pic.name}</div>): null
                }
                <input type='file' name='productPictures' onChange={handleProductPictures}/>
            </NewModal>
        )
    }

    const renderProductDetailsModal = () => {
        if(!productDetails)
            return null

        return (
            <NewModal show={productDetailModal} 
                handleClose={(handleCloseProductDetailsModal)}
                modalTitle={'Product Details'} size='lg'
            >
                <Row>
                    <Col md='6'>
                        <label className='key'>Name</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md='6'>
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <label className='key'>Quantity</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md='6'>
                        <label className='key'>Category</label>
                        <p className='value'>{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <label className='key'>Description</label>
                        <p className='value'>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{display: 'flex'}}>
                            {productDetails.productPictures.map(picture => 
                                <div key={picture._id} className="productImgContainer">
                                    <img alt="pic" src={generatePublicUrl(picture.img)} />
                                </div>
                                )}
                        </div>
                    </Col>
                </Row>
            </NewModal>
        )
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false)
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailsModal()}
        </Layout>
    )
}
