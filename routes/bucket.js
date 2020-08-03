const express = require('express')
const router = express.Router()

router.get('/sdk/:bucket_name', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.read_bucket_sdk_info({
      name: req.params.bucket_name
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.get('/policy/:bucket_name', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.get_bucket_policy({
      name: req.params.bucket_name
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.get('/website/:bucket_name', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.get_bucket_website({
      name: req.params.bucket_name
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.get('/encryption/:bucket_name', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.get_bucket_encryption({
      name: req.params.bucket_name
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.get('/tag/:bucket_name', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.get_bucket_tagging({
      name: req.params.bucket_name
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.get('/:bucket_name', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.read_bucket({
      name: req.params.bucket_name
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.get('/', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.list_buckets();
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.put('/tag', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      tagging: body.tagging, // key, value structed object array
      name: body.name,
    };

    let bucketinfo = await req.client.bucket.put_bucket_tagging(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/tag', async (req, res) => {
  try{
    let body = req.body;
    let bucketinfo = await req.client.bucket.delete_bucket_tagging({ 
      name: body.name,
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.put('/ecryption', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      encryption: body.encryption,
      name: body.name,
    };

    let bucketinfo = await req.client.bucket.put_bucket_encryption(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/ecryption', async (req, res) => {
  try{
    let body = req.body;
    let bucketinfo = await req.client.bucket.put_bucket_encryption({
      name: body.name,
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.put('/website', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      website: body.website,
      name: body.name,
    };

    let bucketinfo = await req.client.bucket.put_bucket_website(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/website', async (req, res) => {
  try{
    let body = req.body;
    let bucketinfo = await req.client.bucket.delete_bucket_website({
      name: body.name,
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.put('/policy', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      policy: body.policy,
      name: body.name,
    };

    let bucketinfo = await req.client.bucket.put_bucket_policy(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/policy', async (req, res) => {
  try{
    let body = req.body;
    let bucketinfo = await req.client.bucket.delete_bucket_policy({
      name: body.name,
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.put('/s3-access', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      allowed_accounts: body.allowed_accounts, //array of string
      name: body.name,
    };
    let bucketinfo = await req.client.bucket.update_bucket_s3_access(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

// single bucket update
router.put('/:name', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      name: req.params.name,
    };
    if(body.new_name) bi.new_name = body.new_name;
    if(body.tiering) bi.tiering = body.tiering;
    if(body.new_tag) bi.new_tag = body.new_tag;
    if(body.quota) bi.quota = body.quota;
    if(body.namespace) bi.namespace = body.namespace;
    if(body.versioning) bi.versioning = body.versioning;


    let bucketinfo = await req.client.bucket.update_bucket_params(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.put('/', async (req, res) => {
  try{
    let list = req.body || [];

    list = list.map(body => {
      let bi = {
        name: body.name,
      };
      if(body.new_name) bi.new_name = body.new_name;
      if(body.tiering) bi.tiering = body.tiering;
      if(body.new_tag) bi.new_tag = body.new_tag;
      if(body.quota) bi.quota = body.quota;
      if(body.namespace) bi.namespace = body.namespace;
      if(body.versioning) bi.versioning = body.versioning;
      return bi
    })
  
    let bucketinfo = await req.client.bucket.update_buckets(list);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.post('/', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      name: body.name,
    };

    if(body.tiering) bi.tiering = body.tiering;
    if(body.chunk_split_config) bi.chunk_split_config = body.chunk_split_config;
    if(body.chunk_coder_config) bi.chunk_coder_config = body.chunk_coder_config;
    if(body.tag) bi.tag = body.tag;
    if(body.object_lock_configuration) bi.object_lock_configuration = body.object_lock_configuration;
    if(body.namespace) bi.namespace = body.namespace;
    if(body.lock_enabled) bi.lock_enabled = body.lock_enabled;
    if(body.bucket_claim) bi.bucket_claim = body.bucket_claim;

    let bucketinfo = await req.client.bucket.create_bucket(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/lifecycle', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.delete_bucket_lifecycle({
      name: req.body.name,
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/object', async (req, res) => {
  try{
    let bucketinfo = await req.client.bucket.delete_bucket_and_objects({
      name: req.body.name,
    });
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      name: body.name,
      internal_call: body.internal_call || false
    }
    let bucketinfo = await req.client.bucket.delete_bucket(bi);
    res.send(bucketinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

module.exports = router;