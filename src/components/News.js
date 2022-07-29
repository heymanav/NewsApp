import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country : 'in',
    pagesize : 6,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pagesize : PropTypes.number,
    category : PropTypes.string,
  }
  capitalizeFirstLetter=(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  articles = [] 
  constructor (props){
    super(props);
    this.state = {
      articles : this.articles,
      loading : false,
      page : 1,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsBee`;
  }

  async componentDidMount(){
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults,
      loading : false
    })
    this.props.setProgress(100);

  }

  handlePrevClick = async()=>{
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page -1}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page -1,
      articles : parsedData.articles,
      loading :false
    })
    this.props.setProgress(100);
  }
  handleNextClick = async ()=>{
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page +1,
      articles : parsedData.articles,
      loading :false
    })
    this.props.setProgress(100);
  }


  render() {
    return (
      <div className='container my-4'>
        <h1 className='text-center'>NewsBee - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col md-4" key={element.url}>
            <NewsItem title = {element.title?element.title:""} description = {element.description?element.description:""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
          </div>         
        })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &rarr;</button>
        </div>
      </div>
    )
  }
}
