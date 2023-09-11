export function contact({ email, phone, fName, lName, message }) {
	let html = `client: ${fName}  ${lName}<br/>
      email:  ${email} <br/>
      phone:  ${phone}
      <br/><br/>
      message:  ${message}`
	return html
}

export function emailVerification({ code }) {
	let html = `Welcome to lma39ol platform,
      <br/>
      We are happy to have you with us
      <br/><br/>
      Please use the bellow code to verify your email:
      <br/>
      Your verification code is: <b>${code}</b>
      <br/><br/>
      Best Regards.
      <br/><br/>
      lma39ol team.`
	return html
}

export function resetPassword({ code }) {
	let html = `Hello,
      <br/>
      Nice to talk to you again
      <br/><br/>
      Use the following code to reset your password:
      <br/>
      Verification code: <b>${code}</b>
      <br/><br/>
      Have a pleasant day.`
	return html
}

export function changePassword({ code }) {
	let html = `Hello,
      <br/>
      Nice to talk to you again
      <br/><br/>
      Use the following code to change your password:
      <br/>
      Verification code: <b>${code}</b>
      <br/><br/>
      Have a pleasant day.`
	return html
}
