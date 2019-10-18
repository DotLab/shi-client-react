import React from 'react';

import UserInfo from './UserInfo';
import queryString from 'query-string';
import {onChange, pushHistory} from '../utils';

const QUERY_ASC = 'asc';
const QUERY_DESC = 'desc';
const QUERY_DATE = 'date';
const QUERY_VIEWS = 'views';
const QUERY_LIKES = 'likes';
const QUERY_ALPHABETICAL = 'alphabetical';

export default class PoetListingPage extends React.Component {
  constructor(props) {
    super(props);

    this.query = queryString.parse(props.location.search);
    if (!this.query.sort) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }

    this.state = {
      q: this.query.q || '',
      year: this.query.year || '',
      order: this.query.order || '',
      sort: this.query.sort || '',
    };

    this.onChange = onChange.bind(this);
    this.pushHistory = pushHistory.bind(this);
    this.search = this.search.bind(this);
    this.searchYear = this.searchYear.bind(this);
  }

  componentWillReceiveProps(newprops) {
    this.query = queryString.parse(newprops.location.search);
    if (!this.query.sort) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }

    this.setState({
      q: this.query.q || '',
      year: this.query.year || '',
      order: this.query.order || '',
      sort: this.query.sort || '',
    });
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
      this.query.order = QUERY_DESC;
    }
    this.pushHistory();
  }

  render() {
    const {q, sort, order, year} = this.state;
    return <div>
      <h2>Poets</h2>
      <form>
        <input class="Bdrs($bdrs-control) Mx(4px)" placeholder="Name..." name="q" value={q} onChange={this.onChange} type="text"/>
        <button class="Bgc(black) C(white) Bdrs($bdrs-control)" onClick={this.search}><i class="fas fa-search"></i></button>
      </form>
      <div class="Fz(12px) C(gray) Mt(12px)">
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_DATE ? 'Td(u) C(black)' : '')} onClick={()=> this.changeSort(QUERY_DATE)}>{sort === QUERY_DATE && order === QUERY_ASC ? 'oldest' : 'latest'}</span>
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_VIEWS ? 'Td(u) C(black)' : '')} onClick={()=> this.changeSort(QUERY_VIEWS)}>{sort === QUERY_VIEWS && order === QUERY_ASC ? 'least viewed' : 'most viewed'}</span>
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_LIKES ? 'Td(u) C(black)' : '')} onClick={()=> this.changeSort(QUERY_LIKES)}>{sort === QUERY_LIKES && order === QUERY_ASC ? 'least liked' : 'most liked'}</span>
        <span class={'Mx(6px) Td(u):h ' + (sort === QUERY_ALPHABETICAL ? 'Td(u) C(black)' : '')} onClick={()=> this.changeSort(QUERY_ALPHABETICAL)}>{sort === QUERY_ALPHABETICAL && order === QUERY_ASC ? 'z-a' : 'a-z'}</span>
        <span class="Mx(6px) Td(u):h"> | </span>
        <span class="Mx(6px)">
          active until year <input class="Py(0) W(80px) Ta(e) Bdrs($bdrs-control)" type="number" step="1" name="year" value={year} onChange={this.searchYear}/>
        </span>
      </div>
      <div class="Maw(500px) Mx(a) Mt(12px)">
        <UserInfo/>
        <UserInfo/>
        <UserInfo/>
        <UserInfo/>
        <UserInfo/>
        <UserInfo/>
      </div>
    </div>;
  }
}
