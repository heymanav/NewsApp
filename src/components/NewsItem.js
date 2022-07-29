import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props
    return (
      <div className="my-3">
        <div className="card" style={{width: "23.5rem"}}>
        <div style={{display:"flex",justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className="badge rounded-pill bg-danger" style={{left : '90%',zIndex : '1'}}>
        {source}
        </span>
        </div>
          <img src={!imageUrl?"http://vskills.in/certification/blog/wp-content/uploads/2015/01/structure-of-a-news-report.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
             {description}
            </p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} <br />on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href= {newsUrl} target = "_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
