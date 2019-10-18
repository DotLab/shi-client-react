import React from 'react';
import {Link} from 'react-router-dom';
import {onChange} from '../utils';

const STYPE_INPUT = 'H(44px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdc(t)';


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = onChange.bind(this);
  }

  login(e) {
    e.preventDefault();
  }

  render() {
    return <div>
      <h2 class="Fz(30px)">Log in</h2>
      <form class="Maw(300px) Mx(a) Bgc(whitesmoke) P($p-panel) Bdrs($bdrs-panel) My(30px)">
        <div>
          <input class={STYPE_INPUT} placeholder="Email address" type="email" name="email" onChange={this.onChange} required/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYPE_INPUT} placeholder="Password" type="password" name="password" onChange={this.onChange} required/>
        </div>
        <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>Log in</button>
      </form>
      <div>
        <Link class="Fz(14px) C(darkred) Td(u):h" to='/register'>Don't have an account?</Link>
      </div>
    </div>;
  }
}

