/**
 * Times of the services
 * @type {Array<number>}
 * @private
 */
let _serviceTimes = [10, 12, 16];
let _preserviceDuration = (10 / 60);
let _serviceDuration = 1.8;

/**
 * @type {string}
 */
let _locationName;

/**
 * Set the service times
 * @param {Array<number>} times
 */
function setServiceTimes(times)
{
    _serviceTimes = times;
}

/**
 * Get the service times
 * @return {Array<number>}
 */
function getServiceTimes()
{
    return _serviceTimes;
}

/**
 * Add a service time
 * @param {number} time
 */
function addServiceTime(time)
{
    _serviceTimes.push(time);
}

/**
 *
 * @return {string}
 */
function getLocationName()
{
    return _locationName;
}

/**
 *
 * @param {string} name
 */
function setLocationName(name)
{
    _locationName = name;
}

/**
 * Get label for location
 * @return {string}
 */
function getLocationLabel()
{
    if(_locationName !== null)
        return _locationName.substring(0, 1);

    return "";
}

/**
 * Get label for a specific service
 * @param {number} service
 * @return {string}
 */
function getServiceLabel(service)
{
    return Math.floor(service) + leadingZeros(Math.round((service % 1) * 60));
}

/**
 *
 * @param {number} time
 * @return {string}
 */
function getServiceLabelAtTime(time)
{
    const l = _serviceTimes.length;
    for(let i=0; i<l; i++)
    {
        let serviceTime = _serviceTimes[i];
        let serviceStart = getServiceStart(serviceTime);
        let serviceEnd = getServiceEnd(serviceTime);

        if(i === 0 && time < serviceStart)
            return "SU";
        if(i === l-1 && time > serviceEnd)
            return "PD";

        if(time > serviceStart && time < serviceEnd)
            return getServiceLabel(serviceTime);
    }

    return "RT";
}

/**
 * Converts a Date object to a number (hours)
 * @param {Date} date
 * @return {number}
 */
function convertDateToTime(date)
{
    return date.getHours() + (date.getMinutes() / 60);
}

/**
 * Get service start time (in hours)
 * @param {number} serviceTime
 * @return {number}
 */
function getServiceStart(serviceTime)
{
    return serviceTime - _preserviceDuration;
}

/**
 * Get service end time (in hours)
 * @param {number} serviceTime
 * @return {number}
 */
function getServiceEnd(serviceTime)
{
    return serviceTime + _serviceDuration;
}

/**
 * Check if given time is during a service
 * @param {number} time
 * @param {number} serviceTime
 * @return {boolean}
 */
function checkTimeIsInService(time, serviceTime)
{
    let serviceStart = getServiceStart(serviceTime);
    let serviceEnd = getServiceEnd(serviceTime);

    return (time > serviceStart && time < serviceEnd);
}

/**
 * Check if given time is in any of the services
 * @param {number} time
 * @return {boolean}
 */
function checkTimeIsInAnyService(time)
{
    const l = _serviceTimes.length;
    for(let i=0; i<l; i++)
    {
        let serviceTime = _serviceTimes[i];
        if(checkTimeIsInService(time, serviceTime))
            return true;
    }

    return false;
}

/**
 * Check if the current time is part of any of the services
 * @return {boolean}
 */
function checkCurrentlyInService()
{
    const now = new Date();
    const time = convertDateToTime(now);
    return checkTimeIsInAnyService(time);
}

/**
 * Get current service label
 * @return {string}
 */
function getCurrentServiceLabel()
{
    const now = new Date();
    const time = convertDateToTime(now);
    return getServiceLabelAtTime(time);
}

/**
 * Get current service label
 * @return {string}
 */
function getCurrentLabel()
{
    return getLocationLabel() + getCurrentServiceLabel();
}

/**
 * Format a number with leading zeros
 * @private
 * @param {number|string} value
 * @param {int} length
 * @returns {string}
 */
function leadingZeros(value, length=2)
{
    value = value.toString();
    for(let i=value.length; i<length; i++)
        value = '0' + value;

    return value.toString();
}

//  exports
exports.setServiceTimes = setServiceTimes;
exports.getServiceTimes = getServiceTimes;
exports.addServiceTime = addServiceTime;
exports.getLocationName = getLocationName;
exports.setLocationName = setLocationName;
exports.getCurrentLabel = getCurrentLabel;
exports.getServiceLabelAtTime = getServiceLabelAtTime;
exports.getCurrentServiceLabel = getCurrentServiceLabel;
exports.checkCurrentlyInService = checkCurrentlyInService;