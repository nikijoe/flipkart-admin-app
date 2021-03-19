import React from 'react'
import {Row, Col} from 'react-bootstrap'
import NewModal from '../../../components/UI/Modal'
import Input from '../../../components/UI/Input'

const AddCategoryModal = (props) => {

    const {show, onHide, handleClose, handleSavenClose, modalTitle, 
            handleCategoryImage, categoryType,
            categoryList, categoryName, setCategoryType,
            setCategoryName, parentCategoryId, setParentCategoryId
        } = props

    return(
        <NewModal show={show} onHide={onHide} handleClose={handleClose} 
        handleSavenClose={handleSavenClose} modalTitle={modalTitle}>
            <Row>
                <Col>
                    <Input 
                        value={categoryName}
                        placeholder ={'Category Name'}
                        onChange={(e)=>setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select className='form-control form-control-sm' 
                    value={parentCategoryId}
                    onChange={(e)=> setParentCategoryId(e.target.value)}>
                        <option>select a category</option>
                        {categoryList.map(option=> 
                                <option key={option.value} value={option.value}>{option.name}</option>
                        )}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <select className='form-control  form-control-sm' value={categoryType}
                        onChange={(e)=>setCategoryType(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page">Page</option>
                    </select>
                </Col>
                <Col>
                    <input type='file' name='categoryImage' onChange={handleCategoryImage}/>
                </Col>
            </Row>
        </NewModal>
    )
}

export default AddCategoryModal