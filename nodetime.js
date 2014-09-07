var accountKey = process.env.NODETIME;

if (accountKey) {
  nodetime.profile({
    accountKey: process.env.NODETIME,
    appName: 'techpartysuggestion'
  });
}
