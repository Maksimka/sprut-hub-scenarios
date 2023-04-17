info = {
    name: "Увеличивать на значение",
    description: "",
    version: "0.2",
    author: "@sprut666666",
    onStart: false,

    sourceServices: [HS.C_PulseMeter, HS.C_WaterMeter],

    options: {
        Value: {
            name: {
                en: "Value",
                ru: "Значение"
            },
            type: "Double",
            value: 0.01
        }
    }
}

function compute(source, value, variables, options) {
    if (value * 1 > 0)
        return source.getValue() + options.Value;
    else
        return source.getValue();
}