info = {
    name: "Плавное изменение яркости",
    description: "Изменяет яркость включаемой лампочки от начального до конечного значения за указанное количество секунд",
    version: "0.2",
    author: "@dshtolin",
    onStart: false,

    sourceServices: [HS.Lightbulb],
    sourceCharacteristics: [HC.On],

    options: {
        StartValue: {
            name: {
                en: "Start value",
                ru: "Начальное значение"
            },
            type: "Integer",
            value: 1
        },
        EndValue: {
            name: {
                en: "End value",
                ru: "Конечное значение"
            },
            type: "Integer",
            value: 100
        },
        Duration: {
            name: {
                en: "Duration in seconds",
                ru: "Продолжительность операции в секундах"
            },
            type: "Integer",
            value: 900
        }
    },

    variables: {
        timerId: undefined
    }
}

function trigger(source, value, variables, options) {

    if (variables.timerId != null) {
        variables.timerId.clear();
        variables.timerId = null;
    }

    if (value) {
        let brightness = source.getService().getCharacteristic(HC.Brightness);
        if (brightness == null) {
            log.info("Лампочка {}, не умеет изменять яркость", source.getAccessory())
            return;
        }

        let duration = options.Duration * 1000;
        let diff = Math.abs(options.EndValue - options.StartValue);
        let delay = (duration - duration % diff) / diff;
        let asc = options.EndValue > options.StartValue;

        let currentValue = options.StartValue;
        brightness.setValue(currentValue);

        variables.timerId = setInterval(function () {

            if ((asc && currentValue >= options.EndValue) || (!asc && currentValue <= options.EndValue)) {
                variables.timerId.clear();
                variables.timerId = null;
                return;
            }

            currentValue += (asc ? 1 : -1);
            brightness.setValue(currentValue);

        }, delay);
    }
}

