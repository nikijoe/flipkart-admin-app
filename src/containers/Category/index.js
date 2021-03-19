import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col} from 'react-bootstrap'
import CheckboxTree from 'react-checkbox-tree'
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload

} from 'react-icons/io'
import Layout from '../../components/Layout'
import { addCategory, updateCategories,
        deleteCategories as deleteCategoriesAction } from '../../actions'
import NewModal from '../../components/UI/Modal'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import AddCategoryModal from './components/AddCategoryModal'
import './style.css'

export default function Category() {

    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState("")
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [categoryType, setCategoryType] = useState('')
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] =useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

    const dispatch = useDispatch()

    const clearVariables = () => {
        setCategoryName('')
        setParentCategoryId('')
        setCategoryImage('')
    }

    const handleSavenClose = () => {
        const form = new FormData()
        if(categoryName === "") {
            alert("Name is required")
            return
        }
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('type', categoryType)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
        setShow(false)
        clearVariables()
    }

    const updateCategory = () => {
        updateCheckedAndUpdatedArray()
        setUpdateCategoryModal(true)
    }

    const handleUCClose = () => {   
        setUpdateCategoryModal(false)
    }

    const updateCategoriesForm = () => {
        const form = new FormData()
        expandedArray.forEach((item, index)=> {
            form.append('_id' , item.value)
            form.append('name' , item.name)
            form.append('parentId' , item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })
        checkedArray.forEach((item, index)=> {
            form.append('_id' , item.value)
            form.append('name' , item.name)
            form.append('parentId' , item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false)
    }

    const updateCheckedAndUpdatedArray = () => {
        const categories = createCategoryList(category.categories)
        const checkedArray = []
        const expandedArray = []
        checked.length > 0  && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index)=> categoryId === category.value)
            category && checkedArray.push(category)

        })
        expanded.length > 0  && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index)=> categoryId === category.value)
            category && expandedArray.push(category)

        })
        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
    }

    const handleShow = () => {
        clearVariables()
        setShow(true)
    }

    const handleClose = () => {
        clearVariables()
        setShow(false)
    }

    const renderCategories = (categories) => {
        let myCategories = []
        for(let category of categories){
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return myCategories
    }

    const createCategoryList =(categories, options =[]) => {
        for (let category of categories){
            options.push({value: category._id, name: category.name, parentId: category.parentId, type: category.type })
            if (category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    const handleCategoryInput = (key, value, index, type) => {
        if(type === 'checked'){
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? {...item, [key]: value} : item)
            setCheckedArray(updatedCheckedArray)
        } else if(type==='expanded'){
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? {...item, [key]: value} : item)
            setExpandedArray(updatedExpandedArray)
        }
    }


    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const deleteCategory =() => {
        updateCheckedAndUpdatedArray()
        setDeleteCategoryModal(true)
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}))
        // const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}))
        // const idsArray = expandedIdsArray.concat(checkedIdsArray)

        if(checkedIdsArray.length > 0){
            dispatch(deleteCategoriesAction(checkedIdsArray))
        }
        setDeleteCategoryModal(false)
    }

    const renderDeleteCategoryModal = () => {
        return (
            <NewModal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={()=> setDeleteCategoryModal(false)}
                buttons = {[
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    },
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => setDeleteCategoryModal(false)
                    }
                ]}
            >
                <h5>Expanded</h5>
                {
                    expandedArray.map((item, index) =>
                        <span key={index}>{item.name}</span>
                    )
                }
                <h5>Selected</h5>
                {
                    checkedArray.map((item, index) => 
                            <span key={index}>{item.name}</span>
                    )
                }
            </NewModal>
        )
    }

    const categoryList = createCategoryList(category.categories)

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions:</span>
                                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload /><span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>
                            { renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked =>setChecked(checked)}
                            onExpand={expanded =>setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <UpdateCategoriesModal 
               show={updateCategoryModal} 
               onHide={handleUCClose} handleClose={handleUCClose} 
               handleSavenClose=
               {updateCategoriesForm} modalTitle="Update Categories"
               size='lg' expandedArray={expandedArray}
               checkedArray={checkedArray} 
               handleCategoryInput={handleCategoryInput}
               handleCategoryImage={handleCategoryImage}
               categoryList = {categoryList}
            />
            <AddCategoryModal show={show} onHide={handleClose} handleClose={handleClose} 
                handleSavenClose={handleSavenClose} modalTitle="Add New Category"
                handleCategoryImage={handleCategoryImage}
                categoryList={categoryList}
                categoryName={categoryName} setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                setCategoryType={setCategoryType} categoryType={categoryType}
            />
            {renderDeleteCategoryModal()}
        </Layout>
    )
}
