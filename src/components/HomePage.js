import React from 'react';
import Poem from './Poem';
import {onChange, pushHistory} from '../utils';
import queryString from 'query-string';

const POEM_1 = `C8H10N4O2  so  softly  calling
Feel  my  energy  level  falling
I­t  faintly  whispers  my name (psss)
But now I'm just stuck stalling     (uh)
I  try but just can't break  free        (so)
"How about some herbal tea?"     (no)
Your  suggestion  is  appalling  (ugh)
But  coffee?  I'm  al­ways  keen
Need that daily hit of caffeine`;

const POEM_1_SHORT = `C8H10N4O2  so  softly  calling
Feel  my  energy  level  falling
I­t  faintly  whispers  my name (psss)
But now I'm just stuck stalling     (uh)`;

const POEM_2 = `everyday will be a new reason
to cry over you
everyday will also be a new reason
to love you

and as long as each day comes,
i'll cry but i'll love you
as if it will be my last`;

const QUERY_ALL = 'all';
const QUERY_FOLLOWING = 'following';
const QUERY_ASC = 'asc';
const QUERY_DESC = 'desc';
const QUERY_DATE = 'date';
const QUERY_VIEWS = 'views';
const QUERY_LIKES = 'likes';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.query = queryString.parse(props.location.search);

    if (!this.query.sort) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }
    if (!this.query.filter) {
      this.query.filter = QUERY_FOLLOWING;
    }

    this.state = {
      q: this.query.q || '',
      filter: this.query.filter || '',
      sort: this.query.sort || '',
      order: this.query.order || '',
    };

    this.onChange = onChange.bind(this);
    this.pushHistory = pushHistory.bind(this);
    this.search = this.search.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.query = queryString.parse(newProps.location.search);

    if (!this.query.sort) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }
    if (!this.query.filter) {
      this.query.filter = QUERY_FOLLOWING;
    }

    this.setState({
      q: this.query.q || '',
      filter: this.query.filter || '',
      sort: this.query.sort || '',
      order: this.query.order || '',
    });
  }

  search(e) {
    e.preventDefault();

    this.query.q = this.state.q;
    this.pushHistory();
  }

  changeFilter(e) {
    this.query.filter = e.target.value;
    this.pushHistory();
  }

  changeSort(sort) {
    if (this.query.sort === sort && this.query.order === QUERY_ASC) this.query.order = QUERY_DESC;
    else if (this.query.sort === sort ) this.query.order= QUERY_ASC;
    else {
      this.query.sort = sort;
      this.query.order = QUERY_DESC;
    }
    this.pushHistory();
  }

  render() {
    const {q, sort, order, filter} = this.state;

    return <div>
      <form class="Mb(20px)">
        <input class="Mend(4px) Bdrs($bdrs-control)" name="q" value={q} onChange={this.onChange} type="text" placeholder="Search..."/>
        <button class="Bgc(black) C(white) Bdrs($bdrs-control)" onClick={this.search}><i class="fas fa-search"></i></button>
      </form>
      <div class="Fz(12px) C(gray)">
        <span class={'Mx(6px) Cur(p) Td(u):h ' + (sort === QUERY_DATE ? 'Td(u) C(black)' : '' )} onClick={()=> this.changeSort(QUERY_DATE)}>{sort === QUERY_DATE && order === QUERY_ASC ? 'oldest' : 'latest'}</span>
        <span class={'Mx(6px) Cur(p) Td(u):h ' + (sort === QUERY_VIEWS ? 'Td(u) C(black)' : '' )} onClick={()=> this.changeSort(QUERY_VIEWS)}>{sort === QUERY_VIEWS && order === QUERY_ASC ? 'least viewed' : 'most viewed'}</span>
        <span class={'Mx(6px) Cur(p) Td(u):h ' + (sort === QUERY_LIKES ? 'Td(u) C(black)' : '' )} onClick={()=> this.changeSort(QUERY_LIKES)}>{sort === QUERY_LIKES && order === QUERY_ASC ? 'least liked' : 'most liked'}</span>
        <span class="Mx(6px)"> | </span>
        <select class="Mx(6px) Bgc(white) Bdrs($bdrs-control)" value={filter} onChange={this.changeFilter}>
          <option value={QUERY_FOLLOWING}>following</option>
          <option value={QUERY_ALL}>all</option>
        </select>

      </div>
      <div>
        <Poem shouldShowEditButton visibility="public" hotness="723" author="MicMag" title="Coffee" date="23h" body={POEM_1} preview={POEM_1_SHORT} />
        <Poem shouldShowEditButton visibility="public" hotness="530" author="last rainy night"
          title="even if it's the last thing i do" date="1w" body={POEM_2} />
      </div>
    </div>;
  }
}

