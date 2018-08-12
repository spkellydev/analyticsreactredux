const { google } = require("googleapis");
const axios = require("axios");
const AuthController = require("../controllers/AuthController");

const path = require("path");

const SERVICE_ACCOUNT_EMAIL =
  "reactanalytics@celtic-current-212815.iam.gserviceaccount.com";
const SERVICE_ACCOUNT_KEY = path.resolve(__dirname, "../lib/key_cert.pem");

const authClient = new google.auth.JWT(
  SERVICE_ACCOUNT_EMAIL,
  SERVICE_ACCOUNT_KEY,
  null,
  ["https://www.googleapis.com/auth/analytics.readonly"]
);

const oAuthClient = new google.auth.OAuth2(
  "1073870169812-bafkb4lbgja190m4fe7954b6ihpgdgnf.apps.googleusercontent.com",
  "7x-vsamHaQWkKjo-S3kwpj50",
  "http://localhost:5000/oauth"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/analytics.readonly"
];

const url = oAuthClient.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes
});

const token = (code, cb) => {
  oAuthClient.getToken(code, (err, tokens) => {
    console.log(code);
    if (err) {
      cb(err);
    }

    oAuthClient.setCredentials({
      credentials: tokens,
      refresh_token: "STORED_REFRESH_TOKEN"
    });

    google.options({ auth: oAuthClient });

    try {
      google.analytics({
        version: "v3",
        auth: oAuthClient
      });
      console.log(oAuthClient.credentials);
      axios({
        method: "get",
        url:
          "https://www.googleapis.com/analytics/v3/management/accountSummaries",
        headers: {
          Authorization: `Bearer ${
            oAuthClient.credentials.credentials.access_token
          }`
        }
      })
        .then(response => {
          console.log(response.data.items);
          const data = response.data;

          const properties = data.items.map(item => {
            return {
              id: item.webProperties[0].profiles[0].id,
              name: item.name,
              website: item.webProperties[0].websiteUrl
            };
          });

          console.log(data.username);

          const userdata = {
            email: data.username,
            properties: properties,
            access: oAuthClient.credentials.credentials.access_token,
            password: "null"
          };
          const items = AuthController.oauth(userdata, token => cb(token));
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  });
};

const getData = async options => {
  try {
    const data = await axios({
      method: "get",
      url: `https://www.googleapis.com/analytics/v3/data/ga?ids=ga:${
        options.property
      }&end-date=${
        options.date.end
      }&metrics=${options.metrics.join()}&start-date=${
        options.date.start
      }&start-date=1&dimensions=ga:date`,
      headers: {
        Authorization: `Bearer ${options.access}`
      }
    });

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getData, url, token };
