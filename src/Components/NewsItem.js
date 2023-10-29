import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl} = this.props;
        return (
            <div className="container my-3">
                <div className="card" style={{width : "18 rem"}}>
                    <img src={imageUrl?imageUrl:"https://th.bing.com/th/id/R.5b20997c32480a03ac0ea68a75d2965d?rik=Sg0Qvaatai0zkg&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2ff%2fZ%2fG%2f4%2fh%2fQ%2fno-image-available-hi.png&ehk=HhFXlnwLHC74XN7SsEPRdGTZQh46G09SKN8BTm9MgJw%3d&risl=&pid=ImgRaw&r=0"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
