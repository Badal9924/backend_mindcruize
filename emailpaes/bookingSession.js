function oneToOneSessionPage(name, email, standard, mobile) {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>One-to-One Session Booking</title>
</head>
<body style="margin:0; padding:0; background:#f4f6f9; font-family: Arial, sans-serif;">

  <table role="presentation" style="width:100%; border-collapse:collapse; background:#f4f6f9; padding:20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" style="width:100%; max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:#27ae60; color:#ffffff; text-align:center; padding:20px;">
              <h1 style="margin:0; font-size:22px;">🎓 New One-to-One Session Booking</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:20px;">
              <table role="presentation" style="width:100%; border-collapse:collapse; font-size:16px;">

                <tr>
                  <td style="padding:12px; border-bottom:1px solid #eee; font-weight:bold; color:#333;">Name</td>
                  <td style="padding:12px; border-bottom:1px solid #eee; color:#555;">${name}</td>
                </tr>

                <tr>
                  <td style="padding:12px; border-bottom:1px solid #eee; font-weight:bold; color:#333;">Email</td>
                  <td style="padding:12px; border-bottom:1px solid #eee; color:#555;">${email}</td>
                </tr>

                <tr>
                  <td style="padding:12px; border-bottom:1px solid #eee; font-weight:bold; color:#333;">Class</td>
                  <td style="padding:12px; border-bottom:1px solid #eee; color:#555;">${standard}</td>
                </tr>

                <tr>
                  <td style="padding:12px; font-weight:bold; color:#333;">Mobile</td>
                  <td style="padding:12px; color:#555;">${mobile}</td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f6f9; text-align:center; padding:15px; font-size:13px; color:#777;">
              This email was generated from your website’s session booking form.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>

    `
}

module.exports = oneToOneSessionPage;