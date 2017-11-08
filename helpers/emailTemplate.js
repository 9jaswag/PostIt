
const emailTemplate = (priority, url, title, year) => `
<div style="background: #fff; width: 100%; height: 100%; padding: 3rem 0; font-family: 'Georgia'">
  <div style="width: 50vw; background: #FFF; display: block; margin: 0 auto; padding: 0; border: 1px solid #00bfa5;">
    <div style=" background: #00bfa5;">
      <h2 style="color: white; text-align: center; line-height: 10vh; background: #00bfa5; margin: 0;">PostIT</h2>
    </div>
    <div style="text-align: center; padding: 0.5rem;">
      <p style="font-size: 1rem;">Hello there,</p>
      <p style="font-size: 1rem;">You have a new ${priority} message on PostIT</p>
      <p style="color:red; font-size: 1rem;"><strong>Message Title</strong>: ${title}</p>
      <p style="font-size: 1rem;">Login to view your message now</p>
      <p style="padding: 0.5rem;"></p>
      <a style="padding: 0.7rem 2rem; background: #00a98f; color: white; text-decoration: none; border-radius: 2px;" href="http://${url}">LOGIN</a>
      <p style="padding: 0.5rem;"></p> <hr/>
      <p style="font-size: 1rem;">PostIT © ${year}</p>
    </div>
  </div>
</div>`;

export const resetPasswordEmailTemplate = (url, resetToken, email, year) => `
<div style="background: #fff; width: 100%; height: 100%; padding: 3rem 0; font-family: 'Georgia'">
  <div style="width: 50vw; background: #FFF; display: block; margin: 0 auto; padding: 0; border: 1px solid #00bfa5;">
    <div style=" background: #00bfa5;">
      <h2 style="color: white; text-align: center; line-height: 10vh; background: #00bfa5; margin: 0;">PostIT</h2>
    </div>
    <div style="text-align: center; padding: 0.5rem;">
      <p style="font-size: 1rem;">Hello there,</p>
      <p style="font-size: 1rem;">Someone (hopefully you!) has requested a
      password reset on your PostIT account. If you requested it, please click the
      button below or copy the link into your browser to change
      your password.</p>
      <p style="font-size: 1rem;">If this is not you, please disregard this email</p>
      <p style="padding: 0.5rem;"></p>
      <a style="padding: 0.7rem 2rem; background: #00a98f; color: white; text-decoration: none; border-radius: 2px;" href="http://${url}/resetpassword/?token=${resetToken}&email=${email}">RESET PASSWORD</a>
      <p style="padding: 1rem; font-size: 1rem;">Link: http://${url}/resetpassword/?token=${resetToken}&email=${email}</p>
      <p style="padding: 0.5rem;"></p> <hr/>
      <p style="font-size: 1rem;">PostIT © ${year}</p>
    </div>
  </div>
</div>`;

export default emailTemplate;
