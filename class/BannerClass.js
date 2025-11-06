class Banner {
  constructor(banner_name, banner_image, description) {
    this.banner_name = banner_name;
    this.banner_image = banner_image;
    this.description = description;
  }

  //   Getter
  get getBannerName() {
    return this.banner_name;
  }

  get getBannerImage() {
    return this.banner_image;
  }

  get getDescription() {
    return this.description;
  }

  //   Setter
  set setBannerName(banner_name) {
    this.banner_name = banner_name;
  }

  set setBannerImage(banner_image) {
    this.banner_image = banner_image;
  }
  set setDescription(description) {
    this.description = description;
  }
}

export default Banner;
