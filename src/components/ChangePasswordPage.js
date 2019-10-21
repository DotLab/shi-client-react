import React from 'react';
import {Link} from 'react-router-dom';
import {onChange} from '../utils';

const STYPE_INPUT = 'H(44px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdc(t)';

export default class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.onChange = onChange.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
      currentPassword: '',
      newPassword: '',
    };
  }

  changePassword(e) {
    e.preventDefault();
    this.app.userChangePassword({...this.state, token: this.app.state.token});
  }

  render() {
    return <div>
      <h2 class="Fz(30px)">Change Password</h2>
      <form class="Maw(300px) Mx(a) Bgc(whitesmoke) P($p-panel) Bdrs($bdrs-panel) My(30px)">
        <div>
          <input class={STYPE_INPUT} placeholder="Current Password" type="currentPassword" name="currentPassword" onChange={this.onChange} required/>
        </div>
        <div class="Mt($m-control)">
          <input class={STYPE_INPUT} placeholder="New Password" type="newPassword" name="newPassword" onChange={this.onChange} required/>
        </div>
        <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.changePassword}>Submit</button>
      </form>
    </div>;
  }
}

