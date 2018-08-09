const { google } = require('googleapis');

const path = require('path');

const SERVICE_ACCOUNT_EMAIL = 'reactanalytics@celtic-current-212815.iam.gserviceaccount.com';
const SERVICE_ACCOUNT_KEY = path.resolve(__dirname, '../key_cert.pem');
const authClient = new google.auth.JWT(SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_KEY, null, [
  'https://www.googleapis.com/auth/analytics.readonly',
]);

const getData = async () => {
  await authClient.authorize();
  return google.analytics('v3').data.ga.get({
    auth: authClient,
    ids: 'ga:178297180',
    'start-date': '30daysAgo',
    'end-date': 'today',
    metrics: 'ga:hits,ga:sessions',
    dimensions: 'ga:date',
  });
};

module.exports = getData;
