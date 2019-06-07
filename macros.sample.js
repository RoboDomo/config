module.exports = {
  // Turn the lights in the kitchen on.
  // You might have more than one light, so you'd add the command to turn on
  // the second light here as well.
  "Kitchen On": [
    {
      type: "mqtt",
      topic: "smartthings/Kitchen Lights/switch/set",
      payload: "on"
    }
  ],
  // Turn all lights in the kitchen off.
  "Kitchen Off": [
    {
      type: "mqtt",
      topic: "smartthings/Kitchen Lights/switch/set",
      payload: "off"
    }
  ],
  // turn on all lights in the bathroom
  "Bathroom On": [
    {
      type: "mqtt",
      topic: "smartthings/Bathroom Light/switch/set",
      payload: "on"
    }
  ],
  // turn off all lights in the bathroom
  "Bathroom Off": [
    {
      type: "mqtt",
      topic: "smartthings/Bathroom Light/switch/set",
      payload: "off"
    }
  ],
  // Turn on the light and ceiling fan in the bedroom
  "Bedroom On": [
    {
      type: "mqtt",
      topic: "smartthings/Bedroom Light/switch/set",
      payload: "on"
    },
    {
      type: "mqtt",
      topic: "smartthings/Bedroom Fan/switch/set",
      payload: "on"
    }
  ],
  // turn everything off in the bedroom
  "Bedroom Off": [
    {
      type: "mqtt",
      topic: "smartthings/Bedroom Light/switch/set",
      payload: "off"
    },
    {
      type: "mqtt",
      topic: "smartthings/Bedroom Fan/switch/set",
      payload: "off"
    }
  ],
  // turn everything off
  "All Off": [
    { type: "macro", name: "Kitchen Off" },
    { type: "macro", name: "Bathroom Off" },
    { type: "macro", name: "Bedroom Off" }
  ],
  // time to go to bed.  This routine sets the thermostat to a comfortable 72, and turns on the
  // lights in the kitchen so you can get a drink of water.
  Bedtime: [
    { type: "macro", name: "Bedroom On" },
    {
      type: "mqtt",
      topic: "nest/structure/thermostat_name/set/target_temperature_f",
      payload: "72"
    },
    { type: "macro", name: "Kitchen On" }
  ],
  // Good night - time to sleep.  Turn everything off except: the ceiling fan in the bedroom.
  // Sets the thermostat to 72 for comfortable sleeping.
  "Good Night": [
    { type: "macro", name: "Kitchen Off" },
    { type: "macro", name: "Bathroom Off" },
    {
      type: "mqtt",
      topic: "smartthings/Bedroom Light/switch/set",
      payload: "off"
    },
    {
      type: "mqtt",
      topic: "smartthings/Bedroom Fan/switch/set",
      payload: "on"
    },
    {
      type: "mqtt",
      topic: "nest/structure/thermostat_name/set/target_temperature_f",
      payload: "72"
    }
  ]
};
