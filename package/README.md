# Marketplace

SkaiCloud Marketplace provides a host-isolated seller workspace and public product catalog.

## Runtime

- Dashboard: `/dashboard/storefront`
- Public catalog: `/marketplace`
- Product records: host-managed `products` resource
- Product images: host-managed module media storage
- Required module: `website`

The included browser adapter uses module-scoped `localStorage` for install dry-runs. A signed
platform runtime must replace that adapter with the host `products` resource and media storage
before production use. Checkout and Stripe transactions remain platform-owned and are excluded
from version 0.1.0.
