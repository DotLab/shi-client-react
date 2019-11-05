import React from 'react';
import Poem from './Poem';
import {onChange, pushHistory} from '../utils';
import queryString from 'query-string';
import {QUERY_ASC, QUERY_DESC, QUERY_DATE, QUERY_VIEWS, QUERY_LIKES,
  FILTER_ALL, FILTER_FOLLOWING, DEFAULT_LIMIT, DEFAULT_SKIP} from '../utils';
import {formatDate, short} from '../utils';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.query = queryString.parse(props.location.search);

    if (!this.query.sort) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }
    if (!this.query.filter) {
      this.query.filter = FILTER_FOLLOWING;
    }

    this.state = {
      q: this.query.q || undefined,
      filter: this.query.filter || FILTER_FOLLOWING,
      order: this.query.order || undefined,
      sort: this.query.sort || undefined,
      limit: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
      _id: null,
      userName: null,
      poems: [],
    };

    this.onChange = onChange.bind(this);
    this.pushHistory = pushHistory.bind(this);
    this.search = this.search.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.toVisit = this.toVisit.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.comment = this.comment.bind(this);
    this.toDetail = this.toDetail.bind(this);
    this.redirectToUserProfile = this.redirectToUserProfile.bind(this);
  }

  async componentDidMount() {
    const token = this.app.state.token;
    if (token === null) {
      try {
        const poems = await this.app.poemList({
          filter: FILTER_ALL,
          sort: this.state.sort,
          order: this.state.order,
          limit: this.state.limit,
          skip: this.state.skip,
          search: this.state.q,
        });
        if (poems) {
          this.setState({poems: poems});
        }
      } catch (err) {
        console.log('error');
      }
    } else {
      try {
        const poems = await this.app.poemList({
          token: this.app.state.token,
          filter: FILTER_FOLLOWING,
          sort: this.state.sort,
          order: this.state.order,
          limit: this.state.limit,
          skip: this.state.skip,
          search: this.state.q,
        });
        if (poems) {
          this.setState({poems: poems});
        }
      } catch (err) {
        console.log('error');
      }
    }
  }

  async componentWillReceiveProps(newprops) {
    this.query = queryString.parse(newprops.location.search);

    if (this.query.sort === undefined) {
      this.query.sort = QUERY_DATE;
      this.query.order = QUERY_DESC;
    }
    if (this.query.filter === undefined) {
      this.query.filter = FILTER_FOLLOWING;
    }
    if (this.app.state.token === null) {
      try {
        const poems = await this.app.poemList({
          filter: FILTER_ALL,
          sort: this.query.sort || undefined,
          order: this.query.order || undefined,
          limit: this.state.limit,
          skip: this.state.skip,
          search: this.query.q || undefined,
        });
        if (poems) {
          this.setState({
            poems: poems,
            q: this.query.q,
            filter: this.query.filter,
            sort: this.query.sort,
            order: this.query.order,
          });
        }
      } catch (err) {
        console.log('error');
      }
    } else {
      try {
        const poems = await this.app.poemList({
          token: this.app.state.token,
          filter: this.query.filter || FILTER_FOLLOWING,
          sort: this.query.sort || undefined,
          order: this.query.order || undefined,
          limit: this.state.limit,
          skip: this.state.skip,
          search: this.query.q || undefined,
        });

        if (poems) {
          this.setState({
            poems: poems,
            q: this.query.q,
            filter: this.query.filter,
            sort: this.query.sort,
            order: this.query.order,
          });
        }
      } catch (err) {
        console.log('error');
      }
    }
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

  toVisit(poemId) {
    this.app.poemVisit({poemId: poemId, token: this.app.state.token});
  }

  async like(poemId) {
    if (this.app.state.token === null) return;
    try {
      await this.app.poemLike({poemId: poemId, token: this.app.state.token});
      this.pushHistory();
    } catch (err) {
      console.log(err);
    }
  }

  async unlike(poemId) {
    if (this.app.state.token === null) return;
    try {
      await this.app.poemUnlike({poemId: poemId, token: this.app.state.token});
      this.pushHistory();
    } catch (err) {
      console.log(err);
    }
  }

  async follow(followId) {
    if (this.app.state.token === null) return;
    try {
      await this.app.userFollowUser({followId: followId, token: this.app.state.token});
      this.pushHistory();
    } catch (err) {
      console.log(err);
    }
  }

  async unfollow(unfollowId) {
    if (this.app.state.token === null) return;
    try {
      await this.app.userUnfollowUser({unfollowId: unfollowId, token: this.app.state.token});
      this.pushHistory();
    } catch (err) {
      console.log(err);
    }
  }

  toDetail(poemId) {
    this.app.history.push(`/poems/${poemId}`);
  }

  redirectToUserProfile(authorUserName) {
    this.app.history.push(`/poets/${authorUserName}`);
  }

  async comment(comment) {
    this.app.comment({poemId: this.state._id, token: this.app.state.token, comment: comment});
  }

  render() {
    const {q, sort, order, filter, poems} = this.state;

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
        <select class="Mx(6px) Bgc(white) Bdrs($bdrs-control)" name="filter" value={filter} onChange={this.changeFilter}>
          <option value={FILTER_FOLLOWING}>following</option>
          <option value={FILTER_ALL}>all</option>
        </select>

      </div>
      <div>
        {poems.map((poem) => <Poem key={poem._id} id={poem._id} authorId={poem.authorId}
          align={poem.align} title={poem.title} body={poem.body} visibility={poem.visibility}
          lastEditDate={formatDate(poem.lastEditDate)} viewCount={poem.viewCount} likeCount={poem.likeCount}
          commentCount={poem.commentCount} preview={short(poem.body)} liked={poem.liked} toDetail={this.toDetail}
          like={this.like} unlike={this.unlike} follow={this.follow} unfollow={this.unfollow}
          redirectToUserProfile={this.redirectToUserProfile}
          toVisit={this.toVisit} app={this.app} comment={this.comment}/>)}
      </div>
    </div>;
  }
}

