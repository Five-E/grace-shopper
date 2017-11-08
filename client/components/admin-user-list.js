import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminUserItem from './admin-user-item'
import { fetchUsers } from '../store'


class AdminUserList extends Component {

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const users = this.props.users;
    if (!users) return (<div> Loading ... </div>);

    return (
      <div>
        <h3>Admin User List Page</h3>
        <div>
          {
            users.map(user => {
              return (
                <div key={user.id}>
                  {<AdminUserItem userInfo={user} />}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return { users: state.users }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: function () {
      dispatch(fetchUsers());
    }
  }
}

export default connect(mapState, mapDispatch)(AdminUserList)
