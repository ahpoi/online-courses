// Create a new component. This component should produce some HTML
// Take this component's generated HTML and put it on the page (in the DOM)
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search'
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash'

/**
 * What gets generated in Vanilla JS:
 * var App = function App() {
   return React.createElement(
    "div",
    null,
    "hi"
  );
};
 */

const YOUTUBE_API_KEY = '-o8gxvtFZAVqqhiQE';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };
    this.videoSearch('surfboards¬')
  }

  videoSearch(term) {
    YTSearch({ key: YOUTUBE_API_KEY, term: term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {
      this.videoSearch(term)
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={video => this.setState({ selectedVideo: video })}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));