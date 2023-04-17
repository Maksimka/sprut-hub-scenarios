declare var log: Log;
declare var console: Log;
declare var Hub: Hub;
declare var Cron: Cron;

declare var Utils: Utils;
declare var UtilsNet: UtilsNet;

declare var HttpClient: HttpClient;

declare var GlobalVariables: {};
declare var LocalVariables: {};
declare var global: {};

declare function setInterval(handler: Function, timeout?: number, ...arguments: any[]): Task;

declare function setTimeout(handler: Function, timeout?: number, ...arguments: any[]): Task;

declare function clearInterval(task: Task);

declare function clearTimeout(task: Task);

declare function clear(task: Task);

interface Hub {
    /**
     * Returns accessory
     * @param id
     */
    getAccessory(id: number): Accessory;

    /**
     * Returns all accessories
     */
    getAccessories(): Accessory[];

    /**
     * Returns the value of variable
     * @param aid
     * @param cid
     */
    getCharacteristicValue(aid: number, cid: number): any;

    /**
     * Sets a value to characteristic
     * @param aid
     * @param cid
     * @param value
     */
    setCharacteristicValue(aid: number, cid: number, value: any);

    /**
     * Sets a value to characteristic
     * @param aid
     * @param cid
     */
    toggleCharacteristicValue(aid: number, cid: number);

    /**
     * Returns the value of characteristic
     * @param aid
     * @param cid
     */
    getCharacteristic(aid: number, cid: number): any;

    /**
     * Returns all rooms
     */
    getRooms(): Room[];

    /**
     * info
     * @param handler
     * @param args
     */
    subscribe(handler: Function, ...args): Task;

    /**
     * info
     * @param cond
     * @param value
     * @param hs
     * @param hc
     * @param handler
     * @param args
     */
    subscribeWithCondition(cond: string, value: string, [hs], [hc], handler: Function, ...args): Task;


    /**
     * info
     * @param uuid
     */
    //unsubscribe(uuid: string);
}

interface Accessory {
    /**
     * info
     */
    getServices(): Service[];

    /**
     * info
     * @param visible
     */
    getServices(visible: boolean): Service[];

    /**
     * info
     * @param visible
     * @param hs
     */
    getServices(visible: boolean, hs: HS): Service[];

    /**
     * info
     * @param id
     */
    getService(id: number): Service;

    /**
     * info
     * @param hs
     */
    getService(hs: HS): Service;

    /**
     * Returns the value of characteristic
     * @param id
     */
    getCharacteristic(id: number): Characteristic;

    /**
     * info
     */
    getRoom(): Room;

    /**
     * info
     */
    getUUID(): String;

    /**
     * info
     */
    getName(): String;

    /**
     * info
     * @param name
     */
    setName(name: string);

    /**
     * info
     */
    getModel(): String;

    /**
     * info
     */
    getModelId(): String;

    /**
     * info
     */
    getManufacturer(): String;

    /**
     * info
     */
    getManufacturerId(): String;

    /**
     * info
     */
    getSerial(): String;

    /**
     * info
     */
    getFirmware(): String;
}

interface Service {
    /**
     * info
     */
    getAccessory(): Accessory;

    /**
     * info
     * @param id
     */
    getCharacteristic(id: number): Characteristic;

    /**
     * info
     * @param hc
     */
    getCharacteristic(hc: HC): Characteristic;

    /**
     * info
     */
    getCharacteristics(): Characteristic[];

    /**
     * info
     */
    getType(): HS;

    /**
     * info
     */
    isVisible(): boolean;

    /**
     * info
     * @param visible
     */
    setVisible(visible: boolean);

    /**
     * info
     */
    getUUID(): String;

    /**
     * info
     */
    getName(): String;

    /**
     * info
     * @param name
     */
    setName(name: string);
}

interface Characteristic {
    /**
     * info
     */
    getAccessory(): Accessory;

    /**
     * info
     */
    getService(): Service;

    /**
     * info
     */
    getValue(): any;

    /**
     * info
     * @param value
     */
    setValue(value: any);

    /**
     * info
     */
    toggle();

    /**
     * info
     */
    getType(): HC;

    /**
     * info
     */
    getUUID(): String;

    /**
     * format
     */
    format(): String;

    /**
     * info
     */
    getName(): String;
}

interface Room {
    /**
     * info
     */
    getAccessories(): Accessory[];

    /**
     * info
     */
    getName(): String;

    /**
     * info
     * @param name
     */
    setName(name: string);
}

interface HttpClient {
    /**
     * Returns accessory
     * @param url
     */
    GET(url: string): HttpRequest;

    /**
     * Returns accessory
     * @param url
     */
    POST(url: string): HttpRequest;

    /**
     * Returns accessory
     * @param url
     */
    PUT(url: string): HttpRequest;

    /**
     * Returns accessory
     * @param url
     */
    HEAD(url: string): HttpRequest;

    /**
     * Returns accessory
     * @param url
     */
    DELETE(url: string): HttpRequest;

    /**
     * Returns accessory
     * @param url
     */
    OPTIONS(url: string): HttpRequest;

    /**
     * Returns accessory
     * @param url
     */
    PATCH(url: string): HttpRequest;
}

interface HttpRequest {

    /////////////////////////////////////////////////////
    ////////URL
    /////////////////////////////////////////////////////

    /**
     * Set header
     * @param url
     */
    setURL(url: String): HttpRequest;

    /**
     * info
     * @param name
     * @param value
     */
    queryString(name: String, value: Object): HttpRequest;


    /**
     * info
     * @param segment
     */
    path(segment: String): HttpRequest;

    /**
     * info
     * @param info
     */
    userInfo(info: String): HttpRequest;

    /**
     * info
     * @param num
     */
    port(num: number): HttpRequest;

    /////////////////////////////////////////////////////
    ////////header
    /////////////////////////////////////////////////////

    /**
     * Set header
     * @param name
     * @param value
     */
    header(name: String, value: Object): HttpRequest;

    /**
     * Set cookie
     * @param name
     * @param value
     */
    cookie(name: String, value: String): HttpRequest;

    /**
     * Remove header key
     * @param name
     */
    reset(name: String): HttpRequest;

    /////////////////////////////////////////////////////
    ////////method
    /////////////////////////////////////////////////////

    /**
     * info
     * @param method
     */
    method(method: String): HttpRequest;

    /////////////////////////////////////////////////////
    ////////body
    /////////////////////////////////////////////////////

    /**
     * info
     * @param name
     * @param value
     */
    field(name: String, value: Object): HttpRequest;


    /**
     * info
     * @param name
     * @param value
     */
    fieldMultipart(name: String, value: Object): HttpRequest;


    /**
     * info
     * @param text
     */
    body(text: String): HttpRequest;

    /**
     * info
     * @param body
     */
    body(body: []): HttpRequest;

    /////////////////////////////////////////////////////
    ////////main
    /////////////////////////////////////////////////////

    /**
     * info
     * @param connectTimeout
     * @param readTimeout
     */
    timeout(connectTimeout: number, readTimeout: number): HttpRequest;

    /**
     * info
     * @param connectTimeout
     */
    connectTimeout(connectTimeout: number): HttpRequest;

    /**
     * info
     * @param readTimeout
     */
    readTimeout(readTimeout: number): HttpRequest;

    /**
     * info
     */
    send(): HttpResponse;
}


interface HttpResponse {
    /**
     * info
     */
    back(): HttpRequest;

    /**
     * info
     */
    getStatus(): number;

    /**
     * info
     */
    getStatusText(): String;


    /**
     * info
     */
    getHeaders(): Record;

    /**
     * info
     */
    getCookies(): Record;


    /**
     * info
     */
    getBody(): String;


    /**
     * info
     */
    getBinary(): [];
}

interface Log {

    /**
     * info
     * @param format
     * @param arg
     */
    message(format: string, ...arg: any);

    /**
     * info
     * @param format
     * @param arg
     */
    info(format: string, ...arg: any);

    /**
     * info
     * @param format
     * @param arg
     */
    warn(format: string, ...arg: any);

    /**
     * info
     * @param format
     * @param arg
     */
    error(format: string, ...arg: any);
}

interface Task {

    /**
     * info
     */
    clear();
}

interface Cron {

    /**
     * info
     * @param schedule
     * @param handler
     * @param arguments
     */
    schedule(schedule: string, handler: Function, ...arguments: any[]): Task;

    /**
     * info
     * @param schedule
     * @param offset
     * @param handler
     * @param arguments
     */
    sunrise(schedule: string, offset: number, handler: Function, ...arguments: any[]): Task;


    /**
     * info
     * @param schedule
     * @param offset
     * @param handler
     * @param arguments
     */
    sunset(schedule: string, offset: number, handler: Function, ...arguments: any[]): Task;
}


interface Utils {

    /**
     * info
     */
    uuid(): String;

}

interface UtilsNet {

    /**
     * info
     * @param mac
     */
    wakeOnLan(mac: String);

    /**
     * info
     * @param host
     */
    ping(host: String): boolean;

}

declare class Mail {

    /**
     * info
     * @param host
     */
    host(host: String): Mail;

    /**
     * info
     * @param port
     */
    port(port: number): Mail;

    /**
     * info
     * @param username
     */
    username(username: String): Mail;

    /**
     * info
     * @param from
     */
    from(from: String): Mail;

    /**
     * info
     * @param password
     */
    password(password: String): Mail;

    /**
     * info
     * @param to
     */
    to(to: String): Mail;

    /**
     * info
     * @param subject
     */
    subject(subject: String): Mail;

    /**
     * info
     * @param body
     */
    body(body: String): Mail;

    /**
     * info
     */
    send();
}

declare class SSH {

    /**
     * info
     * @param host
     */
    host(host: String): SSH;

    /**
     * info
     * @param port
     */
    port(port: number): SSH;

    /**
     * info
     * @param username
     */
    username(username: String): SSH;

    /**
     * info
     * @param password
     */
    password(password: String): SSH;

    /**
     * info
     */
    connect(): SSHSession;
}

interface SSHSession {
    /**
     * info
     * @param command
     */
    execute(command: String);

    /**
     * info
     * @param command
     */
    request(command: String): String;
}


enum HS {
    AccessoryInformation,
    AirPurifier,
    AirQualitySensor,
    AudioStreamManagement,
    BatteryService,
    CameraRTPStreamManagement,
    CarbonDioxideSensor,
    CarbonMonoxideSensor,
    ContactSensor,
    DataStreamTransportManagement,
    Door,
    Doorbell,
    Fan,
    Faucet,
    FilterMaintenance,
    GarageDoorOpener,
    HAPProtocolInformation,
    HeaterCooler,
    HumidifierDehumidifier,
    HumiditySensor,
    IrrigationSystem,
    LeakSensor,
    Lightbulb,
    LightSensor,
    LockManagement,
    LockMechanism,
    Microphone,
    MotionSensor,
    OccupancySensor,
    Outlet,
    SecuritySystem,
    ServiceLabel,
    Siri,
    Slat,
    SmokeSensor,
    Speaker,
    StatelessProgrammableSwitch,
    Switch,
    TargetControl,
    TargetControlManagement,
    TemperatureSensor,
    Thermostat,
    Valve,
    Window,
    WindowCovering,
    CloudRelay,
    TransferTransportManagement,
    CameraRecordingManagement,
    WiFiRouter,
    CameraOperatingMode,
    PowerManagement,
    WiFiTransport,
    WiFiSatellite,
    Diagnostics,
    ThreadTransport,
    Television,
    InputSource,
    TelevisionSpeaker,
    AccessControl,
    CameraControl,
    C_AccessoryExtInfo,
    C_AtmosphericPressureSensor,
    C_NoiseSensor,
    C_VoltMeter,
    C_AmpereMeter,
    C_WattMeter,
    C_VoltAmpereMeter,
    C_KiloWattHourMeter,
    C_KiloVoltAmpereHourMeter,
    C_UltravioletSensor,
    C_PulseMeter,
    C_WaterMeter,
    C_VoltPeakMeter,
    C_AngleMeter,
    C_VoltAngleMeter,
    C_PhaseAngleMeter,
    C_VoltAmpereReactiveMeter,
    C_KiloVoltAmpereReactiveHourMeter,
    C_PowerFactorMeter,
    C_FrequencyMeter,
    C_AmperePeakMeter,
    C_Repeater,
    C_Option,
}

enum HC {
    AccessoryFlags,
    Active,
    ActiveIdentifier,
    AdministratorOnlyAccess,
    AudioFeedback,
    AirParticulateDensity,
    AirParticulateSize,
    AirQuality,
    BatteryLevel,
    Brightness,
    ButtonEvent,
    CarbonMonoxideLevel,
    CarbonMonoxidePeakLevel,
    CarbonDioxideDetected,
    CarbonDioxideLevel,
    CarbonDioxidePeakLevel,
    CarbonMonoxideDetected,
    ChargingState,
    CoolingThresholdTemperature,
    ColorTemperature,
    ContactSensorState,
    CurrentAmbientLightLevel,
    CurrentHorizontalTiltAngle,
    CurrentAirPurifierState,
    CurrentSlatState,
    CurrentPosition,
    CurrentVerticalTiltAngle,
    CurrentHumidifierDehumidifierState,
    CurrentDoorState,
    CurrentFanState,
    CurrentHeatingCoolingState,
    CurrentHeaterCoolerState,
    CurrentRelativeHumidity,
    CurrentTemperature,
    CurrentTiltAngle,
    DigitalZoom,
    FilterLifeLevel,
    FilterChangeIndication,
    FirmwareRevision,
    HardwareRevision,
    SoftwareRevision,
    HeatingThresholdTemperature,
    HoldPosition,
    Hue,
    Identify,
    ImageRotation,
    ImageMirroring,
    InUse,
    IsConfigured,
    LeakDetected,
    LockControlPoint,
    LockCurrentState,
    LockLastKnownAction,
    LockManagementAutoSecurityTimeout,
    LockPhysicalControls,
    LockTargetState,
    Logs,
    Manufacturer,
    Model,
    MotionDetected,
    Mute,
    Name,
    NightVision,
    NitrogenDioxideDensity,
    ObstructionDetected,
    PM2_5Density,
    OccupancyDetected,
    OpticalZoom,
    OutletInUse,
    On,
    OzoneDensity,
    PM10Density,
    PositionState,
    ProgramMode,
    ProgrammableSwitchEvent,
    RelativeHumidityDehumidifierThreshold,
    RelativeHumidityHumidifierThreshold,
    RemainingDuration,
    ResetFilterIndication,
    RotationDirection,
    RotationSpeed,
    Saturation,
    SecuritySystemAlarmType,
    SecuritySystemCurrentState,
    SecuritySystemTargetState,
    SelectedAudioStreamConfiguration,
    SerialNumber,
    ServiceLabelIndex,
    ServiceLabelNamespace,
    SetupDataStreamTransport,
    SelectedRTPStreamConfiguration,
    SetupEndpoints,
    SiriInputType,
    SlatType,
    SmokeDetected,
    StatusActive,
    StatusFault,
    StatusJammed,
    StatusLowBattery,
    StatusTampered,
    StreamingStatus,
    SupportedAudioStreamConfiguration,
    SupportedDataStreamTransportConfiguration,
    SupportedRTPConfiguration,
    SupportedVideoStreamConfiguration,
    SulphurDioxideDensity,
    SwingMode,
    TargetAirPurifierState,
    TargetFanState,
    TargetTiltAngle,
    SetDuration,
    TargetControlSupportedConfiguration,
    TargetControlList,
    TargetHorizontalTiltAngle,
    TargetHeaterCoolerState,
    TargetHumidifierDehumidifierState,
    TargetPosition,
    TargetDoorState,
    TargetHeatingCoolingState,
    TargetRelativeHumidity,
    TargetTemperature,
    TemperatureDisplayUnits,
    TargetVerticalTiltAngle,
    ValveType,
    Version,
    VOCDensity,
    Volume,
    WaterLevel,
    CurrentMediaState,
    RemoteKey,
    PictureMode,
    ConfiguredName,
    PasswordSetting,
    AccessControlLevel,
    Identifier,
    SleepDiscoveryMode,
    VolumeControlType,
    VolumeSelector,
    InputSourceType,
    InputDeviceType,
    ClosedCaptions,
    PowerModeSelection,
    TargetVisibilityState,
    CurrentVisibilityState,
    DisplayOrder,
    TargetMediaState,
    DataStreamHAPTransport,
    DataStreamHAPTransportInterrupt,
    RelayControlPoint,
    RelayEnabled,
    RelayState,
    AppMatchingIdentifier,
    CharacteristicValueTransitionControl,
    SupportedCharacteristicValueTransitionConfiguration,
    SetupTransferTransport,
    SupportedTransferTransportConfiguration,
    SupportedCameraRecordingConfiguration,
    SupportedVideoRecordingConfiguration,
    SupportedAudioRecordingConfiguration,
    SelectedCameraRecordingConfiguration,
    NetworkClientProfileControl,
    NetworkClientStatusControl,
    RouterStatus,
    SupportedRouterConfiguration,
    WANConfigurationList,
    WANStatusList,
    ManagedNetworkEnable,
    HomeKitCameraActive,
    ThirdPartyCameraActive,
    CameraOperatingModeIndicator,
    WiFiSatelliteStatus,
    NetworkAccessViolationControl,
    ProductData,
    WakeConfiguration,
    EventSnapshotsActive,
    DiagonalFieldOfView,
    PeriodicSnapshotsActive,
    RecordingAudioActive,
    ManuallyDisabled,
    VideoAnalysisActive,
    CurrentTransport,
    WiFiCapabilities,
    WiFiConfigurationControl,
    OperatingStateResponse,
    SupportedFirmwareUpdateConfiguration,
    FirmwareUpdateReadiness,
    FirmwareUpdateStatus,
    SupportedDiagnosticsSnapshot,
    Ping,
    EventRetransmissionMaximum,
    EventTransmissionCounters,
    ReceivedSignalStrengthIndication,
    SignalToNoiseRatio,
    TransmitPower,
    MaximumTransmitPower,
    ReceiverSensitivity,
    CCASignalDetectThreshold,
    CCAEnergyDetectThreshold,
    MACRetransmissionMaximum,
    MACTransmissionCounters,
    CharacteristicValueActiveTransitionCount,
    ThreadNodeCapabilities,
    ThreadStatus,
    ThreadControlPoint,
    ThreadOpenThreadVersion,
    PairSetup,
    PairVerify,
    PairingFeatures,
    PairingPairings,
    C_Room,
    C_CurrentAtmosphericPressure,
    C_CurrentNoiseLevel,
    C_NoiseDetected,
    C_Volt,
    C_Ampere,
    C_Watt,
    C_VoltAmpere,
    C_KiloWattHour,
    C_KiloVoltAmpereHour,
    C_CurrentUltraviolet,
    C_TargetPositionState,
    C_VisibleInRoom,
    C_Favorite,
    C_Sequence,
    C_CurrentMotionLevel,
    C_PulseCount,
    C_Status,
    C_CubicMeter,
    C_Angle,
    C_Frequency,
    C_VoltAmpereReactive,
    C_KiloVoltAmpereReactiveHour,
    C_PowerFactor,
    C_FunSpeed,
    C_FormaldehydeDensity,
    C_AQIDensity,
    C_Integer,
    C_Float,
    C_Boolean,
    C_String,
    C_Revision,
    C_TimeZone,
    C_Language,
    C_Endpoint,
}
