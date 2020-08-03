const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  try{
    let body = req.body;
    let authReq = {
      email: body.email,
      password: body.password,
      authorized_by: body.authorized_by,
      system: body.system,
      role: body.role,
      expiry: body.expiry || 60 * 60 * 3,
    }

    if(body.extra && typeof body.extra === "object") authReq.extra = body.extra;
    
    let authInfo = await req.client.auth.create_auth(authReq);

    res.send(authInfo);
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * Юунд хэрэгтэйг судлах шаардлагатай.
 */
router.post('/k8s', async (req, res) => {
  try{
    let body = req.body;
    let authInfo = await req.client.auth.create_k8s_auth({
      grant_code: body.grant_code,
    });
    res.send(authInfo)
  }catch(err){
    res.status(500).send(err);
  }
})

/**
 * яаж ажлуулахийг судлах шаардлагтай stirng_to_sign гэдэгт юу явуулхийг.
 */
router.post('/access-key', async (req, res) => {
  try{
    let body = req.body;
    let authReq = {
      access_key: body.access_key,
      string_to_sign: body.string_to_sign || '',
      signature: body.signature,
      expiry: body.expiry || 60 * 60 * 3,
    }

    if(body.extra && typeof body.extra === "object") authReq.extra = body.extra;
    let authInfo = await req.client.auth.create_access_key_auth(authReq);
    res.send(authInfo)
  }catch(err){
    res.status(500).send(err);
  }
})

module.exports = router;