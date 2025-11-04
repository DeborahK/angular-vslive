# Demo Notes

## Set up
* Signals-resource-begin
* Open needed files
* Run the application
* Set browser to 125%

## Basic Signals

### RUN

Application doesn't do anything!

### cart.service.ts
  // Initial value
  quantity = signal(1);
  price = signal(5);

  subTotal = computed(() => this.quantity() * this.price());
  deliveryFee = computed(() => this.subTotal() < 100000 ? 999 : 0);
  tax = computed(() => Math.round(this.subTotal() * 12) / 100);
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

### cart-total.ts
  price = this.cartService.price;
  quantity = this.cartService.quantity;

  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;

### cart-total.html

Fix bindings
NOT two-way binding

### RUN

When quantity changes, the calculated properties automatically change!

## More Complex Signals

### vehicle.service.ts
  selectedVehicle = signal<Vehicle | undefined>(undefined);

### cart.service.ts
  private vehicleService = inject(VehicleService);

  price = computed(() =>
    this.vehicleService.selectedVehicle()?.cost_in_credits ?? 0);

### cart-total.ts
  selectedVehicle = this.cartService.selectedVehicle;
  pageTitle = computed(() => 
    this.selectedVehicle() ? `Total for: ${this.selectedVehicle()?.name}` : '');

### cart-total.html
@if (selectedVehicle()) { }

### RUN

Total component no longer appears!

## Retrieve Vehicles with httpResource()

### vehicle.service.ts
  vehiclesResource = httpResource<Vehicle[]>(() => this.url, { defaultValue: []});

### vehicle-list.ts
  vehicles = this.vehicleService.vehiclesResource.value;
  isLoading = this.vehicleService.vehiclesResource.isLoading;
  error = this.vehicleService.vehiclesResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

### vehicle-list.html

Change each variable to read a signal:
* isLoading
* errorMessage (2 times)
* vehicles

### RUN

Can now see the list of vehicles
