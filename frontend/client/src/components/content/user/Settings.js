import React, { Component } from 'react';

class Settings extends Component {
  render() {
    return (
      <div>
        <div className="container mt-2">
          <div className="row">
            <div className="display-3 mx-auto">
              <i className="fas fa-cog" /> User Settings
            </div>
          </div>
          <div className="col-lg-8 mt-3 mx-auto">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row" />
                  <td className="align-middle">Measurement Units</td>
                  <td>
                    <button className="btn btn-info float-right">Metric</button>
                    <button className="btn btn-primary float-right mr-2">
                      Imperial
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row" />
                  <td className="align-middle">Delete Account</td>
                  <td>
                    <button className="btn btn-danger float-right">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
