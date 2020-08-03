const express = require('express')
const router = express.Router()

router.get('/history', async (req, res) => {
  try{
    let poolInfo = await req.client.pool.get_pool_history({
      pool_list: req.query.pool_list.split(','),
    });
    res.send(poolInfo);
  }catch(err){
    res.status(500).send(err);
  }
})

router.get('/cloud/stats', async (req, res) => {
  try{
    let poolInfo = await req.client.pool.get_cloud_services_stats({
      start_date: Number(req.query.start_date),
      end_date: Number(req.query.end_date)
    });
    res.send(poolInfo);
  }catch(err){
    res.status(500).send(err);
  }
})

router.get('/bucket/:name', async (req, res) => {
  try{
    console.log("req.params.name::", req.params.name)
    let poolInfo = await req.client.pool.get_associated_buckets({name: req.params.name});
    res.send(poolInfo);
  }catch(err){
    res.status(500).send(err);
  }
})

router.get('/:name', async (req, res) => {
  try{
    let poolInfo = await req.client.pool.read_pool({name: req.params.name});
    res.send(poolInfo);
  }catch(err){
    res.status(500).send(err);
  }
})

router.put('/', async (req, res) => {
  try{
    let system = await req.client.system.update_system({name: req.body.name});
    res.send(system);
  }catch(err){
    res.status(500).send(err);
  }
})

router.post('/region', async (req, res) => {
  try{
    let poolInfo = await req.client.pool.assign_pool_to_region({
      name: req.body.name,
      region: req.body.region,
    });
    res.send(poolInfo);
  }catch(err){
    res.status(500).send(err);
  }
})

router.post('/limit', async (req, res) => {
  try{
    let poolInfo = await req.client.pool.update_cloud_pool_limit({
      name: req.body.name,
      storage_limit: req.body.storage_limit,
    });
    res.send(poolInfo);
  }catch(err){
    res.status(500).send(err);
  }
})

router.post('/k8s', async (req, res) => {
  try{
    let body = req.body;
    let systemInfo = await req.client.pool.create_hosts_pool({
      name: body.name,
      is_managed: body.is_managed,
      host_count: body.host_count,
      host_config: body.host_config,
      backingstore: body.backingstore,
    });
    res.send(systemInfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.post('/cloud', async (req, res) => {
  try{
    let body = req.body;
    let bi = {
      name: body.name,
      connection: body.connection,
      target_bucket: body.target_bucket,
    };

    if(bi.backingstore) bi.backingstore = body.backingstore;
    if(bi.storage_limit) bi.storage_limit = body.storage_limit;

    let poolinfo = await req.client.pool.create_cloud_pool(bi);
    res.send(poolinfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

router.delete('/', async (req, res) => {
  try{
    let poolInfo = await req.client.pool.delete_pool({name: req.body.name});
    res.send(poolInfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

module.exports = router;