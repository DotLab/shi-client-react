import React from 'react';
import {Link} from 'react-router-dom';

const ROUTE_INVALID = 'invalid';
const ROUTE_POETS = 'poets';
const ROUTE_WORDS = 'words';
const ROUTE_PROFILE = 'profile';
const ROUTE_SETTINGS = 'settings';
const ROUTE_LOGOUT = 'logout';


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.changePath = this.changePath.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToEdit = this.redirectToEdit.bind(this);
  }

  changePath(e) {
    if (e.target.value === ROUTE_POETS) {
      this.props.history.push('/poets');
    } else if (e.target.value === ROUTE_WORDS) {
      this.props.history.push('/words');
    } else if (e.target.value === ROUTE_PROFILE) {
      this.props.history.push('/me');
    } else if (e.target.value === ROUTE_SETTINGS) {
      this.props.history.push('/settings');
    } else if (e.target.value === ROUTE_LOGOUT) {
      this.props.history.push('/logout');
    }
  }

  redirectToLogin() {
    this.props.history.push('/login');
  }

  redirectToEdit() {
    this.props.history.push('/edit');
  }

  render() {
    const isLoggedIn = this.app.state.token;

    return <div>
      <div class="Bgc(black) C(white) H(50px) Pos(st) T(0) Mb(20px)">
        <span className="Fl(start) Lh(50px) Pos(r)">
          <span class="C(gray) C(white):h Cur(p) Mstart(30px)">
            <i class="fas fa-bars"></i>
            <select class="Pos(a) D(b) W(50px) H(50px) T(0) Start(0) Op(0)" value={ROUTE_INVALID} onChange={this.changePath}>
              <option value={ROUTE_INVALID} disabled>---</option>
              <option value={ROUTE_POETS}>Poets</option>
              <option value={ROUTE_WORDS}>Words</option>
            </select>
          </span>
          <span class="C(gray) C(white):h Cur(p) Mstart(30px)"><i class="fas fa-search"></i></span>
        </span>

        <h1 class="Fz(26px) Lh(50px) D(ib) Cur(p)"><Link className="C(white) C(white):h Td(n):h" to="/">Scarletea</Link></h1>
        <span className="Fl(end) Lh(50px)">
          { isLoggedIn &&
          <span class="C(gray) C(white):h Cur(p) Mend(30px)" onClick={this.redirectToEdit}><i class="fas fa-edit"></i></span>}
          {/* { isLoggedIn &&  */}
          <span class="C(gray) C(white):h Cur(p) Mend(30px) Pos(r) D(ib)">
            <i class="fas fa-user"></i>
            <select class="Pos(a) D(b) W(50px) H(50px) T(0) End(-15px)  Op(0)" value={ROUTE_INVALID} onChange={this.changePath}>
              <option value={ROUTE_INVALID} disabled>---</option>
              <option value={ROUTE_PROFILE}>My Profile</option>
              <option value={ROUTE_SETTINGS}>Settings</option>
              <option value={ROUTE_LOGOUT}>Log Out</option>
            </select>
          </span>
          {/* } */}
          {!isLoggedIn&&
          <span class="C(gray) C(white):h Cur(p) Mend(30px)" onClick={this.redirectToLogin}><i class="fas fa-sign-in-alt"></i></span>
          }
        </span>
      </div>

    </div>;
  }
}

