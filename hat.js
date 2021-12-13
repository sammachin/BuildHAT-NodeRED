const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
var hatnodes = {}
var commandnodes = []

module.exports = function(RED) {
    function buildhatConf(n) {
      RED.nodes.createNode(this,n);
      var node = this
      this.serialport = n.serialport;
      this.dbg = n.dbg
      this.port = new SerialPort(this.serialport, {baudRate: 115200 })
      const parser = new Readline()
      this.port.pipe(parser)
      parser.on('data', newData)
      parser.on('data', function(data){
          if (n.dbg == 'true'){
            node.log(data)
          }
      })
      this.on('close', function(){
        this.port.close(function (err) {
      });
      });
      this.hatnodes = hatnodes
      this.commandnodes = commandnodes
    }
    RED.nodes.registerType("buildhat_conf", buildhatConf);

    
    function newData(data){
      let re = '^P[0-3]>P[0-3]M[0-9]: .*';
      if (data.match(re)){
        let addr = data.split(":")[0].split(">")[1]
        let ds = data.split(": ")[1].replace(/(\r\n|\n|\r)/gm, "")
        ds = ds.split(" ")
        ds = ds.map(x => Number(x))
        if (ds.length == 1){
          ds = ds[0]
        }
        Object.keys(hatnodes).forEach(function(key) {
          if (hatnodes[key] == addr){
            let target_node = RED.nodes.getNode(key)
            target_node.emit('newData', ds)
          }
      });
      }
      commandnodes.forEach(function(nid){
        let target_node = RED.nodes.getNode(nid)
        target_node.emit('newData', data.replace(/(\r\n|\n|\r)/gm, ""))
      })
    }
  }