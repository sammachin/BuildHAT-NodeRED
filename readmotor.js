
module.exports = function(RED) {
    function readmotor(n) {
      RED.nodes.createNode(this, n);
      var node = this;
      this.name = n.name
      this.port = n.port
      this.sensor = n.sensor
      this.hat = RED.nodes.getNode(n.hat);
      this.hat.hatnodes[this.id] = "P"+this.port+"M"+this.sensor
      this.mq = []
      this.on('input', function(msg, send, done) {
        this.hat.port.write("port "+this.port+"\r")
        this.hat.port.write("plimit 1"+"\r")
        this.hat.port.write("selonce "+this.sensor+"\r")
        this.mq.push(msg)
      })
      this.on('newData', function(data){
        let msg = this.mq.shift() || {}
        msg.payload = data
        this.send(msg)
      })

  }
  
RED.nodes.registerType("buildhat_readmotor",readmotor);  
}
