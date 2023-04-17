{
  "scenarioTemplate": {
    "name": "Сигнализация",
    "desc": "",
    "active": true,
    "onStart": true,
    "sync": false,
    "data": "info = {\r\n    name: \"Сигнализация\",\r\n    description: \"\",\r\n    version: \"0.4\",\r\n    author: \"@sprut666666\",\r\n    onStart: true,\r\n\r\n    sourceServices: [HS.SecuritySystem],\r\n    sourceCharacteristics: [HC.SecuritySystemTargetState],\r\n\r\n    variables: {\r\n        active: false,\r\n        motion: undefined,\r\n        occupancy: undefined\r\n    }\r\n}\r\n\r\nfunction alarm(source, value, securitySystemCurrentState) {\r\n    if (value * 1 > 0) {\r\n        securitySystemCurrentState.setValue(4);\r\n        log.warn(\"Security system, alarm: {}\", source.format())\r\n        if (global.sendToTelegram !== undefined)\r\n            global.sendToTelegram(\"*Сработка сигнализации !*: \\r\\nСработал датчик: \" + source.format());\r\n    }\r\n}\r\n\r\nfunction trigger(source, value, variables, options) {\r\n    let securitySystemCurrentState = source.getService().getCharacteristic(HC.SecuritySystemCurrentState);\r\n    securitySystemCurrentState.setValue(value);\r\n\r\n    if (value === 1 && !variables.active) {\r\n        variables.active = true;\r\n        variables.motion = Hub.subscribeWithCondition(null, null, [HS.MotionSensor], [HC.MotionDetected], alarm, securitySystemCurrentState);\r\n        variables.occupancy = Hub.subscribeWithCondition(null, null, [HS.OccupancySensor], [HC.OccupancyDetected], alarm, securitySystemCurrentState);\r\n    } else if (variables.active) {\r\n        variables.active = false;\r\n        variables.motion.clear();\r\n        variables.occupancy.clear();\r\n    }\r\n}\r\n\r\n",
    "type": "LOGIC"
  }
}