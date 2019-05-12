const services = require("./");

services.setLocationName("Theater Amsterdam");
services.setServiceTimes([10, 12, 16]);

console.log(services.getCurrentLabel());