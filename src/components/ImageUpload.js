import React from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { toast } from 'react-toastify';
import { Button, Icon, Grid, Image, Segment, Loader, Dimmer } from 'semantic-ui-react';

// const CLOUDINARY_UPLOAD_PRESET = 't8jlzjjv'

export default class ImageUpload extends React.Component {

    state = {
        loading: false,
        uploadedFileCloudinaryUrl: '',
        CLOUDINARY_UPLOAD_PRESET: this.props.preset || 't8jlzjjv',
        CLOUDINARY_UPLOAD_URL: 'https://api.cloudinary.com/v1_1/dm7moiolo/image/upload'
    }

    onImageDrop = files => {
        this.setState({ uploadedFile: files[0], loading: true })
        this.handleImageUpload(files[0])
    }

    handleImageUpload = file => {
        let upload = request.post(this.state.CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', this.state.CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file)
        upload.end((err, response) => {
            if(err){
                toast.error(err, {containerId: 'messages'})
            }
            if(response.body.secure_url !== ''){
                this.props.setImage(response.body.secure_url)
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url,
                    loading:false
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Dropzone
                    onDrop={this.onImageDrop.bind(this)}
                    accept="image/*"
                    multiple={false}>
                    {({ getRootProps, getInputProps }) => {
                        return (
                            <Grid style={{marginBottom: '1em'}}>
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <div {...getRootProps()}  >
                                            <Button fluid >
                                                <input {...getInputProps()} />
                                                <Icon name='upload' />
                                                Upload Image
                                            </Button>
                                        </div>
                                        <Segment textAlign='left' style={{overflow:'hidden'}}>
                                            {this.state.uploadedFileCloudinaryUrl === '' ? 'No file selected.' : this.state.uploadedFile.name}
                                        </Segment>
                                    </Grid.Column>

                                    <Grid.Column width={6}>
                                        { this.state.loading && <Dimmer active ><Loader active size='large'>Loading</Loader></Dimmer>}
                                        <Image floated='right' src={this.state.uploadedFileCloudinaryUrl === '' ? this.props.image : this.state.uploadedFileCloudinaryUrl}  size='small' style={{backgroundColor:'white', borderRadius: '4px'}}/>   
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )
                    }}

                </Dropzone>
            </div>
        )
    }
}