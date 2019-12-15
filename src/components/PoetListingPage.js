import React from 'react';
import UserInfo from './UserInfo';
import queryString from 'query-string';
import {onChange, pushHistory, formatDate} from '../utils';
import {QUERY_ASC, QUERY_DESC, QUERY_DATE, QUERY_VIEWS, QUERY_LIKES, QUERY_ALPHABETICAL,
  FILTER_ALL, CURRENT_YEAR, DEFAULT_LIMIT} from '../utils';

export default class PoetListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.query = queryString.parse(props.location.search);
    if (!this.query.sort) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }

    this.state = {
      q: this.query.q || undefined,
      year: this.query.year || CURRENT_YEAR,
      order: this.query.order || undefined,
      sort: this.query.sort || undefined,
      limit: DEFAULT_LIMIT,
      skip: 0,
      poets: [],
    };

    this.onChange = onChange.bind(this);
    this.pushHistory = pushHistory.bind(this);
    this.search = this.search.bind(this);
    this.searchYear = this.searchYear.bind(this);
    this.userFollow = this.userFollow.bind(this);
    this.userUnfollow = this.userUnfollow.bind(this);
  }

  async componentDidMount() {
    const poets = await this.app.userList({
      token: this.app.state.token,
      filter: FILTER_ALL,
      sort: this.state.sort,
      order: this.state.order,
      limit: DEFAULT_LIMIT,
      skip: this.state.skip,
      activeYearLImit: this.state.year,
      search: this.state.q,
    });
    this.setState({poets: poets});
  }

  async componentWillReceiveProps(newprops) {
    this.query = queryString.parse(newprops.location.search);
    if (!this.query.sort) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }

    this.setState({
      q: this.query.q || undefined,
      year: this.query.year || CURRENT_YEAR,
      order: this.query.order || undefined,
      sort: this.query.sort || undefined,
    });

    const poets = await this.app.userList({
      token: this.app.state.token,
      filter: FILTER_ALL,
      sort: this.state.sort,
      order: this.state.order,
      limit: DEFAULT_LIMIT,
      skip: this.state.skip,
      activeYearLImit: this.state.year,
      search: this.state.q,
    });
    this.setState({poets: poets});
  }

  search(e) {
    e.preventDefault();
    this.query.q = this.state.q;
    this.pushHistory();
  }

  searchYear(e) {
    this.query.year = e.target.value;
    this.pushHistory();
  }

  changeSort(sort) {
    if (this.query.sort === sort && this.query.order === QUERY_ASC) this.query.order = QUERY_DESC;
    else if (this.query.sort === sort) this.query.order = QUERY_ASC;
    else {
      this.query.sort = sort;
      if (sort === QUERY_ALPHABETICAL) {
        this.query.order = QUERY_ASC;
      } else {
        this.query.order = QUERY_DESC;
      }
    }
    this.pushHistory();
  }

  async userFollow(id) {
    await this.app.userFollowUser({followId: id, token: this.app.state.token});
    this.pushHistory();
  }

  async userUnfollow(id) {
    await this.app.userUnfollowUser({unfollowId: id, token: this.app.state.token});
    this.pushHistory();
  }

  render() {
    const {q, sort, order, year, poets} = this.state;

    return <div>
      <h2>Poets</h2>
      <form>
        <input class="Bdrs($bdrs-control) Mx(4px)" placeholder="Name..." name="q" value={q} onChange={this.onChange} type="text"/>
        <button class="Bgc(black) C(white) Bdrs($bdrs-control)" onClick={this.search}><i class="fas fa-search"></i></button>
      </form>
      <div class="Fz(12px) C(gray) Mt(12px)">
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_DATE ? 'Td(u) C(black)' : '')}
          onClick={()=> this.changeSort(QUERY_DATE)}>{sort === QUERY_DATE && order === QUERY_ASC ? 'oldest' : 'latest'}</span>
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_VIEWS ? 'Td(u) C(black)' : '')}
          onClick={()=> this.changeSort(QUERY_VIEWS)}>{sort === QUERY_VIEWS && order === QUERY_ASC ? 'least viewed' : 'most viewed'}</span>
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_LIKES ? 'Td(u) C(black)' : '')}
          onClick={()=> this.changeSort(QUERY_LIKES)}>{sort === QUERY_LIKES && order === QUERY_ASC ? 'least liked' : 'most liked'}</span>
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_ALPHABETICAL ? 'Td(u) C(black)' : '')}
          onClick={()=> this.changeSort(QUERY_ALPHABETICAL)}>{sort !== QUERY_ALPHABETICAL || (sort === QUERY_ALPHABETICAL && order === QUERY_ASC) ? 'a-z' : 'z-a'}</span>
        <span class="Mx(6px) Td(u):h"> | </span>
        <span class="Mx(6px)">
          active until year <input class="Py(0) W(80px) Ta(e) Bdrs($bdrs-control)" type="number" step="1" name="year" value={year} onChange={this.searchYear}/>
        </span>
      </div>
      <div class="Maw(500px) Mx(a) Mt(12px)">
        {poets.map((poet) => <UserInfo key={poet._id} id={poet._id} userName={poet.userName}
          displayName={poet.displayName} lastActiveDate={formatDate(poet.lastActiveDate)} viewCount={poet.viewCount}
          followerCount={poet.followerCount} userFollow={this.userFollow} userUnfollow={this.userUnfollow}
          isFollowing={poet.isFollowing}/>)}
      </div>
    </div>;
  }
}
