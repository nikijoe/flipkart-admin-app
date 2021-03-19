import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'

import linearCategories from '../../helpers/linearCategories'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { createPage } from '../../actions'

export default function NewPage() {
    
    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const category = useSelector(state => state.category)   
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    const page = useSelector(state => state.page)   

    const dispatch = useDispatch()

    useEffect(() => {
        setCategories(linearCategories(category.categories))
    },[category.categories])
    
    useEffect(() => {
        console.log(page)
        if(!page.loading) {
            setCreateModal(false)
            setTitle('')
            setType('')
            setCategoryId('')
            setDesc('')
            setProducts([])
            setBanners([])
        }
    },[page])

    const onCategoryChange = (e) => {
        const category = categories.find(cate => cate.value === e.target.value)
        setCategoryId(e.target.value)
        setType(category.type)
    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]])
    }

    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = () => {

        if(title === "") {
            alert('Title required')
            // setCreateModal(false)
            return
        }
        if(desc === "") {
            alert('Description required')
            // setCreateModal(false)
            return
        }
        const form = new FormData()
        form.append('title', title)
        form.append('description', desc)
        form.append('category', categoryId)
        form.append('type', type)
        banners.forEach((banner, index)=> {
            form.append('banners', banner)
        })
        products.forEach((product, index)=> {
            form.append('products', product)
        })
        dispatch(createPage(form))
    }

    const renderCreatePageModel =()=> {

        return(
            <Modal
                show={createModal}
                modalTitle="Create New Page"
                handleClose={()=> setCreateModal(false)}
                handleSavenClose={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                value={categoryId}
                                onChange={(e)=>onCategoryChange(e)}
                                className="form-control form-control-sm"
                            >
                                <option value="">select category</option>
                                {categories.map((cate, index)=>
                                    (
                                    <option key={index} value={cate.value}>{cate.name}</option>
                                ))}
                            </select> */}
                            <Input 
                                type='select'
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder='Select Category'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                placeholder='Page Title'
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e)=>setDesc(e.target.value)}
                                placeholder='Page Description'
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            banners.length > 0 ?
                            banners.map((banner, index) => 
                                <Row key={index}>
                                    <Col>{banner.name}</Col>
                                </Row>
                            ) : null
                        }
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name='banners'
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            products.length > 0 ?
                            products.map((product, index) => 
                                <Row key={index}>
                                    <Col>{product.name}</Col>
                                </Row>
                            ) : null
                        }
                        <Col>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name='products'
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        )
    }
    return (
        <Layout sidebar> 
            {
                page.loading ?
                <p>Loading page.. please wait</p> :
                <>
                    {renderCreatePageModel()}
                    <button onClick={()=>setCreateModal(true)}>Create Page</button>
                </>
            }

        </Layout>
    )
}
