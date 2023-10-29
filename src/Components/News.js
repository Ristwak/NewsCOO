import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `${this.capitalize(this.props.category)} - NewsCOO`;
    }
    async update() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbf1e0e27f894af18dc1a431b104e11d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        this.update();
    }
    prevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.update();
    }
    nextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.update();
    }
    render() {
        return (
            <>
                <h1 className="text-center" style={{margin: '30px 0px', marginTop: '90px' }}>Top {this.capitalize(this.props.category)} Headline</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} publishedAt={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.prevClick} className="btn btn-dark">&larr;</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.nextClick} className="btn btn-dark">&rarr;</button>
                </div>
            </>
        )
    }
}

export default News
