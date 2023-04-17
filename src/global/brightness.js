let duration = parseInt("30");
var timerId = null;

// Define an array of objects containing devices' UUID and brightness "EndValue"
let devices = [
  { devID: 277, endBrightness: 30 }, // kitchen
  { devID: 278, endBrightness: 30 }, // penal
  { devID: 279, endBrightness: 0 }, // sofa
];

function trigger(duration, timerId, devices) {
  log.debug("Trigger function called");

  if (timerId != null) {
    clearInterval(timerId);
    timerId = null;
  }

  if (devices != null) {
    for (let i = 0; i < devices.length; i++) {
      let device = devices[i];
      let accessory = Hub.getAccessory(device.devID);
      if (accessory == null) {
        log.info("Device with UUID {} not found", device.devID);
        continue;
      }

      let brightness = accessory.getService().getCharacteristic(HC.Brightness);
      if (brightness == null) {
        log.info("Device with UUID {} does not support brightness", device.devID);
        continue;
      }

      let startBrightness = brightness.getValue();
      log.debug("Retrieved start brightness {} for device {}", startBrightness, device.devID);
      if (startBrightness == null) {
        log.info("Failed to retrieve current brightness for device {}", device.devID);
        continue;
      }

      if (device.endBrightness <= startBrightness) {
        continue; // Skip if device already has the desired brightness level
      }

      let diff = Math.abs(device.endBrightness - startBrightness);
      let delay = (duration * 1000 - (duration * 1000) % diff) / diff;
      let asc = device.endBrightness > startBrightness;

      brightness.setValue(startBrightness);
      log.debug("Set brightness of device {} to start brightness {}", device.devID, startBrightness);

      timerId = setInterval(function () {
        if ((asc && startBrightness >= device.endBrightness) || (!asc && startBrightness <= device.endBrightness)) {
          clearInterval(timerId);
          timerId = null;
          return;
        }

        startBrightness += (asc ? 1 : -1);
        brightness.setValue(startBrightness);
        log.debug("Set brightness of device {} to {}", device.devID, startBrightness);
      }, delay);
    }
  }
}
