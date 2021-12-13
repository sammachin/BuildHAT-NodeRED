# RaspberryPi BuildHAT

Nodes to interact with Lego Motors and Sensors connected to the RaspberryPI [BuildHAT](https://www.raspberrypi.com/documentation/accessories/build-hat.html)

This project is still work in progress, as I get hold of more devices I will be able to add new nodes.

The command node allows for sending of raw serial commands to the hat as per the interface spec, all lines recived from the hat will be sent out by this node. (Including commands/to from other nodes) It is mostly useful for development and advanced features.

If you have any of the lego devices on [this table](https://www.raspberrypi.com/documentation/accessories/build-hat.html#device-compatibility) and could run the example flow `device_list.json` please send me the output I will endevour to add a node for that device.


You _may_ need to run a new hat with the officail RaspberryPi python code at least once to setup the firmware on the hat as this package does not (yet) support that. If anyone has a brand new hat they can try this pacakge on first and report back results that would be appreciated.

