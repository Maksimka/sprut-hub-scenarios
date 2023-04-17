{
  "scenarioTemplate": {
    "name": "Увеличивать на значение",
    "desc": "",
    "active": true,
    "onStart": false,
    "sync": false,
    "data": "info = {\r\n    name: \"Увеличивать на значение\",\r\n    description: \"\",\r\n    version: \"0.2\",\r\n    author: \"@sprut666666\",\r\n    onStart: false,\r\n\r\n    sourceServices: [HS.C_PulseMeter, HS.C_WaterMeter],\r\n\r\n    options: {\r\n        Value: {\r\n            name: {\r\n                en: \"Value\",\r\n                ru: \"Значение\"\r\n            },\r\n            type: \"Double\",\r\n            value: 0.01\r\n        }\r\n    }\r\n}\r\n\r\nfunction compute(source, value, variables, options) {\r\n    if (value * 1 > 0)\r\n        return source.getValue() + options.Value;\r\n    else\r\n        return source.getValue();\r\n}",
    "type": "LOGIC"
  }
}