const api = require('../../noobaa/noobaa-core/src/api');

async function get_client(req, res, next) {
  var rpc = api.new_rpc();
  var client = rpc.new_client({
    // address: 'ws://127.0.0.1:5001',
    address: 'wss://localhost:49404',
  });

  var auth_params = {
      email: 'wss://localhost:49404',
      password: 'HheHS5fX+gkxOO0BIqy+KQ==',
      system: 'noobaa'
  };

  // var auth_params = {
  //   email: 'admin@noobaa.io',
  //   password: 'uKNlJl7aOwumUaqxCiOFrg==',
  //   system: 'noobaa'
  // };

  await client.create_auth_token(auth_params);
  console.log("client token:: ", client.options.auth_token);
  req.client = client;
  next();
  return;
}

module.exports = get_client;
