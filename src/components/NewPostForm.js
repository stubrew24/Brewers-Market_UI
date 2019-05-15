import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import ImageUpload from './ImageUpload'
import { API_BASE } from '../API'
import { toast } from 'react-toastify';

export default class NewPostForm extends React.Component {

    state = {
        imageUploaders: 0,
        title: '',
        content: '',
        images: [],
        brewery_id: this.props.brewery
    }

    addImageField = () => {
        if (this.state.imageUploaders < 3) this.setState({imageUploaders: this.state.imageUploaders + 1})
    }
    handleSubmit = () => {
        fetch(API_BASE + 'posts', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(this.state)})
            .then(resp => resp.json())
            .then(response => {
                if (response.errors) {
                    response.errors.map(err => toast.error(err, {containerId: 'messages'}))
                } else {
                    toast.success('Post saved.', {containerId: 'messages'})
                    this.setState({title: '', content: '', images: []})
                    this.props.refreshData()
                }
            })
    }

    setImage = (image_url) => {
        if (this.state.images.length < 3){
            this.setState({images: [...this.state.images, image_url]})
        }
    }

    validate = () => {
        if (!this.state.title || !this.state.content) {
            return true
        } else {
            return false
        }
    }

    render(){
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input value={this.state.title} onChange={e => this.setState({title: e.target.value})} placeholder={'Title'} />
                    <Form.TextArea value={this.state.content} onChange={e => this.setState({content: e.target.value})} placeholder={'Content'}/>
                    <Button type="submit" positive floated={'right'} disabled={this.validate()}>Post</Button>
                </Form>
                <div style={{marginBottom:'2em'}}>
                    <Button onClick={this.addImageField} disabled={!(this.state.imageUploaders < 3)}>Add Image</Button>
                </div>  
                    {Array.from(Array(this.state.imageUploaders)).map((x, index) => <ImageUpload key={index} setImage={this.setImage} preset={'agmsviun'} />) }
            </React.Fragment>
        )
    }
}