{
  "scenarioTemplate": {
    "name": "Яркость от времени",
    "desc": "",
    "active": true,
    "onStart": false,
    "sync": false,
    "data": "info = {\r\n    name: \"Яркость от времени\",\r\n    description: \"\",\r\n    version: \"0.2\",\r\n    author: \"@sprut666666\",\r\n    onStart: false,\r\n\r\n    sourceServices: [HS.Lightbulb],\r\n    sourceCharacteristics: [HC.On],\r\n\r\n    options: {\r\n        After6: {\r\n            name: {\r\n                en: \"Brightness after 06:00\",\r\n                ru: \"Яркость после 06:00\"\r\n            },\r\n            type: \"Integer\",\r\n            value: 100\r\n        },\r\n        After21: {\r\n            name: {\r\n                en: \"Brightness after 21:00\",\r\n                ru: \"Яркость после 21:00\"\r\n            },\r\n            type: \"Integer\",\r\n            value: 50\r\n        },\r\n        After23: {\r\n            name: {\r\n                en: \"Brightness after 23:00\",\r\n                ru: \"Яркость после 23:00\"\r\n            },\r\n            type: \"Integer\",\r\n            value: 10\r\n        }\r\n    }\r\n\r\n}\r\n\r\nfunction trigger(source, value, variables, options) {\r\n    if (value) {\r\n        let brightness = source.getService().getCharacteristic(HC.Brightness);\r\n        if (brightness == null) {\r\n            log.info(\"Лампочка {}, не умеет изменять яркость\", source.getAccessory())\r\n            return;\r\n        }\r\n\r\n        let hours = new Date().getHours();\r\n\r\n        if (hours >= 23)\r\n            brightness.setValue(options.After23);\r\n        else if (hours >= 21)\r\n            brightness.setValue(options.After21);\r\n        else if (hours >= 6)\r\n            brightness.setValue(options.After6);\r\n        else\r\n            brightness.setValue(options.After23);\r\n    }\r\n}\r\n\r\n",
    "type": "LOGIC"
  }
}