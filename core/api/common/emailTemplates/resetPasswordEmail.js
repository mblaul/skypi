module.exports = (email, passwordresettoken) => {
  const resetPasswordEmail = `
    <tr>
      <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
        <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
          <tr>
            <td class="content-cell">
              <h1>Hi,</h1>
              <p>You recently requested to verify your email for your SkyPi account. Use the button below to
                verify it. <strong>This verification link is only valid for 10 minutes.</strong></p>
              <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td>
                                <form method="POST" action="http://localhost:5000/api/user/changepassword">
                                  <input type="hidden" id="email" name="email" value="${email}">
                                  <input type="hidden" id="passwordresettoken" name="passwordresettoken" value="${passwordresettoken}">
                                  <input type="submit" value="Change Password">
                                </form>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p>Thanks,
                <br>The SkyPi Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return resetPasswordEmail;
};
