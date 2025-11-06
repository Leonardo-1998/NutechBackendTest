class Service {
  constructor(service_code, service_name, service_icon, service_tariff) {
    this.service_code = service_code;
    this.service_name = service_name;
    this.service_icon = service_icon;
    this.service_tariff = service_tariff;
  }

  //   Getter
  get getServiceCode() {
    return this.service_code;
  }

  get getServiceName() {
    return this.service_name;
  }

  get getServiceIcon() {
    return this.service_icon;
  }

  get getServiceTariff() {
    return this.service_tariff;
  }

  //   Setter
  set setServiceCode(service_code) {
    this.service_code = service_code;
  }

  set setServiceName(service_name) {
    this.service_name = service_name;
  }

  set setServiceIcon(service_icon) {
    this.service_icon = service_icon;
  }

  set setServiceTariff(service_tariff) {
    this.service_tariff = service_tariff;
  }
}

export default Service;
