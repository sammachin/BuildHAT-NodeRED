
module.exports = function(RED) {
    function command(n) {
      RED.nodes.createNode(this, n);
      var node = this;
      this.name = n.name
      this.hat = RED.nodes.getNode(n.hat);
      this.hat.commandnodes.push(this.id)
      this.on('input', function(msg, send, done) {
        this.hat.port.write(msg.payload+"\r")
        send(msg)
      })
      this.on('newData', function(data){
        let msg = {}
        msg.payload = data
        this.send(msg)
      })
      this.on('close', function() {
        const index = this.hat.commandnodes.indexOf(this.id);
        if (index > -1) {
          this.hat.commandnodes.splice(index, 1);
        }
      });
  }

RED.nodes.registerType("buildhat_command",command);  
}
