import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Component } from 'react';
import css from './App.module.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Audio } from 'react-loader-spinner';

const BASEURL = 'https://pixabay.com/api/';
const KEY = '34327121-8f2f868c5eb1d27b3154ab1d3';

export class App extends Component {
  state = {
    search: '',
    articles: [],
    page: 1,
    total: 0,
    isLoading: false,
    showModal: false,
  };
  onSubmitButton(values) {
    if (values.search.trim()) {
      this.setState({
        search: values.search,
        page: 1,
        articles: [],
        total: 0,
        isLoading: true,
        currentImage: '',
      });
    } else {
      Notiflix.Notify.failure('Please write something.');
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if ((search && prevState.search !== search) || prevState.page !== page) {
      try {
        const response = await axios.get(
          `${BASEURL}?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        // eslint-disable-next-line
        response.data.hits.map(obj => {
          const article = {
            id: obj.id,
            webformatURL: obj.webformatURL,
            largeImageURL: obj.largeImageURL,
          };
          this.setState(prevState => ({
            articles: [...prevState.articles, article],
            isLoading: false,
          }));
        });
        const totalHits = await response.data.totalHits;

        this.setState({
          total: totalHits,
        });
        if (totalHits > 0 && page === 1) {
          Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        }
        if (totalHits === 0) {
          this.setState({
            search: '',
            articles: [],
            page: 1,
            total: 0,
            isLoading: false,
          });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch {
        Notiflix.Notify.failure('Something was wrong. Please try again.');
        this.setState({
          search: '',
          articles: [],
          page: 1,
          total: 0,
          isLoading: false,
        });
      }
    }
  }
  onLoadMore() {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  }

  onPics(e) {
    this.setState({
      currentImage: e.target.dataset.link,
      showModal: true,
    });
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.setState({
          showModal: false,
        });
      }
    });
  }
  modalHidden(e) {
    if (e.target.nodeName === 'DIV') {
      this.setState({
        showModal: false,
      });
    }
  }

  render() {
    const { showModal, isLoading, articles, total, currentImage } = this.state;
    return (
      <div className={css.App}>
        {showModal && (
          <Modal img={currentImage} close={this.modalHidden.bind(this)} />
        )}
        <Searchbar onSubmit={this.onSubmitButton.bind(this)} />
        {isLoading && (
          <div className={css.Loader}>
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
        <ImageGallery pics={articles} onPics={this.onPics.bind(this)} />
        {articles.length !== 0 && articles.length < total && (
          <Button onLoadMore={this.onLoadMore.bind(this)} />
        )}
      </div>
    );
  }
}
