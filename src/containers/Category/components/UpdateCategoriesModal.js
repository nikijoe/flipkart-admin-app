import React from 'react'

import {Row, Col} from 'react-bootstrap'

import NewModal from '../../../components/UI/Modal'
import Input from '../../../components/UI/Input'

const UpdateCategoriesModal = (props) => {
    
    const {size, handleClose, modalTitle, onHide, handleSavenClose,
            expandedArray, checkedArray,
            handleCategoryInput, handleCategoryImage,
            categoryList, show} = props
    
    return(
        <NewModal show={show} 
        onHide={onHide} handleClose={handleClose} 
        handleSavenClose=
        {handleSavenClose} modalTitle={modalTitle}
        size={size}>
            {
                expandedArray.length > 0 ? 
                expandedArray.map((item, index)=> 
                    <>
                        <Row key={index}>
                            <Col>
                                <h6>Expanded</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input 
                                    value={item.name}
                                    placeholder ={'Category Name'}
                                    onChange={(e)=>handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />                   
                            </Col>
                            <Col>
                                <select className='form-control' 
                                value={item.parentId}
                                onChange={(e)=>handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option>select a category</option>
                                    {categoryList.map(option=> 
                                            <option key={option.value} value={option.value}>{option.name}</option>
                                    )}
                                </select>                   
                            </Col>
                            <Col>
                                        <select className='form-control' value={item.type}
                                        onChange={(e)=>handleCategoryInput('type', e.target.value, index, 'expanded')}>
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">Page</option>
                                        </select>
                            </Col>
                        </Row>
                    </> 
                    ) : 
                    <h6>Nothing Expanded</h6>
            }

            {
                checkedArray.length > 0 ? 
                checkedArray.map((item, index)=> 
                    <>
                        <Row key={index}>
                            <Col>
                                <h6>Selected</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input 
                                    value={item.name}
                                    placeholder ={'Category Name'}
                                    onChange={(e)=>handleCategoryInput('name', e.target.value, index, 'checked')}
                                />                   
                            </Col>
                            <Col>
                                <select className='form-control' 
                                value={item.parentId}
                                onChange={(e)=>handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option>select a category</option>
                                    {categoryList.map(option=> 
                                            <option key={option.value} value={option.value}>{option.name}</option>
                                    )}
                                </select>                   
                            </Col>
                            <Col>
                                        <select className='form-control' 
                                            value={item.type}
                                            onChange={(e)=>handleCategoryInput('type', e.target.value, index, 'checked')}>
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="product">Product</option>
                                            <option value="page">Page</option>
                                        </select>
                            </Col>
                        </Row>
                    </>
                ) : 
                <h6>Nothing Selected</h6>
            }

                <input type='file' name='categoryImage' onChange={handleCategoryImage}/>
        </NewModal>
    )
}

export default UpdateCategoriesModal