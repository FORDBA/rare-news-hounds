import React, { useContext, useEffect, useRef } from "react"
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";
import CancelEditButton from "./CancelEditButton";
import { Row } from "react-bootstrap";

export const PostForm = (props) => {
    const {createPost, updatePost, getPostById} = useContext(PostContext)
    const {categories, getCategories} = useContext(CategoryContext)

    const titleRef = useRef("")
    const categoryRef = useRef("")
    const imageRef = useRef("")
    const contentRef = useRef("")
    const publicationRef = useRef("")

    const isEditMode = props.match.params.hasOwnProperty("postId")

    useEffect(()=>{
        getCategories().then(() => {
          if(isEditMode) {
            getPostById(props.match.params.postId)
              .then(populateFormValues)
          }
        })
    },[])

    const populateFormValues = post => {
      titleRef.current.value = post.title
      categoryRef.current.value = post.category_id
      imageRef.current.value = post.image
      contentRef.current.value = post.content

      // HTML date inputs take their value in the format YYYY-MM-DD
      publicationRef.current.value = moment(post.publication_time + 86400000).format(
        "YYYY-MM-DD"
      );
    }

    const constructNewPost = () => {
        if (titleRef.current.value === "") {
            window.alert("Please fill in a title")
        } else if(categoryRef.current.value === '0') {
            window.alert("Please select a category")
        } else if (publicationRef.current.value === "") {
            window.alert("Please select a publication date")
        }/*else if (imageRef.current.value === "") {
            window.alert("Please add an image URL")
        }*/else if (contentRef.current.value === "") {
            window.alert("Please fill out content")
        } else {
          // validation success - create a new object from the form inputs and then either save or update it
          const newPostObject = {
            user_id: localStorage.getItem('rare_user_id'),
            title: titleRef.current.value,
            category_id: categoryRef.current.value,
            image: imageRef.current.value,
            content: contentRef.current.value,
            publish_status: true,
            approve_status: true,
            publication_time: publicationRef.current.valueAsNumber
          }

          if(isEditMode) {
            updatePost(props.match.params.postId, newPostObject)
              .then(() => props.history.push(`/posts/${props.match.params.postId}`))
          }
          else {
            newPostObject.creation_time = Date.now()
            createPost(newPostObject)
              .then((newPost) => props.history.push(`/posts/${newPost.id}`))
          }
        }
    }

    return (
        <Form>
            <h1 className="text-center my-4">
              { isEditMode ? "Edit Post" : "Create New Post" }
            </h1>
            <FormGroup controlId ="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" ref={titleRef} />
            </FormGroup>
            <FormGroup controlId="categorySelect">
            <Form.Label>Category</Form.Label>
                <Form.Control as="select" ref={categoryRef}>
                <option value ="0">Select a category</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
                </Form.Control>
            </FormGroup>
            <FormGroup>
                <Form.Label>Publish Date</Form.Label>
                <Form.Control type="date" ref={publicationRef} disabled={isEditMode} /> 
            </FormGroup>
            <FormGroup controlId ="text">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Image Url" ref={imageRef} />
            </FormGroup>
            <FormGroup controlId ="text">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter post..." ref={contentRef} />
            </FormGroup>
            <Row className="justify-content-end">
                {isEditMode && <CancelEditButton action={props}/>}
                <Button variant="success" 
                    type="submit" 
                    className="ml-2"
                    onClick={e=> {
                        e.preventDefault()
                        constructNewPost()
                    }}>Save Post</Button>
            </Row>
        </Form>    
    )

}