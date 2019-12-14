import React from 'react';
import {Link} from 'react-router-dom';
import {onChange} from '../utils';

const STYPE_INPUT = 'H(44px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdc(t)';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state= {
      userName: '',
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };

    this.onChange = onChange.bind(this);
    this.register = this.register.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  checkPasswordMatch() {
    return (this.state.password === this.state.passwordConfirm);
  }

  async register(e) {
    e.preventDefault();
    try {
      await this.app.userRegister(this.state);
    } catch (err) {
      this.setState({userName: '', email: '', password: '', passwordConfirm: ''});
    }
  }

  render() {
    const {userName, displayName, email, password, passwordConfirm} = this.state;
    return <div>
      <h2 class="Fz(30px)">Sign up</h2>

      <form class="Maw(300px) Mx(a) Bgc(whitesmoke) P($p-panel) Bdrs($bdrs-panel) My(30px)">
        <div>
          <input class={STYPE_INPUT} placeholder="User Name" type="userName" name="userName" value={userName} required onChange={this.onChange}/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYPE_INPUT} placeholder="Display Name" type="displayName" name="displayName" value={displayName} required onChange={this.onChange}/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYPE_INPUT} placeholder="Email" type="email" name="email" value={email} required onChange={this.onChange}/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYPE_INPUT} placeholder="Password" type="password" name="password" value={password} required onChange={this.onChange}/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYPE_INPUT} placeholder="Confirm Password" type="password" name="passwordConfirm" value={passwordConfirm} required onChange={this.onChange}/>
        </div>
        <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" disabled={!this.checkPasswordMatch()} onClick={this.register}>Sign up</button>
      </form>

      <div>
        <Link class="Fz(14px) C(darkred) Td(u):h" to='/login'>Already have an account?</Link>
      </div>
    </div>;
  }
}
