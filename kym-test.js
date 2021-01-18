/**
 * @var Nylas The nylus module.
 */
const Nylas = require('nylas');

/**
 * @var fs The fs module.
 */
const fs = require('fs');
// import { readFile } from 'fs'; only imports readfile from fs
const path = require('path');

/**
 * @var {string} Nylas Token
 */
const TOKEN = '1aT5zGD9cKz9WbitEqdb1cn062OwSI';

/**
 * @var {oject} The Nylas connection
 */
const nylas = Nylas.with(TOKEN);

/**
 * The Nylas API configuration
 */
Nylas.config({
  clientId: '',
  clientSecret: '',
});

/**
 * @var {sting} filePath Retrieves the file's path.
 */
const filePath = path.join(__dirname, 'kym-test.js');

fs.readFile(filePath, (err, data) => {
  f = nylas.files.build({
    filename: filePath + '.txt',
    data: data,
    contentType: 'text/plain',
  });

  f.upload((err, file) => {
    // Create a draft and attach the file to it.
    const draft = nylas.drafts.build({
      subject: 'Technical Challenge. Questions answered in body.',
      to: [{ email: 'nylas-se-challenge@nylas.com' }],
      body: `1) What is the difference between delta sync and webhooks?
      **** Webhooks watches for and tells you changes occurred to your user's email inbox, calendar, or contacts. The delta tells what has changed in the mailbox. Webhooks use a push notification protocol to notify you of changes, rather than you requesting the latest changes from Nylas.  Deltas require you to keep persistent HTTP connections to Nylas.

      2) What's the difference between hosted and native authentication?
      **** Native authentication is where users can authenticate in app without redirecting to the Nylas Auth service. One would have control of the look and feel of logging in. It's more complex, and you need to set up developer apps with third-party providers.
      **** Hosted authentication redirects users to a Nylas login page. The user logs in to their account. Nylas redirects them back to your app with auth credentials.`,
    });

    draft.files = [file];

    draft.send().then(message => {
      console.log(`${message.id} was sent`);
    });
  });
});
