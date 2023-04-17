info = {
    name: "Сигнализация",
    description: "",
    version: "0.4",
    author: "@sprut666666",
    onStart: true,

    sourceServices: [HS.SecuritySystem],
    sourceCharacteristics: [HC.SecuritySystemTargetState],

    variables: {
        active: false,
        motion: undefined,
        occupancy: undefined
    }
}

function alarm(source, value, securitySystemCurrentState) {
    if (value * 1 > 0) {
        securitySystemCurrentState.setValue(4);
        log.warn("Security system, alarm: {}", source.format())
        if (global.sendToTelegram !== undefined)
            global.sendToTelegram("*Сработка сигнализации !*: \r\nСработал датчик: " + source.format());
    }
}

function trigger(source, value, variables, options) {
    let securitySystemCurrentState = source.getService().getCharacteristic(HC.SecuritySystemCurrentState);
    securitySystemCurrentState.setValue(value);

    if (value === 1 && !variables.active) {
        variables.active = true;
        variables.motion = Hub.subscribeWithCondition(null, null, [HS.MotionSensor], [HC.MotionDetected], alarm, securitySystemCurrentState);
        variables.occupancy = Hub.subscribeWithCondition(null, null, [HS.OccupancySensor], [HC.OccupancyDetected], alarm, securitySystemCurrentState);
    } else if (variables.active) {
        variables.active = false;
        variables.motion.clear();
        variables.occupancy.clear();
    }
}

