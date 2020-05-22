
const BASE_URL = 'http://159.89.103.218/prestashop/api';

export const environment = {
    production: true,
    ws_key: 'FKKYB2FE68EPPETMM2JVE3L9S6B6F1ZG',
    COOKIE_KEY: 'xHMpsvzv0fOvJnSuWeCNQttQ0LGmt91eiemzxVWJAE1gHgh9jz8y5NIL',
    app_features: {
        auth_required: true,
        stock_checking: true,
        multi_language: false,
        guest_shopping: true,
        cookie_auth: true,
        location_based: true,
        multi_store: true,
        main_categories_layout: 'list',
        sub_categories_layout: 'list',
        usage_policy: true,
        payment_methods_storage: true,
        configs_enabled: false,
        subcategories_tile: false,
        addresses_as_tab: false,
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