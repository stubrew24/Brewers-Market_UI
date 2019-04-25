import React from 'react'
import { Image } from 'semantic-ui-react'

export default class Hero extends React.Component{
    render(){
        return (
            <div style={{width: '100%', height: '12em', overflow: 'hidden'}}>
                <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/8d2bf716146169.562ad1a7388b8.jpg" style={{ objectFit: 'cover', height: '12em', width: '100%'}}/>
            </div>
        )
    }
}