const express = require('express')
const router = express.Router()

/**
 * return account list
 */
router.get('/', async (req, res) => {
  try{
    let accountList = await req.client.account.list_accounts();
    res.send(accountList)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Endpoint -оор тухайн хэрэглэгч хэр их дата-г системд хийснийг харуулна.
 */
router.get('/usage', async (req, res) => {
  try{
    let body = req.query;
    let account = await req.client.account.get_account_usage({
      since: Date.now() - (1000 * 64 *64 *24 * 7),
      till: Date.now(),
      accounts: ["admin@noobaa.io"],
      endpoint_groups: ["6cb8b25f-2715-4b93-a3d9-a3dbc63d7e8f"]
    });
    res.send(account)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * access_key -ээр тухайн хэрэглэгчийн мэдээллийг авна.
 */
router.get('/access/:access_key', async (req, res) => {
  try{
    let account = await req.client.account.read_account_by_access_key({access_key: req.params.access_key});
    res.send(account)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Энэ яг юу хийгээд байгааг мэдэхгүй байгаа
 */
router.get('/status', async (req, res) => {
  try{
    let account = await req.client.account.accounts_status();
    res.send(account)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Email хаягаар хэрэглэгчийн мэдээллийг авна.
 */
router.get('/:email', async (req, res) => {
  try{
    let account = await req.client.account.read_account({email: req.params.email});
    res.send(account)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Хэрэглэгчийн мэдээллийг шинжилнэ. Ips гэдэг хэсэг нь хэрэглэгчид Ip restriction хийх боломжийг олно.
 */
router.put('/', async (req, res) => {
  try{
    let body = req.body;
    let updatedAccount = await req.client.account.update_account({
      name: body.name,
      email: body.email,
      must_change_password: body.must_change_password || false,
      new_email: body.new_email || body.email,
      ips: body.ips || null
    });
    res.send(updatedAccount)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * хэрэглэгчийн S3 access ийг тохируулна.
 */
router.put('/s3-access', async (req, res) => {
  try{
    let body = req.body;
    let updatedAccount = await req.client.account.update_account_s3_access({
      email: body.email,
      s3_access: body.s3_access,
      allowed_buckets: body.allowed_buckets,
      default_pool: body.default_pool,
      allow_bucket_creation: body.allow_bucket_creation
    });
    res.send(updatedAccount)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * шинэ хэрэглэгч бүртгэнэ.
 * req.body доорх хэлбэртэй байна.
 *  {
        "name": "lala9",
        "email": "lala9@noobaa.com",
        "has_login": true,
        "password": "Test@123",
        "must_change_password": false,
        "s3_access": true,
        "default_pool": "fibo-noobaa-test1",
        "allowed_buckets": {
            "full_permission": true,
            "permission_list": ["my-bucket"]
        },
        "allow_bucket_creation": true
    }
 */
router.post('/', async (req, res) => {
  try{
    let body = req.body;
    let account = await req.client.account.create_account(body);
    res.send(account)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * шинэ хэрэглэгч бүртгэнэ. Дээрхээс ямар ялгаатайг тогтоогоогүй байгаа.
 */
router.post('-external', async (req, res) => {
  try{
    let body = req.body;
    let account = await req.client.account.create_external_user_account({
      name: body.name,
      email: body.email
    });
    res.send(account)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Хэрэглэгчийн нууц үгийг солих боломж олгоно. Гэхдээ хуучин нууц үгийг нь мэдэж байх шаардлагатай.
 */
router.post('/reset-password', async (req, res) => {
  try{
    let body = req.body;
    let updatedAccount = await req.client.account.reset_password({
      email: body.email,
      verification_password: body.verification_password,
      password: body.password,
      must_change_password: body.must_change_password || body.false,
    });
    res.send(updatedAccount)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Хэрэглэгчийн S3 аар холбогдох secret key болон access key ийг шинээр үүсгэнэ. хуучин нь ашиглах боможгүй болно.
 */
router.post('/generate-account-keys', async (req, res) => {
  try{
    let body = req.body;
    let updatedAccount = await req.client.account.generate_account_keys({
      email: body.email
    });
    res.send(updatedAccount)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Нэвтэрсэн хэрэглэгч өөрийн нууц үгээ зөв үгүйг шалгах API.
 */
router.post('/verify-authorized-account', async (req, res) => {
  try{
    let body = req.body;
    let updatedAccount = await req.client.account.verify_authorized_account({
      verification_password: body.verification_password
    });
    res.send(updatedAccount)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Хэрэглэгчийг устгах API.
 */
router.delete('', async (req, res) => {
  try{
    let body = req.body;
    let deletedAccount = await req.client.account.delete_account({
      email: body.email
    });
    res.send(deletedAccount)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Connection шалгах API. Хэрвээ connection status нь success гэж буцаавал тухайн хэрэглэгч connection үүсгэх боломжтой.
 */
router.post('/check-external-connection', async (req, res) => {
  try{
    let body = req.body;
    console.log(body);
    let connection = await req.client.account.check_external_connection({
      name: body.name,
      endpoint_type: body.endpoint_type,
      endpoint: body.endpoint,
      identity: body.identity || null,
      secret: body.secret || null,
      auth_method: body.auth_method,
      cp_code: body.cp_code || "",
    });
    res.send(connection)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Connection нэмэх API. Энэ нь тухайн нэг нэвтэрсэн байгаа хэрэглэгчийн connection руу нэмэгдэнэ.
 */
router.put('/add-external-connection', async (req, res) => {
  try{
    let body = req.body;
    let connection = await req.client.account.add_external_connection({
      name: body.name,
      endpoint_type: body.endpoint_type,
      endpoint: body.endpoint,
      identity: body.identity || null,
      secret: body.secret || null,
      auth_method: body.auth_method,
      cp_code: body.cp_code || "",
    });
    res.send(connection)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Connection шинжлэх API. Энэ нь тухайн нэг нэвтэрсэн байгаа хэрэглэгчийн connection ийг шинжлэх.
 */
router.put('/update-external-connection', async (req, res) => {
  try{
    let body = req.body;
    console.log(body);
    let connection = await req.client.account.update_external_connection({
      name: body.name,
      identity: body.identity,
      secret: body.secret
    });
    res.send(connection)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Connection устгах API
 */
router.delete('/delete-external-connection', async (req, res) => {
  try{
    let body = req.body;
    console.log(body);
    let connection = await req.client.account.delete_external_connection({
      connection_name: body.connection_name,
    });
    res.send(connection)
  }catch(err){
    res.status(500).send(err);
  }
})

module.exports = router;