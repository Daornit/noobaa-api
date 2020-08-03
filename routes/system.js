const express = require('express')
const router = express.Router()

router.get('/status', async (req, res) => {
  try{
    let systemStatus = await req.client.system.get_system_status();
    res.send(systemStatus);
  }catch(err){
    res.status(500).send(err);
  }
})

router.get('/read', async (req, res) => {
  try{
    let read = await req.client.system.read_system();
    res.send(read);
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


router.post('/', async (req, res) => {
  try{
    let body = req.body;
    let systemInfo = await req.client.system.create_system({
      name: body.name,
      email: body.email,
      password: body.password,
      // dns_servers: [],
      // dns_name: "localhost",
      must_change_password: body.must_change_password,
    });
    res.send(systemInfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})


router.delete('/', async (req, res) => {
  try{
    let systemInfo = await req.client.system.delete_system();
    res.send(systemInfo)
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})

module.exports = router;