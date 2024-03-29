// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_URL = 'http://159.89.103.218/prestashop/api';

export const environment = {
  production: false,
  ws_key: 'FKKYB2FE68EPPETMM2JVE3L9S6B6F1ZG',
  COOKIE_KEY: 'xHMpsvzv0fOvJnSuWeCNQttQ0LGmt91eiemzxVWJAE1gHgh9jz8y5NIL',
  app_features: {
    //AUTH
    auth_required: true,
    cookie_auth: true,
    //SHOPPING
    main_categories_layout: 'list',
    sub_categories_layout: 'list',
    subcategories_tile: false,
    multi_store: true,
    stock_checking: true,
    guest_shopping: false,
    //CONFIGS
    multi_language: false,
    location_based: true,
    map_showing: true,
    usage_policy: true,
    payment_methods_storage: true,
    configs_enabled: false,
    addresses_as_tab: false,
    order_history_tabs: true,
    //SHIPPING
    order_tracking: true,
    mapservice: 'GOOGLEMAPS',
  },
  api: {
    addresses: BASE_URL + '/addresses',
    customers: BASE_URL + '/customers',
    orders: BASE_URL + '/orders',
    order_state: BASE_URL + '/order_states',
    search: BASE_URL + '/search',
    cart: BASE_URL + '/cart',
    categories: BASE_URL + '/categories',
    products: BASE_URL + '/products',
    product_features: BASE_URL + '/product_features',
    product_feature_values: BASE_URL + '/product_feature_values',
    stock_availables: BASE_URL + '/stock_availables',
    taxes: BASE_URL + '/taxes',
    languages: BASE_URL + '/languages',
    carriers: BASE_URL + '/carriers',
    deliveries: BASE_URL + '/deliveries'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
