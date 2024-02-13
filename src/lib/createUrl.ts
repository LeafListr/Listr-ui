const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export class URLBuilder {
  private value: string;
  private dispensaryId: string;
  private locationId: string;
  private productId: string;
  private category: string;
  private isRecreational: boolean;

  constructor() {
    this.value = this.baseURL();
    this.dispensaryId = '';
    this.locationId = '';
    this.productId = '';
    this.category = '';
    this.isRecreational = false;
  }

  withDispensary(dispensaryId: string): this {
    this.dispensaryId = dispensaryId;
    return this;
  }

  withLocation(locationId: string): this {
    this.locationId = locationId;
    return this;
  }

  withProductId(productId: string): this {
    this.productId = productId;
    return this;
  }

  forCategory(category: string): this {
    this.category = category;
    return this;
  }

  forRecreational(isRecreational: boolean): this {
    this.isRecreational = isRecreational;
    return this;
  }

  baseURL(): string {
    return `${apiBaseUrl}/api/v1`;
  }

  appendRecreational(): string {
    if (this.isRecreational) {
      return `?recreational=${this.isRecreational}`;
    }
    return '';
  }

  appendDispensaryLocation(): string {
    if (!this.dispensaryId || !this.locationId) {
      throw new Error('Dispensary and location are required');
    }

    return `/dispensaries/${this.dispensaryId}/locations/${this.locationId}`;
  }

  dispensariesQuery(): string {
    this.value = this.baseURL();
    this.value += `/dispensaries`;
    this.value += this.appendRecreational();

    return this.value;
  }

  locationsQuery(): string {
    if (!this.dispensaryId) {
      throw new Error('Dispensary is required');
    }

    this.value = this.baseURL();
    this.value += `/dispensaries/${this.dispensaryId}`;
    this.value += `/locations`;

    this.value += this.appendRecreational();

    return this.value;
  }

  productQuery(): string {
    if (!this.dispensaryId || !this.locationId) {
      throw new Error('Dispensary and location are required');
    }

    this.value = this.baseURL();
    this.value += this.appendDispensaryLocation();

    if (this.productId) {
      this.value += `/products/${this.productId}`;
    } else {
      this.value += `/products`;
    }

    this.value += this.appendRecreational();

    // TODO
    if (this.category && this.isRecreational) {
      this.value += `&category=${this.category}`;
    } else if (this.category) {
      this.value += `?category=${this.category}`;
    }

    return this.value;
  }

  offersQuery(): string {
    if (!this.dispensaryId || !this.locationId) {
      throw new Error('Dispensary and location are required');
    }

    this.value = this.baseURL();
    this.value += this.appendDispensaryLocation();
    this.value += `/offers`;

    this.value += this.appendRecreational();

    return this.value;
  }

  terpenesQuery(): string {
    if (!this.dispensaryId || !this.locationId) {
      throw new Error('Dispensary and location are required');
    }

    this.value = this.baseURL();
    this.value += this.appendDispensaryLocation();
    this.value += `/terpenes`;

    this.value += this.appendRecreational();

    return this.value;
  }

  categoriesQuery(): string {
    if (!this.dispensaryId || !this.locationId) {
      throw new Error('Dispensary and location are required');
    }

    this.value = this.baseURL();
    this.value += this.appendDispensaryLocation();
    this.value += `/categories`;

    this.value += this.appendRecreational();

    return this.value;
  }
}
