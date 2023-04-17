info = {
    name: "Яркость от времени",
    description: "",
    version: "0.2",
    author: "@sprut666666",
    onStart: false,

    sourceServices: [HS.Lightbulb],
    sourceCharacteristics: [HC.On],

    options: {
        After6: {
            name: {
                en: "Brightness after 06:00",
                ru: "Яркость после 06:00"
            },
            type: "Integer",
            value: 100
        },
        After21: {
            name: {
                en: "Brightness after 21:00",
                ru: "Яркость после 21:00"
            },
            type: "Integer",
            value: 50
        },
        After23: {
            name: {
                en: "Brightness after 23:00",
                ru: "Яркость после 23:00"
            },
            type: "Integer",
            value: 10
        }
    }

}

function trigger(source, value, variables, options) {
    if (value) {
        let brightness = source.getService().getCharacteristic(HC.Brightness);
        if (brightness == null) {
            log.info("Лампочка {}, не умеет изменять яркость", source.getAccessory())
            return;
        }

        let hours = new Date().getHours();

        if (hours >= 23)
            brightness.setValue(options.After23);
        else if (hours >= 21)
            brightness.setValue(options.After21);
        else if (hours >= 6)
            brightness.setValue(options.After6);
        else
            brightness.setValue(options.After23);
    }
}