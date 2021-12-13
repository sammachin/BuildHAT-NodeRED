
module.exports = function(RED) {
    function motor(n) {
      RED.nodes.createNode(this, n);
      var node = this;
      this.name = n.name
      this.speed = n.speed
      this.hat = RED.nodes.getNode(n.hat);
      this.port = n.port
      this.on('input', function(msg, send, done) {
       var speed = msg.speed || this.speed
       this.hat.port.write("port "+this.port+"\r")
       this.hat.port.write("plimit 1"+"\r")
       this.hat.port.write("set "+speed+"\r")
       this.send(msg)
      });
  }

RED.nodes.registerType("buildhat_motor",motor);  
}
