function contactUsPage(firstName, lastName, Phone, Email, Message) {
return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Form Submission</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #f4f6f9;
      font-family: Arial, sans-serif;
    "
  >
    <table
      role="presentation"
      style="
        width: 100%;
        border-collapse: collapse;
        background: #f4f6f9;
        padding: 20px 0;
      "
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            style="
              width: 100%;
              max-width: 600px;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #4a90e2;
                  color: #ffffff;
                  text-align: center;
                  padding: 20px;
                "
              >
                <h1 style="margin: 0; font-size: 22px">
                  📩 New Contact Form Submission
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 20px">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 16px;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                        color: #333;
                      "
                    >
                      First Name
                    </td>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        color: #555;
                      "
                    >
                      ${firstName}
                    </td>
                  </tr>

                 <tr>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                        color: #333;
                      "
                    >
                      Last Name
                    </td>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        color: #555;
                      "
                    >
                      ${lastName}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                        color: #333;
                      "
                    >
                      Phone
                    </td>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        color: #555;
                      "
                    >
                      ${Phone}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                        color: #333;
                      "
                    >
                      Email
                    </td>
                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #eee;
                        color: #555;
                      "
                    >
                      ${Email}
                    </td>
                  </tr>
                </table>

                <!-- Message Section -->
                <div
                  style="
                    margin-top: 20px;
                    padding: 15px;
                    background: #f9fbfd;
                    border: 1px solid #e5e9f0;
                    border-radius: 8px;
                  "
                >
                  <h3
                    style="
                      margin: 0 0 10px 0;
                      font-size: 18px;
                      color: #333;
                      text-align: center;
                    "
                  >
                    Message
                  </h3>
                  <p
                    style="
                      margin: 0;
                      font-size: 15px;
                      line-height: 1.6;
                      color: #555;
                      word-break: break-word;
                    "
                  >
                    ${Message}
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background: #f4f6f9;
                  text-align: center;
                  padding: 15px;
                  font-size: 13px;
                  color: #777;
                "
              >
                This email was generated from your website contact form.
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

module.exports = contactUsPage;